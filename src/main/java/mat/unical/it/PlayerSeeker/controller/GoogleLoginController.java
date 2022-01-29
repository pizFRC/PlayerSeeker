package mat.unical.it.PlayerSeeker.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class GoogleLoginController {
	
	@PostMapping("/checkGoogleUser")
	public User googleLoginCheck(HttpServletRequest req, HttpServletResponse res, @RequestBody String googleId) {
		Gson gson = new Gson();
		googleId = gson.fromJson(googleId, String.class);
		User user = DatabaseJDBC.getInstance().getUserDao().doRetrieveByGoogleId(googleId);
		if(user == null) {
			res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return null;
		}
		HttpSession session = req.getSession(true);
		session.setAttribute("user", user);
		if(user.getUserType().compareTo("player") == 0) {
			Player player = DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(user.getId());
			System.out.println("latitudine"+player.getAddress().getLatitude()+"long "+player.getAddress().getLongitude());
			session.setAttribute("profile", player);
		}
		else if(user.getUserType().compareTo("sport_facility") == 0) {
			SportsFacility sportFacility = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(user.getId());
			session.setAttribute("profile", sportFacility);
		}
		res.setStatus(HttpServletResponse.SC_OK);
		return user;
	}

}
