package mat.unical.it.PlayerSeeker.model;

public class SportsFacility extends User implements java.io.Serializable {

    private int id = 0;
    private String nome = null;
    private String indirizzo = null;
    private int telefono = 0;
    private String posizione = null;

    public SportsFacility() {}

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }
}
