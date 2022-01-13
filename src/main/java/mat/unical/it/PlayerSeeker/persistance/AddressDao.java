package mat.unical.it.PlayerSeeker.persistance;

import mat.unical.it.PlayerSeeker.model.Address;

public interface AddressDao {

    public Address doRetrieveByID(Long id);
    public Address doRetrieveByPosition(float latitude, float longitude);
    public boolean saveOrUpdate(Address address);
}
