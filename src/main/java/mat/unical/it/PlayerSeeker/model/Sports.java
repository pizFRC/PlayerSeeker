package mat.unical.it.PlayerSeeker.model;

public class Sports implements java.io.Serializable {

	private static final long serialVersionUID = 4517712161096114310L;
	
	private int partecipanti = 0;
    private SportTypes sportType = null;

    public Sports() {}

    public int getPartecipanti() {
        return partecipanti;
    }

    public void setPartecipanti(int partecipanti) {
        this.partecipanti = partecipanti;
    }

    public SportTypes getSportType() {
        return sportType;
    }

    public void setSportType(SportTypes sportType) {
        this.sportType = sportType;
    }
}
