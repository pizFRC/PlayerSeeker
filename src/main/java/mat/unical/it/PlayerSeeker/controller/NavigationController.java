package mat.unical.it.PlayerSeeker.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@Controller
public class NavigationController {

	@GetMapping("/")
	public String homePage(HttpServletRequest req, HttpServletResponse resp) {
		return "index";
	}
	
	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}
	
	@GetMapping("/eventi")
	public String events() {
		return "eventi";
	}
	
	@GetMapping("/strutture")
	public String structures() {
		return "strutture";
	}
	@GetMapping("/visualizzaStruttura")
	public String visualizzaStruttura() {
		return "visualizzaStruttura";
	}
	
	@GetMapping("/visualizzaEventi")
	public String visualizzaEventi() {
		return "visualizzaEventi";
	}
	
	@GetMapping("/nuovoEvento")
	public String nuovoEvento() {
		return "nuovoEvento";
	}
	
	@GetMapping("/sportFacilityDetails/{id}")
	public String getAttr(HttpServletRequest req, HttpServletResponse res, @PathVariable(value="id") String id) {
		req.setAttribute("sportFacility", DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(Long.parseLong(id)));
		return "sportFacilityDetails";
	}
	
	@GetMapping("/accountManagementPlayer")
	public String accountManagementPlayer() {
		return "gestioneAccountPlayer";
	}
	
	@GetMapping("/accountManagementSportFacility")
	public String accountManagementSportFacility() {
		return "gestioneAccountSportFacility";
	}
}
