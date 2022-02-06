package mat.unical.it.PlayerSeeker.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class Player implements java.io.Serializable{

	private static final long serialVersionUID = -23201302077253540L;
	
	private Long id = null;
	private String name = null;
    private String surname = null;
    private LocalDate birthday = null;
    private Address address = null;
    private List<SportEvent> events = null;
    private List<Sport> sports = null;

    public Player(String nome, String cognome, int eta, String email) {
		this.setName(nome);
		this.setSurname(cognome);
	}
    
    public Player() {}
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public LocalDate getBirthday() {
		return birthday;
	}

	public void setBirthday(LocalDate birthday) {
		birthday.format(DateTimeFormatter.ISO_LOCAL_DATE);
		this.birthday = birthday;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public List<SportEvent> getEvents() {
		return events;
	}

	public void setEvents(List<SportEvent> events) {
		this.events = events;
	}

	public List<Sport> getSports() {
		return sports;
	}

	public void setSports(List<Sport> sports) {
		this.sports = sports;
	}

  
}
