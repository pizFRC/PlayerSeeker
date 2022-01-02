package mat.unical.it.PlayerSeeker.controller;
import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@Controller
public class LoginController {

	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}
	
	@PostMapping("/checkUser")
	public String loginCheck(HttpServletRequest req, HttpServletResponse res, @RequestBody String username, @RequestBody String password) {	 
		User user = DatabaseJDBC.getInstance().getUserDao().doRetrieveByKey(username);
		if(user == null) {
			//Messaggio di errore: l'utente non esiste
			req.setAttribute("errorMessage", "L'username inserito non esiste.");
			return "login";
		}
		//Controllo password
		if(!BCrypt.checkpw(user.getPassword(), password)) {
			//Messaggio di errore: password sbagliata
			req.setAttribute("errorMessage", "La password inserita non è corretta.");
			return "login";
		}
		if(user instanceof Player) {
			Player player = (Player) user;
			HttpSession session = req.getSession(true);
			session.setAttribute("user", player);
			return "playerInterface";
		}
		else {
			SportsFacility sportsFacility = (SportsFacility) user;
			HttpSession session = req.getSession(true);
			session.setAttribute("user", sportsFacility);
			return "sportFacilityInterface";
		}
	}
}