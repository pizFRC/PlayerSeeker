package mat.unical.it.PlayerSeeker.model;

public class SportsFacility extends User implements java.io.Serializable {

	private static final long serialVersionUID = 340303583378633552L;
	
	private int id = 0;
    private String nome = null;
    private Address address = null;
    private int telefono = 0;
    //private String posizione = null;

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

    public int getTelefono() {
        return telefono;
    }

    public void setTelefono(int telefono) {
        this.telefono = telefono;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
