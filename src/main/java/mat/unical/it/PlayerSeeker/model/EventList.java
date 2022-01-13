package mat.unical.it.PlayerSeeker.model;

import java.util.ArrayList;

public class EventList {

	public EventList() {
		listaEventi=new  ArrayList<SportEvent>();
	}
	
	private ArrayList<SportEvent>listaEventi=null;

	public ArrayList<SportEvent> getListaEventi() {
		return listaEventi;
	}

	public void setListaEventi(ArrayList<SportEvent> listaEventi) {
		this.listaEventi = listaEventi;
	}
	
	public void add(SportEvent event) {
		listaEventi.add(event);
	}
	
	public void remove(SportEvent event) {
		listaEventi.remove(event);
	}
}

