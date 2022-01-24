package mat.unical.it.PlayerSeeker.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;




@RestController
public class EventController {

	/*@GetMapping("/listaEventi")
	public EventList getEvents() {
		
		
		
		
	
		
		
		return eventi;	
	}
	*/
	@PostMapping("/nuovoEvento/create")
	public String createEvent(HttpServletRequest req, HttpServletResponse res,@RequestBody String str) {
	
		      
		System.out.println( str);
		
		 res.setStatus(400);
		
		return str;
	}
	
	@PostMapping("/event")
	public String viewEvent() {
		return "visualizzaEventi";
	}
	

}
