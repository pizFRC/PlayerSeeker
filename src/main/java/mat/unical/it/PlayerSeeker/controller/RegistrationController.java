package mat.unical.it.PlayerSeeker.controller;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class RegistrationController {

	@PostMapping("/checkUsername")
	public int loginCheck(HttpServletResponse res, @RequestBody String username) {
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
}
