package mat.unical.it.PlayerSeeker.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@Controller
public class LoginController {


	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}
	
	@GetMapping("/eventi")
	public String eventi() {
		return "eventi";
	}
	
	@PostMapping("/checkUsername")
	public void loginCheck(HttpServletRequest req,HttpServletResponse res,@RequestBody String username) {	 

		   System.out.println("accedi premuto da : "+username);
		   res.setStatus(200);
		
		  
		}
	
	@PostMapping("/check")
	public void loginCheckRedirect (HttpServletResponse res,HttpServletRequest req,@RequestBody String username) {	 

		   System.out.println("dal tasto avanti : "+username +" ,password:1234");
		   res.setStatus(200);
		   
		   try {
			   res.sendRedirect("/");		  // RequestDispatcher dispacher = req.getRequestDispatcher("WEB-INF/jsp/index.jsp");
	//dispacher.forward(req, res);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
		}
	
	
	@PostMapping("/endValidation")
	public void endValidation(HttpServletRequest req,HttpServletResponse res,@RequestBody String username) {	 

		   System.out.println("sto per reindirizzare " +username);
		   res.setStatus(200);
		
		}
	
	
	
}