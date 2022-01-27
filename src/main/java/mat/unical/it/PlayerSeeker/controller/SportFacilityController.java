package mat.unical.it.PlayerSeeker.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import mat.unical.it.PlayerSeeker.model.Sport;

import mat.unical.it.PlayerSeeker.persistance.Database;

import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

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
	
	@PostMapping("/getSportFacilityByBBox")
	public List<SportsFacility> getSportFacilityByBBox(HttpServletResponse res, @RequestBody List<Address> bbox) {
		Address southWest = bbox.get(0);
		Address northEast = bbox.get(1);
		List<SportsFacility> result = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByBBox(southWest, northEast);
		
		res.setStatus(HttpServletResponse.SC_OK);
		return result;
	}
}
