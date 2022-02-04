package mat.unical.it.PlayerSeeker.controller;

import java.util.ArrayList;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import mat.unical.it.PlayerSeeker.model.Review;
import mat.unical.it.PlayerSeeker.model.ReviewSummary;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
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
	
	@GetMapping("/nuovoEvento")
	public String nuovoEvento() {
		return "nuovoEvento";
	}
	
	@GetMapping("/sportFacilityDetails/{id}")
	public String sportFacilityDetails(HttpServletRequest req, HttpServletResponse res, @PathVariable(value="id") String id) {
		SportsFacility sportsFacility = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(Long.parseLong(id));
		sportsFacility.setEvents(DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveAllBySportFacilityKey(sportsFacility.getId()));
		req.setAttribute("sportFacility", sportsFacility);
		ReviewSummary rs=new ReviewSummary();
		Review r=new Review();
		Review r1=new Review();
		Review r2=new Review();
		Review r3=new Review();
		Review r4=new Review();
		r.setStars(5);
		r1.setStars(5);
		r2.setStars(5);
		r3.setStars(3);
		r4.setStars(2);
		ArrayList<Review>lis=new ArrayList<Review>();
		lis.add(r);lis.add(r1);lis.add(r2);lis.add(r3);lis.add(r4);
		rs.setVotes(lis);
		
		req.setAttribute("review", rs);
		return "sportFacilityDetails";
	}
	
	@GetMapping("/eventDetails/{id}")
	public String eventDetails(HttpServletRequest req, HttpServletResponse res, @PathVariable(value="id") String id) {
		req.setAttribute("event", DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveByKey(Long.parseLong(id)));
		return "eventDetails";
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
