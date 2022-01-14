package mat.unical.it.PlayerSeeker.controller;
import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@Controller
public class LoginController {

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
	
	@PostMapping("/checkUser")
	public String loginCheck(HttpServletRequest req, HttpServletResponse res, @RequestParam("username") String username, @RequestParam("password") String password) {	 
		User user = DatabaseJDBC.getInstance().getUserDao().doRetrieveByKey(username);
		if(user == null) {
			req.setAttribute("errorMessage", "L'username inserito non esiste.");
			return "redirect:/login";
		}
		//Controllo password
		if(!BCrypt.checkpw(user.getPassword(), password)) {
			req.setAttribute("errorMessage", "La password inserita non è corretta.");
			return "login";
		}
		return "login";
	}
	
	
	@GetMapping("/nuovoEvento")
	public String nuovoEvento() {
		return "nuovoEvento";
	}
}