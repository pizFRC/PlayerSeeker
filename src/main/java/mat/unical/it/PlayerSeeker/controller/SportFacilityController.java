package mat.unical.it.PlayerSeeker.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParser;

import com.google.gson.Gson;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.SportFacilityList;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;


import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.Review;
import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.persistance.Database;

import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;
import mat.unical.it.PlayerSeeker.persistance.jdbc.PlayerDaoJDBC;

@RestController
public class SportFacilityController {

	@PostMapping("/listaStruttureBB")
	public SportFacilityList getStruttureBB(HttpServletRequest req, HttpServletResponse res, @RequestBody String mes) {

		JacksonJsonParser ja = new JacksonJsonParser();

		Map<String, Object> mappa = ja.parseMap(mes);
        System.out.println("richiesta strutture:"+mappa);
		ObjectMapper mapper = new ObjectMapper();
		SportsFacility sf = new SportsFacility();
		SportFacilityList sfl = new SportFacilityList();
		try {

			String sw = mapper.writeValueAsString(mappa.get("sw"));
			String ne = mapper.writeValueAsString(mappa.get("ne"));
			Double ne_lng = (Double) ja.parseMap(ne).get("lng");
			Double ne_lat = (Double) ja.parseMap(ne).get("lat");
			Double sw_lng = (Double) ja.parseMap(sw).get("lng");
			Double sw_lat = (Double) ja.parseMap(sw).get("lat");

			Address tmpNE = new Address();
			tmpNE.setLatitude(ne_lat.floatValue());
			tmpNE.setLongitude(ne_lng.floatValue());

			Address tmpSW = new Address();
			tmpSW.setLatitude(sw_lat.floatValue());
			tmpSW.setLongitude(sw_lng.floatValue());
            
			ArrayList<SportsFacility> struttureBBOX = new ArrayList<SportsFacility>(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByBBox(tmpSW, tmpNE));
			Sport s=DatabaseJDBC.getInstance().getSportDao().doRetrieveByKey((String)mappa.get("sport"));
			for(SportsFacility str:struttureBBOX)
				System.out.println("Stru:"+str.getName());
			//data=2022-01-28, ora_inizio=08:00
			String dataStr =(String)mappa.get("data");
			String oraInizioStr = (String)mappa.get("ora_inizio") ;
			String oraFineStr = (String)mappa.get("ora_fine") ;
			oraInizioStr+=":00";
			oraFineStr+=":00";
			sfl.setBySport(struttureBBOX,s,dataStr,oraInizioStr,oraFineStr);
           
			res.setStatus(200);
		} catch (JsonProcessingException e) {
			res.setStatus(400);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return sfl;

	}
	
	@PostMapping("/getBestSportFacility")
	public List<SportsFacility> getBestSportFacility(HttpServletRequest req, HttpServletResponse res, @RequestBody List<Address> bbox) {
		Address southWest = bbox.get(0);
		Address northEast = bbox.get(1);
		List<SportsFacility> result = new ArrayList<SportsFacility>();
		if(southWest.getLongitude() == 0) {
			result = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveAll();
		}
		else {
			result = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByBBox(southWest, northEast);
		}
		result.sort((SportsFacility f1, SportsFacility f2) -> f1.getEvents().size() - f2.getEvents().size());
		if(result.size()>6)
			result = result.subList(0, 5);
		res.setStatus(HttpServletResponse.SC_OK);
		return result;
	}
	
	@PostMapping("/getSportFacilityByBBox")
	public List<SportsFacility> getSportFacilityByBBox(HttpServletResponse res, @RequestBody List<Address> bbox) {
		Address southWest = bbox.get(0);
		Address northEast = bbox.get(1);
		List<SportsFacility> result = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByBBox(southWest, northEast);
		
		res.setStatus(HttpServletResponse.SC_OK);
		return result;
	}
	
	@PostMapping("/checkImpegniPlayer")
	public void getImpegniPlayer(HttpServletRequest req, HttpServletResponse res, @RequestBody String mes) {
		User u=(User)req.getSession().getAttribute("user");
		JacksonJsonParser ja = new JacksonJsonParser();
		Map<String, Object> mappa = ja.parseMap(mes);
	
		String dataStr =(String)mappa.get("data");
		String oraInizioStr = (String)mappa.get("ora_inizio") ;
		oraInizioStr+=":00" ;
		
		String oraFineStr = (String)mappa.get("ora_fine");
		oraFineStr+=":00" ;
		if(DatabaseJDBC.getInstance().getPlayerDao().checkImpegni(u,LocalDate.parse(dataStr),LocalTime.parse(oraInizioStr),LocalTime.parse(oraFineStr)))
		{
			System.out.println("sono qui 400");
			res.setStatus(400);
			
		}else {
			res.setStatus(200);
			System.out.println("200");
		}

	}
	@PostMapping("/getReviewsSportsFacility")
	public void getReviewsBySportFacilityKey(HttpServletRequest req, HttpServletResponse res, @RequestBody String id) {
		
		
	
		Review r=new Review();
		
		ArrayList<Review> lista = new ArrayList<Review>();
		lista.addAll(DatabaseJDBC.getInstance().getReviewDaoJDBC().doRetrieveByIdSportsFacility(Long.valueOf(id)));
		if(lista.size()>0)
		req.setAttribute("reviews", lista);
		else
			req.removeAttribute("reviews");
		res.setStatus(200);
	}
	
	
	
	@PostMapping("/addReview")
	public void addReview(HttpServletRequest req, HttpServletResponse res, @RequestBody String mes) {
		JacksonJsonParser ja = new JacksonJsonParser();
		Map<String, Object> mappa = ja.parseMap(mes);
		Integer userId=	(Integer)mappa.get("userId");
		String sportsFacilityId=	(String)mappa.get("id_struttura");
	String testo=(String)mappa.get("testo");
	String voto=(String)mappa.get("voto");
	Review r=new Review();
	r.setAuthor(DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(Long.valueOf(userId)));
	r.setSportsFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(Long.valueOf(sportsFacilityId)));
	r.setId(DatabaseJDBC.getInstance().getReviewIdBroker().getId());
	r.setStars(Integer.parseInt(voto));
	r.setData(LocalDate.now());
	r.setText(testo);
	if(DatabaseJDBC.getInstance().getReviewDaoJDBC().saveOrUpdate(r))
		res.setStatus(200);
	else
		res.setStatus(400);
		System.out.println(mes);
		
	}
}
