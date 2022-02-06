package mat.unical.it.PlayerSeeker.model;

public class Sport implements java.io.Serializable {

	private static final long serialVersionUID = 4517712161096114310L;
	
	private Long id;
	private int requiredPlayers = 0;
    private String type = null;

    public Sport() {}
    
    public Sport(int requiredPlayers, String type) {
		super();
		this.requiredPlayers = requiredPlayers;
		this.type = type;
	}
    
    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

    public int getrequiredPlayers() {
        return requiredPlayers;
    }

    public void setrequiredPlayers(int requiredPlayers) {
        this.requiredPlayers = requiredPlayers;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
