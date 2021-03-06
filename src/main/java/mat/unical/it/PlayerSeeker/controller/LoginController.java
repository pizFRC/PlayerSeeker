package mat.unical.it.PlayerSeeker.controller;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@Controller
public class LoginController {
	
	@GetMapping("/logout")
	public void logout(HttpServletRequest req, HttpServletResponse res) throws IOException {
		HttpSession session = req.getSession();
		session.invalidate();
		res.sendRedirect("/");
	}
	
	@PostMapping("/checkUser")
	public String loginCheck(HttpServletRequest req, HttpServletResponse res, @RequestParam("username") String username, @RequestParam("password") String password) {	 
		User user = DatabaseJDBC.getInstance().getUserDao().doRetrieveByKey(username);
		if(user == null) {
			req.setAttribute("errorMessage", "L'username inserito non esiste.");
			return "login";
		}
		//Controllo password
		if(!BCrypt.checkpw(password, user.getPassword())) {
			req.setAttribute("errorMessage", "La password inserita non è corretta.");
			return "login";
		}
		HttpSession session = req.getSession(true);
		session.setAttribute("user", user);
		if(user.getUserType().compareTo("player") == 0) {
			Player player = DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(user.getId());
			System.out.println("latitudine"+player.getAddress().getLatitude()+"long "+player.getAddress().getLongitude());
			session.setAttribute("profile", player);
			try {
				res.sendRedirect("/");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		else if(user.getUserType().compareTo("sport_facility") == 0) {
			SportsFacility sportFacility = DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(user.getId());
			session.setAttribute("profile", sportFacility);
			try {
				res.sendRedirect("/accountManagementSportFacility");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return "login";
	}
}