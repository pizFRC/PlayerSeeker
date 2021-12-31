package mat.unical.it.PlayerSeeker.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SportEvent implements java.io.Serializable {

    private int id = 0;
    private Date data = null;
    private SportsFacility facility = null;
    private Sports sports = null;
    private Player organizzatore = null;
    private List<Player> players = new ArrayList<Player>();

    public SportEvent() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public SportsFacility getFacility() {
        return facility;
    }

    public void setFacility(SportsFacility facility) {
        this.facility = facility;
    }

    public Sports getSport() {
        return sports;
    }

    public void setSport(Sports sports) {
        this.sports = sports;
    }

    public Player getOrganizzatore() {
        return organizzatore;
    }

    public void setOrganizzatore(Player organizzatore) {
        this.organizzatore = organizzatore;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }
}
