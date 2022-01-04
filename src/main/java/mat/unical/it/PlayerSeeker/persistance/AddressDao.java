package mat.unical.it.PlayerSeeker.persistance;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportsFacility;

public interface AddressDao {

    public Address doRetrieveByInteger(int address);
}
