package mat.unical.it.PlayerSeeker.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mat.unical.it.PlayerSeeker.model.Events;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.SportTypes;
import mat.unical.it.PlayerSeeker.model.Sports;

@RestController
public class EventsController {

	@GetMapping("/listaEventi")
	public Events getEvents() {
		
		ArrayList<Player>partecipanti=new 	ArrayList<Player>();
		Player tmp=new Player("fra","def",21,"fde@gmail.com");
		Player tmp2=new Player("gab","abc",22,"gab@gmail.com");
		Player tmp3=new Player("dan","dfe",23,"dan@gmail.com");
		Player tmp4=new Player("gio","ghi",24,"gio@gmail.com");
		partecipanti.add(tmp);
		
		//da sostituire con quelli presi dal db 
		SportEvent tmpS1=new SportEvent(1,new Sports(10,SportTypes.CALCIO),tmp,partecipanti);
		SportEvent tmpS2=new SportEvent(2,new Sports(1,SportTypes.BODY_BUILDING),tmp2,partecipanti);
		SportEvent tmpS3=new SportEvent(3,new Sports(20,SportTypes.RUGBY),tmp3,partecipanti);
		SportEvent tmpS4=new SportEvent(4,new Sports(2,SportTypes.TENNIS),tmp4,partecipanti);
		SportEvent tmpS5=new SportEvent(5,new Sports(20,SportTypes.RUGBY),tmp,partecipanti);
		SportEvent tmpS6=new SportEvent(6,new Sports(10,SportTypes.CALCIO),tmp,partecipanti);
		Events eventi=new Events();
		
		eventi.add(tmpS1);
		eventi.add(tmpS2);
		eventi.add(tmpS3);
		eventi.add(tmpS4);
		eventi.add(tmpS5);
		eventi.add(tmpS6);
		return eventi;	
	}
}
