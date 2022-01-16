package mat.unical.it.PlayerSeeker.model;

public class User implements java.io.Serializable{
	
	private static final long serialVersionUID = -6640442094222681788L;
	
	private Long id = null;
	private String username = null;
	private String password = null;
	private String userType = null;
	private String email = null;

	public User() {}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
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

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
