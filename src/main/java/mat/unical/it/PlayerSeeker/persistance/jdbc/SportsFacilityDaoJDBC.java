package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.persistance.SportsFacilityDao;

public class SportsFacilityDaoJDBC implements SportsFacilityDao {
	
	Connection connection;
	
	public SportsFacilityDaoJDBC(Connection connection) {
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
	public List<SportsFacility> doRetrieveAll() {
		List<SportsFacility> facilityList = new ArrayList<SportsFacility>();
		PreparedStatement query;

		SportsFacility tmp;
		ResultSet result = null;

		try{
			query = connection.prepareStatement("SELECT * FROM sportsfacility;");
			result = query.executeQuery();

			while(result.next()) {
				tmp = new SportsFacility();
				tmp.setId(result.getLong("id"));
				tmp.setNome(result.getString("nome"));
				//tmp.setAddress(result.getObject(3, Class< Address > type));
				tmp.setPhone(result.getString("phone"));

				facilityList.add(tmp);
			}
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}

		return facilityList;
	}

	@Override
	public SportsFacility doRetrieveByKey(Long ID) {
		PreparedStatement query = null;
		SportsFacility tmp = null;

		try {
			if(checkConnection()) {
				query = connection.prepareStatement("SELECT * FROM sportsfacility WHERE id=?;");
				ResultSet result = query.executeQuery();

				if(result.next()) {
					tmp = new SportsFacility();
					tmp.setId(result.getLong("id"));
					tmp.setNome(result.getString("nome"));
					//tmp.setAddress(result.getObject(3, Class< Address > type));
					tmp.setPhone(result.getString("phone"));
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
	public boolean saveOrUpdate(SportsFacility sportsFacility) {
		PreparedStatement query = null;

		try{
			SportsFacility tmp = doRetrieveByKey(sportsFacility.getId());
			if(tmp == null) {
				//INSERT da vedere come fare
				query = connection.prepareStatement("INSERT INTO sportsfacility");
			} else {
				//UPDATE
			}

			query.close();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public boolean delete(SportsFacility sportsFacility) {
		PreparedStatement query = null;

		try{
			query = connection.prepareStatement("DELETE sportsfacility WHERE id=?;");

			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

}
