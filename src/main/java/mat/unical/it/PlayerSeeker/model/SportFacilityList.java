package mat.unical.it.PlayerSeeker.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

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
	public void setBySport(ArrayList<SportsFacility> strutture,Sport sport,String data,String oraInizio,String oraFine) {
		listaStrutture.clear();
	
		ArrayList<Long>index=DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveAllByDateAndSport(sport.getId(),LocalDate.parse(data),LocalTime.parse(oraInizio),LocalTime.parse(oraFine));
	 for(Long i:index)
		 System.out.println(i);
		for(int i=0;i<strutture.size();i++) {
			
			for(int j=0;j<strutture.get(i).getPlaygrounds().size();j++ ) {
				boolean checkSport=strutture.get(i).getPlaygrounds().get(j).getSport().getType().equals(sport.getType());
				List<SportEvent>eventi=DatabaseJDBC.getInstance().getSportsEventDao().doRetrieveAll();
				boolean orario=index.contains(strutture.get(i).getId());
				if(orario)
					System.out.println("libera"+strutture.get(i).getId());
				if(checkSport && orario) {
					
					listaStrutture.add(strutture.get(i));
					break;
				}
			}
			
		}

	}
}

