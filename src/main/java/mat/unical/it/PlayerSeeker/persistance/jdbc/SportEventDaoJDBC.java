package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.persistance.SportEventDao;

public class SportEventDaoJDBC implements SportEventDao {
	
	Connection connection;
	
	public SportEventDaoJDBC(Connection connection) {
		this.connection = connection;
	}

	@Override
	public List<SportEvent> doRetrieveAll() {
		return null;
	}

	@Override
	public SportEvent doRetrieveByKey(String username) {
		return null;
	}

	@Override
	public boolean saveOrUpdate(SportEvent sportEvent) {
		return false;
	}

	@Override
	public boolean delete(SportEvent sportEvent) {
		return false;
	}

}
