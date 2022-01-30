package mat.unical.it.PlayerSeeker.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.SportFacilityList;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class EventController {

	/*@GetMapping("/listaEventi")
	public EventList getEvents() {
		return eventi;	
	}
	*/

	@PostMapping("/nuovoEvento/create")
	public String createEvent(HttpServletRequest req, HttpServletResponse res,@RequestBody String str) {
	
		JacksonJsonParser ja = new JacksonJsonParser();

		ObjectMapper mapper = new ObjectMapper();
		String sportType=(String) ja.parseMap(str).get("sport");
		Long id=Long.valueOf((String)ja.parseMap(str).get("campo"));
		Long idStruttura=Long.valueOf((String)ja.parseMap(str).get("struttura"));
		LocalDate start=LocalDate.parse((String)ja.parseMap(str).get("data"));
		LocalTime beginHour=LocalTime.parse((String)ja.parseMap(str).get("ora_inizio"));
		LocalTime endHour=LocalTime.parse((String)ja.parseMap(str).get("ora_fine"));
	
		
		//ciò che serve a creare l'evento
		User user=(User)req.getSession().getAttribute("user");
      	Player p=DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(user.getId());
		Sport sport=DatabaseJDBC.getInstance().getSportDao().doRetrieveByKey(sportType);
		Playground pg=DatabaseJDBC.getInstance().getPlaygroundDao().doRetrieveByKey(id);
		 
		SportEvent se=new SportEvent();
		se.setId(DatabaseJDBC.getInstance().getSportEventIdBroker().getId());
		se.setSportFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(idStruttura));
		se.setOrganizzatore(p);
		se.setPlayground(pg);
		se.setStart(start);
		se.setSport(sport);
		se.setBeginHour(beginHour);
		se.setEndHour(endHour);
		se.setDescription("descrizione di prova");
		se.getPlayers().add(p);
	   System.out.println("creazione evento:"+str);
		if (DatabaseJDBC.getInstance().getSportsEventDao().saveOrUpdate(se))
			res.setStatus(200);
		else
			res.setStatus(400);
      
	
		return str;
	}
	
	@PostMapping("/event")
	public String viewEvent(HttpServletRequest req, HttpServletResponse res, @RequestParam("id") Long id) {
		SportEvent sportEvent = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveByKey(id);
		if(sportEvent == null) {
			req.setAttribute("errorMessage","L'evento non esiste");
			return "visualizzaEventi";
		}
		return "visualizzaEventi";
	}
	
	@PostMapping("/getEventByBBox")
	public List<SportEvent> getEventByBBox(HttpServletRequest req, HttpServletResponse res, @RequestBody List<Address> bbox) {
		Address southWest = bbox.get(0);
		Address northEast = bbox.get(1);
		List<SportsFacility> facility = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByBBox(southWest, northEast);
		List<SportEvent> result = new ArrayList<SportEvent>();
		for(SportsFacility f : facility) {
			result.addAll(DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveAllBySportFacilityKey(f.getId()));
		}
		res.setStatus(HttpServletResponse.SC_OK);
		return result;
	}
}
