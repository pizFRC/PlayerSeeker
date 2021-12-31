package mat.unical.it.PlayerSeeker.model;

public class Player extends User implements java.io.Serializable{

    private String nome = null;
    private String cognome = null;
    private int eta = 0;
    private String email = null;

    public Player() {}

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public int getEta() {
        return eta;
    }

    public void setEta(int eta) {
        this.eta = eta;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
