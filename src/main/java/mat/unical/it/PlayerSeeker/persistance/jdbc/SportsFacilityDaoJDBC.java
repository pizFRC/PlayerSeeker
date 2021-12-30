package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.persistance.SportsFacilityDao;

public class SportsFacilityDaoJDBC implements SportsFacilityDao {
	
	Connection connection;
	
	public SportsFacilityDaoJDBC(Connection connection) {
		this.connection = connection;
	}

	@Override
	public List<SportsFacility> doRetrieveAll() {
		return null;
	}

	@Override
	public SportsFacility doRetrieveByKey(String ID) {
		return null;
	}

	@Override
	public boolean saveOrUpdate(SportsFacility sportsFacility) {
		return false;
	}

	@Override
	public boolean delete(SportsFacility sportsFacility) {
		return false;
	}

}
