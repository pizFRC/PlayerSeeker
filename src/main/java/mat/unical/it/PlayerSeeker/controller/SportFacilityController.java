package mat.unical.it.PlayerSeeker.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.json.JSONParser;
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
	
		SportsFacility sf=new SportsFacility();
		
		
		SportFacilityList sfl=new SportFacilityList();
		ArrayList<SportsFacility>al=new ArrayList<SportsFacility>(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveAll());
		 sfl.setListaStrutture(al);
		
		
		System.out.println(mes);
		res.setStatus(200);
		//f.add(secondo);
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
