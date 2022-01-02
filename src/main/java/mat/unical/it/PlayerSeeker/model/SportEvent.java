package mat.unical.it.PlayerSeeker.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

public class SportEvent implements java.io.Serializable {

	@Override
	public int hashCode() {
		return Objects.hash(data, id, organizzatore, sports);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SportEvent other = (SportEvent) obj;
		return Objects.equals(data, other.data) && id == other.id && Objects.equals(organizzatore, other.organizzatore)
				&& Objects.equals(sports, other.sports);
	}

	public SportEvent(int id, Date data, SportsFacility facility, Sports sports, Player organizzatore,
			List<Player> players) {
		super();
		this.id = id;
		this.data = data;
		this.facility = facility;
		this.sports = sports;
		this.organizzatore = organizzatore;
		this.players = players;
	}
	public SportEvent(int id, Sports sports, Player organizzatore,
			List<Player> players) {
		super();
		this.id = id;
	
		this.sports = sports;
		this.organizzatore = organizzatore;
		this.players = players;
	}

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
