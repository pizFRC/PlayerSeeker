package mat.unical.it.PlayerSeeker.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Address implements java.io.Serializable{

	private static final long serialVersionUID = 1818521083889150483L;
	
	private Long id;
	 
	private float longitude;
	   
    private float latitude;
    

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public Long getID() {return id;}

    public void setId(Long id) {this.id = id;}
    
    public Address() {super();}
}
