package mat.unical.it.PlayerSeeker.PlayerSeeker.controller;

import javax.servlet.http.HttpServletRequest;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;

@Controller
public class HomePage {
	public String homePage(HttpServletRequest req, HttpServletResponse resp) {
		return "index";
	}
}
