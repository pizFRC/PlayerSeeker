package mat.unical.it.PlayerSeeker.model;

public class Address implements java.io.Serializable{

	private static final long serialVersionUID = 1818521083889150483L;
	
	private String city = null;
    private String via = null;
    private int zip = 0;
    private String province = null;
    private String position = null;

    public Address() {}

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getVia() {
        return via;
    }

    public void setVia(String via) {
        this.via = via;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
