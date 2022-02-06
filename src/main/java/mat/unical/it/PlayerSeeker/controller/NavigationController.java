package mat.unical.it.PlayerSeeker.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


import mat.unical.it.PlayerSeeker.model.Review;
import mat.unical.it.PlayerSeeker.model.ReviewSummary;

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
		ReviewSummary rs=new ReviewSummary();
		ArrayList<Review>reviews=new ArrayList<Review>();
		reviews.addAll(DatabaseJDBC.getInstance().getReviewDaoJDBC().doRetrieveByIdSportsFacility(Long.valueOf(id)));
		rs.setVotes(reviews);
		System.out.println(reviews);
		req.setAttribute("sportFacility", sportsFacility);
		req.setAttribute("review", rs);
		ArrayList<Review> lista = new ArrayList<Review>();
		lista.addAll(DatabaseJDBC.getInstance().getReviewDaoJDBC().doRetrieveByIdSportsFacility(Long.valueOf(id)));
		if(lista.size()>0)
		req.setAttribute("reviews", lista);
		else
			req.removeAttribute("reviews");
		res.setStatus(200);
	
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
