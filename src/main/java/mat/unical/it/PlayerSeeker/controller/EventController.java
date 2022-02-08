package mat.unical.it.PlayerSeeker.controller;

import java.time.LocalDate;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.web.bind.annotation.*;
import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class EventController {

	@PostMapping("/nuovoEvento/create")
	public String createEvent(HttpServletRequest req, HttpServletResponse res,@RequestBody String str) {
		JacksonJsonParser ja = new JacksonJsonParser();
		String sportType=(String) ja.parseMap(str).get("sport");
		Long id=Long.valueOf((String)ja.parseMap(str).get("campo"));
		Long idStruttura=Long.valueOf((String)ja.parseMap(str).get("struttura"));
		LocalDate start=LocalDate.parse((String)ja.parseMap(str).get("data"));
		LocalTime beginHour=LocalTime.parse((String)ja.parseMap(str).get("ora_inizio"));
		LocalTime endHour=LocalTime.parse((String)ja.parseMap(str).get("ora_fine"));
	    Integer missingPlayersNumber=Integer.valueOf((String) ja.parseMap(str).get("giocatori_mancanti"));
		//Ciò che serve a creare l'evento
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
		se.setPlayersNumber(sport.getrequiredPlayers()-missingPlayersNumber);
		
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
	
	@PostMapping("/getBestEvents")
	public List<SportEvent> getBestEvents(HttpServletRequest req, HttpServletResponse res, @RequestBody List<Address> bbox) {
		Address southWest = bbox.get(0);
		Address northEast = bbox.get(1);
		List<SportEvent> result = new ArrayList<SportEvent>();
		if(southWest.getLongitude() == 0) {
			result = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveBestEventBySportFacilityKey(null);
		}
		else {
			List<SportsFacility> facility = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByBBox(southWest, northEast);
			for(SportsFacility f : facility) {
				result.addAll(DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveBestEventBySportFacilityKey(f.getId()));
			}
		}
		res.setStatus(HttpServletResponse.SC_OK);
		result = result.subList(0, 6);
		return result;
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
	
	@PostMapping("/checkPlayerAvailability")
	public int checkPlayerAvailability(HttpServletRequest req, HttpServletResponse res, @RequestBody List<String> id) {
		User user = DatabaseJDBC.getInstance().getUserDao().doRetrieveById(Long.parseLong(id.get(0)));
		SportEvent event = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveByKey(Long.parseLong(id.get(1)));
		if(DatabaseJDBC.getInstance().getPlayerDao().checkImpegni(user, event.getStart(), event.getBeginHour(), event.getEndHour())) {
			res.setStatus(HttpServletResponse.SC_CONFLICT);
			return HttpServletResponse.SC_CONFLICT;
		}
		res.setStatus(HttpServletResponse.SC_OK);
		return HttpServletResponse.SC_OK;
	}
	
	@PostMapping("/addEventParticipants")
	public int updateEventParticipants(HttpServletRequest req, HttpServletResponse res, @RequestBody List<String> id) {
		Player player = DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(Long.parseLong(id.get(0)));
		SportEvent event = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveByKey(Long.parseLong(id.get(1)));
		event.getPlayers().add(player);
		event.setPlayersNumber(event.getPlayersNumber()+1);
		if(DatabaseJDBC.getInstance().getSportsEventDao().saveOrUpdate(event)) {
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_CONFLICT);
		return HttpServletResponse.SC_CONFLICT;
	}
	
	@PostMapping("/removeEventParticipants")
	public int removeEventParticipants(HttpServletRequest req, HttpServletResponse res, @RequestBody List<String> id) {
		Player player = DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(Long.parseLong(id.get(0)));
		SportEvent event = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveByKey(Long.parseLong(id.get(1)));
		event.getPlayers().removeIf(p -> (p.getId() == player.getId()));
		event.setPlayersNumber(event.getPlayersNumber()-1);
		if(DatabaseJDBC.getInstance().getSportsEventDao().saveOrUpdate(event)) {
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_CONFLICT);
		return HttpServletResponse.SC_CONFLICT;
	}
	
	@PostMapping("/getEventByOrganizer")
	public List<SportEvent> getEventByOrganizer(HttpServletRequest req, HttpServletResponse res, @RequestBody Long organizerId) {
		List<SportEvent> result = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveByOrganizer(organizerId);
		res.setStatus(HttpServletResponse.SC_OK);
		return result;
	}
	
	@PostMapping("/getEventByParticipant")
	public List<SportEvent> getEventByParticipant(HttpServletRequest req, HttpServletResponse res, @RequestBody Long userId) {
		List<SportEvent> result = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveByParticipant(userId);
		res.setStatus(HttpServletResponse.SC_OK);
		return result;
	}
	
	@PostMapping("/deleteEvent")
	public int deleteEvent(HttpServletRequest req, HttpServletResponse res, @RequestBody Long eventId) {
		DatabaseJDBC.getInstance().getSportsEventDao().deleteById(eventId);
		res.setStatus(HttpServletResponse.SC_OK);
		return HttpServletResponse.SC_OK;
	}
	@PostMapping("/updateEventOrganizer")
	public int updateOrganizer(HttpServletRequest req, HttpServletResponse res,@RequestBody List<String> id) {
		Player player = DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(Long.parseLong(id.get(0)));
		SportEvent event = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveByKey(Long.parseLong(id.get(1)));
		
		 event.getPlayers().removeIf(p -> (p.getId() == event.getOrganizzatore().getId()));
		event.setPlayersNumber(event.getPlayersNumber()-1);
	
		if(DatabaseJDBC.getInstance().getSportsEventDao().updateOrganizer(event,player)) {
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_CONFLICT);
		return HttpServletResponse.SC_CONFLICT;
	}
	
	@PostMapping("/getEventBySportsFacilityKey")
	public List<SportEvent> getEventBySportsFacilityKey(HttpServletRequest req, HttpServletResponse res, @RequestBody Long id) {
		List<SportEvent> result = DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveAllBySportFacilityKey(id);
		
		res.setStatus(200);
		return result;
	}
}
