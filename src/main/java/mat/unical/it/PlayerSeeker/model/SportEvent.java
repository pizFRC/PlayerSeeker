package mat.unical.it.PlayerSeeker.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class SportEvent implements java.io.Serializable {

	private static final long serialVersionUID = -1807415135910177674L;
	
	private int id = 0;
    private Date data = null;
    private SportsFacility facility = null;
    private Sports sports = null;
    private Player organizzatore = null;
    private List<Player> players = new ArrayList<Player>();

    public SportEvent() {super();}

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
