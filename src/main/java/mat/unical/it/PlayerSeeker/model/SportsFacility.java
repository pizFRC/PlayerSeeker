package mat.unical.it.PlayerSeeker.model;

import java.util.List;

public class SportsFacility implements java.io.Serializable {

	private static final long serialVersionUID = 340303583378633552L;
	
	private Long id;
    private String name = null;
    private Address address = null;
    private String phone = null;
    private String webSiteUrl = null;
    private List<OpeningHours> openingHours = null;
    private List<Playground> playgrounds = null;
    private List<SportEvent> events = null;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWebSiteUrl() {
        return webSiteUrl;
    }

    public void setWebSiteUrl(String webSiteUrl) {
        this.webSiteUrl = webSiteUrl;
    }

    public SportsFacility() {super();}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return name;
    }

    public void setNome(String nome) {
        this.name = nome;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
    public SportsFacility(Long i, String n, String t)
    {
    	
    	this.id=i;
    	this.name=n;
    	this.phone=t;
    }

	public List<Playground> getPlaygrounds() {
		return playgrounds;
	}

	public void setPlaygrounds(List<Playground> playgrounds) {
		this.playgrounds = playgrounds;
	}
	
	public List<SportEvent> getEvents() {
		return events;
	}

	public void setEvents(List<SportEvent> events) {
		this.events = events;
	}

	public List<OpeningHours> getOpeningHours() {
		return openingHours;
	}

	public void setOpeningHours(List<OpeningHours> openingHours) {
		this.openingHours = openingHours;
	}
}
