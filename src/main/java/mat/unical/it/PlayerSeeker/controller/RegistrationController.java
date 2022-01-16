package mat.unical.it.PlayerSeeker.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.Player;
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
		User user = DatabaseJDBC.getInstance().getUserDao().doRetrieveByKey(email);
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
}
