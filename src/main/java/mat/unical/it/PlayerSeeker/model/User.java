package mat.unical.it.PlayerSeeker.model;

public class User implements java.io.Serializable{
	
	private static final long serialVersionUID = -6640442094222681788L;
	
	private String username = null;
	private String password = null;

	public User() {super();}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

}
