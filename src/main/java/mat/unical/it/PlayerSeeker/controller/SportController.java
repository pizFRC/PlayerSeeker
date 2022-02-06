package mat.unical.it.PlayerSeeker.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class SportController {
	
	@PostMapping("/getSportList")
	public List<Sport> getSportList(HttpServletResponse res) {
		if(!DatabaseJDBC.getInstance().checkConnection()) {
			res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return null;
		}
		res.setStatus(HttpServletResponse.SC_OK);
		return DatabaseJDBC.getInstance().getSportDao().doRetrieveAll();
	}

}
