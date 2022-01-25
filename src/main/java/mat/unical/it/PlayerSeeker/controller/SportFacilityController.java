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
import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.model.SportFacilityList;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
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
			
			
			sfl.setBySport(struttureBBOX,s);
           
			res.setStatus(200);

		} catch (JsonProcessingException e) {
			res.setStatus(400);
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return sfl;

	}
	
}
