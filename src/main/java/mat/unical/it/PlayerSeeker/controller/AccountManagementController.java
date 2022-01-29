package mat.unical.it.PlayerSeeker.controller;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.OpeningHours;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class AccountManagementController {
	
	@PostMapping("/updateUser")
	public int updateUser(HttpServletRequest req, HttpServletResponse res, @RequestBody User user) {
		if(DatabaseJDBC.getInstance().getUserDao().saveOrUpdate(user)) {
			HttpSession session = req.getSession();
			User currentUser = (User) session.getAttribute("user");
			currentUser.setUsername(user.getUsername());
			currentUser.setEmail(user.getEmail());
			session.setAttribute("user", currentUser);
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
	}
	
	@PostMapping("/checkPassword")
	public int checkPassword(HttpServletRequest req, HttpServletResponse res, @RequestBody String password) {
		Gson gson = new Gson();
		password = gson.fromJson(password, String.class);
		HttpSession session = req.getSession();
		User user = (User) session.getAttribute("user");
		if(BCrypt.checkpw(password, user.getPassword())) {
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
	}
	
	@PostMapping("/updatePassword")
	public int updatePassword(HttpServletRequest req, HttpServletResponse res, @RequestBody User user) {
		if(DatabaseJDBC.getInstance().getUserDao().saveOrUpdate(user)) {
			HttpSession session = req.getSession();
			User currentUser = (User) session.getAttribute("user");
			currentUser.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12)));
			session.setAttribute("user", currentUser);
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
	}
	
	@PostMapping("/updatePlayer")
	public int updatePlayer(HttpServletRequest req, HttpServletResponse res, @RequestBody Player player) {
		Address address = DatabaseJDBC.getInstance().getAddressDao().doRetrieveByPosition(player.getAddress().getLatitude(), player.getAddress().getLongitude());
		if(address != null) {
			player.getAddress().setId(address.getID());
		}
		else {
			player.getAddress().setId(DatabaseJDBC.getInstance().getAddressIdBroker().getId());
			DatabaseJDBC.getInstance().getAddressDao().saveOrUpdate(player.getAddress());
		}
		
		if(DatabaseJDBC.getInstance().getPlayerDao().saveOrUpdate(player)) {
			HttpSession session = req.getSession();
			Player currentProfile = (Player) session.getAttribute("profile");
			currentProfile.setName(player.getName());
			currentProfile.setSurname(player.getSurname());
			currentProfile.setBirthday(player.getBirthday());
			currentProfile.setAddress(player.getAddress());
			session.setAttribute("profile", currentProfile);
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
	}
	
	@PostMapping("/updateSportFacility")
	public int updateSportFacility(HttpServletRequest req, HttpServletResponse res, @RequestBody SportsFacility sportFacility) {
		Address address = DatabaseJDBC.getInstance().getAddressDao().doRetrieveByPosition(sportFacility.getAddress().getLatitude(), sportFacility.getAddress().getLongitude());
		if(address != null) {
			sportFacility.getAddress().setId(address.getID());
		}
		else {
			sportFacility.getAddress().setId(DatabaseJDBC.getInstance().getAddressIdBroker().getId());
			DatabaseJDBC.getInstance().getAddressDao().saveOrUpdate(sportFacility.getAddress());
		}
		
		if(DatabaseJDBC.getInstance().getSportsFacilityDao().saveOrUpdate(sportFacility)) {
			HttpSession session = req.getSession();
			SportsFacility currentProfile = (SportsFacility) session.getAttribute("profile");
			for(OpeningHours openingHours : currentProfile.getOpeningHours()) {
				DatabaseJDBC.getInstance().getoOpeningHoursDao().delete(openingHours);
			}
			for(OpeningHours openingHours : sportFacility.getOpeningHours()) {
				openingHours.setId(DatabaseJDBC.getInstance().getOpeningHoursIdBroker().getId());
				DatabaseJDBC.getInstance().getoOpeningHoursDao().saveOrUpdate(openingHours, sportFacility.getId());
			}
			currentProfile.setName(sportFacility.getName());
			currentProfile.setPhone(sportFacility.getPhone());
			currentProfile.setWebSiteUrl(sportFacility.getWebSiteUrl());
			currentProfile.setOpeningHours(sportFacility.getOpeningHours());
			currentProfile.setAddress(sportFacility.getAddress());
			
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
	}
	
	@PostMapping("/updatePlayground")
	public int updatePlayground(HttpServletRequest req, HttpServletResponse res, @RequestBody Playground playground) {
		HttpSession session = req.getSession();
		SportsFacility currentProfile = (SportsFacility) session.getAttribute("profile");
		if(DatabaseJDBC.getInstance().getPlaygroundDao().saveOrUpdate(playground, currentProfile.getId())) {
			for(Playground p : currentProfile.getPlaygrounds()) {
				if(p.getId() == playground.getId()) {
					currentProfile.getPlaygrounds().set(currentProfile.getPlaygrounds().indexOf(p), playground);
					break;
				}
			}
			session.setAttribute("profile", currentProfile);
			res.setStatus(HttpServletResponse.SC_OK);
			return HttpServletResponse.SC_OK;
		}
		res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
		return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
	}
}
