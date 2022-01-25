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
	public void setBySport(ArrayList<SportsFacility> strutture,Sport sport) {
		listaStrutture.clear();
	
		for(int i=0;i<strutture.size();i++) {
			
			for(int j=0;j<strutture.get(i).getPlaygrounds().size();j++ ) {
				boolean checkSport=strutture.get(i).getPlaygrounds().get(j).getSport().getType().equals(sport.getType());
				boolean orario=true;
				if(checkSport && orario) {
					
					listaStrutture.add(strutture.get(i));
					break;
				}
			}
			
		}

	}
}

