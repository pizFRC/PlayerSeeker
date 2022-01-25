package mat.unical.it.PlayerSeeker.model;

import java.util.List;

public class Playground {
	
	private Long id;
	private Long sportFacilityId;
	private String description;
	private Sport sport;
	 private List<SportEvent> events = null;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Sport getSport() {
		return sport;
	}
	public void setSport(Sport sport) {
		this.sport = sport;
	}
	public List<SportEvent> getEvents() {
		return events;
	}
	public void setEvents(List<SportEvent> events) {
		this.events = events;
	}
	public void setSportFacilityId(Long sportFacilityId) {
		this.sportFacilityId=sportFacilityId;
		
	}
	public Long getSportFacilityId(Long sportFacilityId) {
	return sportFacilityId;
		
	}

}