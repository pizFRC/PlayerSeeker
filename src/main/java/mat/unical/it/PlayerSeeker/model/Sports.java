package mat.unical.it.PlayerSeeker.model;

import mat.unical.it.PlayerSeeker.persistance.jdbc.SportEventDaoJDBC;

public class Sports implements java.io.Serializable {

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
