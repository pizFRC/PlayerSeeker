package mat.unical.it.PlayerSeeker.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

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
	
		Map<Long,Long>index=DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveAllByDateAndSport(sport.getId(),LocalDate.parse(data),LocalTime.parse(oraInizio),LocalTime.parse(oraFine));
	 for(Long i:index.keySet())
		 System.out.println("index:"+i+" : stru id "+index.get(i));
	
	
	 System.out.println(strutture.size());
		for(int i=0;i<strutture.size();i++) {
		//	boolean orario=!index.contains(strutture.get(i).getId());
			

			
				
				 Iterator<Playground> iterator = strutture.get(i).getPlaygrounds().iterator();
			
				 while (iterator.hasNext()) {
					 Playground key = iterator.next();
				   
				     if (!index.containsKey(key.getId()) || !key.getSport().getType().equals(sport.getType()) ) {
				        
				    	 iterator.remove();
				     }
				 }
							
				
				if(!strutture.get(i).getPlaygrounds().isEmpty()) {
					System.out.println(strutture.get(i).getName());
					listaStrutture.add(strutture.get(i));
				
				}
		
			}
			
		}

	
}

