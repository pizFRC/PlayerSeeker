package mat.unical.it.PlayerSeeker.persistance.jdbc;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.persistance.AddressDao;

public class AddressDaoJDBC implements AddressDao {
    @Override
    public Address doRetrieveByPlayer(Player player) {
        return null;
    }

    @Override
    public Address doRetrieveBySportFacility(SportsFacility sportsFacility) {
        return null;
    }
}
