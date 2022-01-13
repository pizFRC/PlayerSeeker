package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.persistance.SportEventDao;

public class SportEventDaoJDBC implements SportEventDao {
	
	Connection connection;
	
	public SportEventDaoJDBC(Connection connection) {
		this.connection = connection;
	}

	private boolean checkConnection() {
		try {
			if(connection == null || connection.isClosed())
				return false;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return true;
	}

	@Override
	public List<SportEvent> doRetrieveAll() {
		List<SportEvent> sportEvents = new ArrayList<SportEvent>();
		PreparedStatement query = null;

		SportEvent tmp;
		ResultSet result;

		try{
			query = connection.prepareStatement("SELECT * FROM sportevent;");
			result = query.executeQuery();

			while(result.next()) {
				tmp = new SportEvent();

				sportEvents.add(tmp);
			}

		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}

		return sportEvents;
	}

	@Override
	public SportEvent doRetrieveByKey(String ID) {
		PreparedStatement query = null;
		SportEvent tmp = null;

		try {
			if(checkConnection()) {
				query = connection.prepareStatement("SELECT * FROM sportevent WHERE id=?;");
				ResultSet result = query.executeQuery();

				if(result.next()) {
					tmp = new SportEvent();
					tmp.setId(result.getLong("id"));
					tmp.setData(result.getDate("date").toLocalDate());
				}
			}
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}
		return tmp;
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
