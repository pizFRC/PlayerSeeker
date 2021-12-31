package mat.unical.it.PlayerSeeker.model;

import java.util.Date;

public class SportEvent implements java.io.Serializable {

    private int id = 0;
    private Date data = null;
    private int idStruttura = 0;
    private int idSport = 0;
    private int idOrganizzatore = 0;

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

    public int getIdStruttura() {
        return idStruttura;
    }

    public void setIdStruttura(int idStruttura) {
        this.idStruttura = idStruttura;
    }

    public int getIdSport() {
        return idSport;
    }

    public void setIdSport(int idSport) {
        this.idSport = idSport;
    }

    public int getIdOrganizzatore() {
        return idOrganizzatore;
    }

    public void setIdOrganizzatore(int idOrganizzatore) {
        this.idOrganizzatore = idOrganizzatore;
    }
}
