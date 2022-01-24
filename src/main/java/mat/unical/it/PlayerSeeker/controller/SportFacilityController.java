package mat.unical.it.PlayerSeeker.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportFacilityList;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.Database;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class SportFacilityController {

	@PostMapping("/listaStruttureVicine")
	public SportFacilityList getStrutture(HttpServletRequest req, HttpServletResponse res,@RequestBody String mes) {
	
		SportsFacility sf=new SportsFacility();
		
		
		SportFacilityList sfl=new SportFacilityList();
		ArrayList<SportsFacility>al=new ArrayList<SportsFacility>(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveAll());
		 sfl.setListaStrutture(al);
		
		 
		System.out.println(mes);
		res.setStatus(200);
		//f.add(secondo);
		return sfl;	
	}
	@PostMapping("/listaStruttureBB")
	public SportFacilityList getStruttureBB(HttpServletRequest req, HttpServletResponse res,@RequestBody String mes) {
		
		 JacksonJsonParser ja=new JacksonJsonParser();
		 
			Map<String,Object> mappa=	   ja.parseMap(mes);
   
         ObjectMapper mapper = new ObjectMapper();
       
         try {
        		String sw= mapper.writeValueAsString(mappa.get("sw"));
			String ne = mapper.writeValueAsString(mappa.get("ne"));
			  Double ne_lng=(Double) ja.parseMap(ne).get("lng");
			  Double ne_lat=(Double) ja.parseMap(ne).get("lat");
			  Double sw_lng=(Double) ja.parseMap(sw).get("lng");
			  Double sw_lat=(Double) ja.parseMap(sw).get("lat");
		         
		Address tmpNE=	DatabaseJDBC.getInstance().getAddressDao().doRetrieveByPosition(ne_lat.floatValue(), ne_lng.floatValue());
		if(tmpNE==null) {
			tmpNE = new Address();
			System.out.println("null1");
			tmpNE.setLatitude(ne_lat.floatValue());
			tmpNE.setLongitude(ne_lng.floatValue());
			tmpNE.setId(DatabaseJDBC.getInstance().getAddressIdBroker().getId());
			DatabaseJDBC.getInstance().getAddressDao().saveOrUpdate(tmpNE);
		}
		Address tmpSW=	DatabaseJDBC.getInstance().getAddressDao().doRetrieveByPosition(sw_lat.floatValue(), sw_lng.floatValue());
		if(tmpSW==null) {
			System.out.println("null2");
			tmpSW = new Address();
			tmpSW.setLatitude(ne_lat.floatValue());
			tmpSW.setLongitude(ne_lng.floatValue());
			tmpSW.setId(DatabaseJDBC.getInstance().getAddressIdBroker().getId());
			DatabaseJDBC.getInstance().getAddressDao().saveOrUpdate(tmpSW);
		}
		
		
		ArrayList<SportsFacility>alBBOX=new ArrayList<SportsFacility>(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByBBox(tmpSW,tmpNE));
		System.out.println("tutte"+alBBOX);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println(mes);
		/*	player.getAddress().setId(DatabaseJDBC.getInstance().getAddressIdBroker().getId());
	//	DatabaseJDBC.getInstance().getAddressDao().saveOrUpdate(player.getAddress());
	*/	
	SportsFacility sf=new SportsFacility();
	SportFacilityList sfl=new SportFacilityList();
		
		ArrayList<SportsFacility>al=new ArrayList<SportsFacility>(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveAll());
		 sfl.setListaStrutture(al);
		
	User u=	(User) req.getSession().getAttribute("user");
	Player p=DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(u.getId());
	
	  
		System.out.println("nella funz bb"+u.getUsername()+mes);
		res.setStatus(200);
		//f.add(secondo);
		return sfl;	
	}
	@PostMapping("/listaCampiSportivi")
	public SportFacilityList getCampiStruttua(HttpServletRequest req, HttpServletResponse res,@RequestBody String mes) {
	
		SportsFacility sf=new SportsFacility();
		
		
		SportFacilityList sfl=new SportFacilityList();
		ArrayList<SportsFacility>al=new ArrayList<SportsFacility>(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveAll());
		 sfl.setListaStrutture(al);
		
		
		System.out.println(mes);
		res.setStatus(200);
		//f.add(secondo);
		return sfl;	
	}
}
