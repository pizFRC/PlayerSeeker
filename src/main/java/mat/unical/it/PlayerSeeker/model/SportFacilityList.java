package mat.unical.it.PlayerSeeker.model;

import java.util.ArrayList;

public class SportFacilityList {

	public SportFacilityList() {
		listaStrutture=new  ArrayList<SportsFacility>();
	}
	
	private ArrayList<SportsFacility>listaStrutture=null;

	public ArrayList<SportsFacility> getListaStrutture() {
		return listaStrutture;
	}

	public void setListaStrutture(ArrayList<SportsFacility> listaStrutture) {
		this.listaStrutture = listaStrutture;
	}
	
	public void add(SportsFacility struttura) {
		listaStrutture.add(struttura);
	}
	
	public void remove(SportsFacility struttura) {
		listaStrutture.remove(struttura);
	}
}

