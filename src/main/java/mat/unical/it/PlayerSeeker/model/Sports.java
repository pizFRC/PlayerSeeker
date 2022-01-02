package mat.unical.it.PlayerSeeker.model;

public class Sports implements java.io.Serializable {

	public Sports(int partecipanti, String sportType) {
		super();
		this.partecipanti = partecipanti;
		this.sportType = sportType;
	}

	private static final long serialVersionUID = 4517712161096114310L;
	
	private int partecipanti = 0;
    private String sportType = null;

    public Sports() {super();}

    public int getPartecipanti() {
        return partecipanti;
    }

    public void setPartecipanti(int partecipanti) {
        this.partecipanti = partecipanti;
    }

    public String getSportType() {
        return sportType;
    }

    public void setSportType(String sportType) {
        this.sportType = sportType;
    }
}
