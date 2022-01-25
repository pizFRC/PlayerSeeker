package mat.unical.it.PlayerSeeker.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class SportEvent implements java.io.Serializable {
	
	private static final long serialVersionUID = -1807415135910177674L;
	
	private Long id;
	private Long idStruttura=null;
	private LocalDate start = null;
	private LocalTime beginHour=null;
	private LocalTime endHour=null;
   	private Sport sport = null;
    private Playground playground = null;
    private String description = null;
    private Player organizzatore = null;
    private List<Player> players = new ArrayList<Player>();

	@Override
	public int hashCode() {
		return Objects.hash(start, id, organizzatore, sport);
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
		return Objects.equals(start, other.start) && id == other.id && Objects.equals(organizzatore, other.organizzatore)
				&& Objects.equals(sport, other.sport);
	}

	public SportEvent(Long id, LocalDate data, Sport sports, Player organizzatore,
			List<Player> players) {
		super();
		this.id = id;
		this.start = data;
		this.sport = sports;
		this.organizzatore = organizzatore;
		this.players = players;
	}
	public SportEvent(Long id, Sport sports, Player organizzatore,
			List<Player> players) {
		super();
		this.id = id;
	
		this.sport = sports;
		this.organizzatore = organizzatore;
		this.players = players;
	}

    public SportEvent() {super();}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getData() {
        return start;
    }

    public void setData(LocalDate data) {
        this.start = data;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sports) {
        this.sport = sports;
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

	public Playground getPlayground() {
		return playground;
	}

	public void setPlayground(Playground playground) {
		this.playground = playground;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getStart() {
		return start;
	}

	public void setStart(LocalDate start) {
		this.start = start;
	}

    public Long getIdStruttura() {
        return idStruttura;
    }

    public void setIdStruttura(Long id) {
        this.id = id;
    }

	public LocalTime getBeginHour() {
		return beginHour;
	}

	public void setBeginHour(LocalTime beginHour) {
		this.beginHour = beginHour;
	}

	public LocalTime getEndHour() {
		return endHour;
	}

	public void setEndHour(LocalTime endHour) {
		this.endHour = endHour;
	}
}
