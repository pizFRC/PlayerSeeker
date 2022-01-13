package mat.unical.it.PlayerSeeker.persistance;

import mat.unical.it.PlayerSeeker.persistance.jdbc.AddressIdBroker;
import mat.unical.it.PlayerSeeker.persistance.jdbc.UserIdBroker;

public interface Database {
	
	public UserIdBroker getUserIdBroker();
	public AddressIdBroker getAddressIdBroker();
	public PlayerDao getPlayerDao();
	public SportsFacilityDao getSportsFacilityDao();
	public SportEventDao getSportsEventDao();
	public UserDao getUserDao();
	public AddressDao getAddressDao();
	public SportDao getSportDao();

}
