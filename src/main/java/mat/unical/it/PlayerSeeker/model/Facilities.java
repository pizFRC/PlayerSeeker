package mat.unical.it.PlayerSeeker.model;

import java.util.ArrayList;

public class Facilities {

	public Facilities() {
		listaStrutture=new  ArrayList<SportsFacility>();
	}
	
	private ArrayList<SportsFacility>listaStrutture=null;

	public ArrayList<SportsFacility> getListaStrutture() {
		return listaStrutture;
	}

	public void setListaEventi(ArrayList<SportsFacility> listaStrutture) {
		this.listaStrutture = listaStrutture;
	}
	
	public void add(SportsFacility facility) {
		listaStrutture.add(facility);
		}
	
	public void remove(SportsFacility facility) {
		listaStrutture.remove(facility);
	}
	}

