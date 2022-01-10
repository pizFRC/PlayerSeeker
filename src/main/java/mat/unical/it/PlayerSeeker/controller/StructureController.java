package mat.unical.it.PlayerSeeker.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import mat.unical.it.PlayerSeeker.model.Events;
import mat.unical.it.PlayerSeeker.model.Facilities;
import mat.unical.it.PlayerSeeker.model.SportsFacility;

@RestController
public class StructureController {

	@GetMapping("/listaStrutture")
	public Facilities getStrutture() {
		Facilities f=new Facilities();
		SportsFacility primo=new SportsFacility(1,"JogaBonito",00000);
		SportsFacility secondo=new SportsFacility(2,"Sporting",00000);
		f.add(primo);
		f.add(secondo);
		return f;
		
		
	}
}
