package mat.unical.it.PlayerSeeker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AccountManagementController {
	
	@GetMapping("/accountManagementPlayer")
	public String accountManagementPlayer() {
		return "gestioneAccountPlayer";
	}
	
	@GetMapping("/accountManagementSportFacility")
	public String accountManagementSportFacility() {
		return "gestioneAccountSportFacility";
	}
}
