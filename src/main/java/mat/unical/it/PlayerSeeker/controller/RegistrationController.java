package mat.unical.it.PlayerSeeker.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.*;

import com.google.gson.Gson;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.OpeningHours;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class RegistrationController {

	@PostMapping("/checkUsername")
	public int checkUsername(HttpServletResponse res, @RequestBody String username) {
		Gson gson = new Gson();
		username = gson.fromJson(username, String.class);
		User user = DatabaseJDBC.getInstance().getUserDao().doRetrieveByKey(username);
		if(user == null) {
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		else {
			res.setStatus(HttpServletResponse.SC_CONFLICT);
			return HttpServletResponse.SC_CONFLICT;
		}
	}
	
	@PostMapping("/checkEmail")
	public int checkEmail(HttpServletResponse res, @RequestBody String email) {
		Gson gson = new Gson();
		email = gson.fromJson(email, String.class);
		User user = DatabaseJDBC.getInstance().getUserDao().doRetrieveByMail(email);
		if(user == null) {
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		else {
			res.setStatus(HttpServletResponse.SC_CONFLICT);
			return HttpServletResponse.SC_CONFLICT;
		}
	}
	
	@PostMapping("/registerUser")
	public User registerUser(HttpServletResponse res, @RequestBody User user) {
		Long userId = DatabaseJDBC.getInstance().getUserIdBroker().getId();
		user.setId(userId);
		if(DatabaseJDBC.getInstance().getUserDao().saveOrUpdate(user)) {
			res.setStatus(HttpServletResponse.SC_OK);
			return user;
		}
		res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);	
		return null;
	}
	
	@PostMapping("/registerPlayer")
	public int registerPlayer(HttpServletResponse res, @RequestBody Player player) {
		Address address = DatabaseJDBC.getInstance().getAddressDao().doRetrieveByPosition(player.getAddress().getLatitude(), player.getAddress().getLongitude());
		if(address != null) {
			player.getAddress().setId(address.getID());
		}
		else {
			player.getAddress().setId(DatabaseJDBC.getInstance().getAddressIdBroker().getId());
			DatabaseJDBC.getInstance().getAddressDao().saveOrUpdate(player.getAddress());
		}
		
		if(DatabaseJDBC.getInstance().getPlayerDao().saveOrUpdate(player))
			return HttpServletResponse.SC_OK;
		
		return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
	}
	
	@PostMapping("/getPlaygroundId")
	public Long gerPlaygroundId(HttpServletResponse res) {
		return DatabaseJDBC.getInstance().getPlaygroundIdBroker().getId();
	}
	
	@PostMapping("/registerSportFacility")
	public int registerSportFacility(HttpServletResponse res, @RequestBody SportsFacility sportFacility) {
		if(DatabaseJDBC.getInstance().checkConnection() == false) {
			res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
		}
		Address address = DatabaseJDBC.getInstance().getAddressDao().doRetrieveByPosition(sportFacility.getAddress().getLatitude(), sportFacility.getAddress().getLongitude());
		if(address != null) {
			sportFacility.getAddress().setId(address.getID());
		}
		else {
			sportFacility.getAddress().setId(DatabaseJDBC.getInstance().getAddressIdBroker().getId());
			DatabaseJDBC.getInstance().getAddressDao().saveOrUpdate(sportFacility.getAddress());
		}
		
		if(DatabaseJDBC.getInstance().getSportsFacilityDao().saveOrUpdate(sportFacility)) {
			for(Playground playground : sportFacility.getPlaygrounds()) {
				DatabaseJDBC.getInstance().getPlaygroundDao().saveOrUpdate(playground, sportFacility.getId());
			}
			for(OpeningHours openingHours : sportFacility.getOpeningHours()) {
				openingHours.setId(DatabaseJDBC.getInstance().getOpeningHoursIdBroker().getId());
				DatabaseJDBC.getInstance().getoOpeningHoursDao().saveOrUpdate(openingHours, sportFacility.getId());
			}
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		
		res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
	}

	@DeleteMapping("/deletePlayer/{id}")
	public int deletePlayer(HttpServletResponse res, @PathVariable Long id) {
		if(DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(id) == null) {
			res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
		}
		else {
			Player tmpPlayer = DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(id);
			DatabaseJDBC.getInstance().getPlayerDao().delete(tmpPlayer);
			User tmpUser = DatabaseJDBC.getInstance().getUserDao().doRetrieveByKey(tmpPlayer.getName());
			DatabaseJDBC.getInstance().getUserDao().delete(tmpUser);
		}
		res.setStatus(HttpServletResponse.SC_OK);
		return HttpServletResponse.SC_OK;
	}

	@DeleteMapping("/deleteFacility/{id}")
	public int deleteFacility(HttpServletResponse res, @PathVariable Long id) {
		if(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(id) == null) {
			res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
		}
		else {
			SportsFacility tmpFacility = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(id);
			DatabaseJDBC.getInstance().getSportsFacilityDao().delete(tmpFacility);
			User tmpUser = DatabaseJDBC.getInstance().getUserDao().doRetrieveByKey(tmpFacility.getName());
			DatabaseJDBC.getInstance().getUserDao().delete(tmpUser);
		}
		res.setStatus(HttpServletResponse.SC_OK);
		return HttpServletResponse.SC_OK;
	}
}
