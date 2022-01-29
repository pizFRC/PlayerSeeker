package mat.unical.it.PlayerSeeker.persistance;

import mat.unical.it.PlayerSeeker.persistance.jdbc.AddressIdBroker;
import mat.unical.it.PlayerSeeker.persistance.jdbc.OpeningHoursIdBroker;
import mat.unical.it.PlayerSeeker.persistance.jdbc.PlaygroundIdBroker;
import mat.unical.it.PlayerSeeker.persistance.jdbc.SportEventIdBroker;
import mat.unical.it.PlayerSeeker.persistance.jdbc.SportEventProxy;
import mat.unical.it.PlayerSeeker.persistance.jdbc.SportsFacilityProxy;
import mat.unical.it.PlayerSeeker.persistance.jdbc.UserIdBroker;

public interface Database {
	
	public UserIdBroker getUserIdBroker();
	public AddressIdBroker getAddressIdBroker();
	public PlaygroundIdBroker getPlaygroundIdBroker();
	public PlayerDao getPlayerDao();
	public SportsFacilityDao getSportsFacilityDao();
	public SportEventDao getSportsEventDao();
	public UserDao getUserDao();
	public AddressDao getAddressDao();
	public SportDao getSportDao();
	public SportEventProxy getSportEventProxy();
	public PlaygroundDao getPlaygroundDao();
	public SportsFacilityProxy getSportsFacilityProxy();
	public OpeningHoursDao getoOpeningHoursDao();
	public SportEventIdBroker getSportEventIdBroker();
	public OpeningHoursIdBroker getOpeningHoursIdBroker();

}
