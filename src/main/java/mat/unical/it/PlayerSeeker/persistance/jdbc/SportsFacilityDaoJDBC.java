package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.persistance.SportsFacilityDao;

public class SportsFacilityDaoJDBC implements SportsFacilityDao {
	
	Connection connection;
	
	public SportsFacilityDaoJDBC(Connection connection) {
		this.connection = connection;
	}

	@Override
	public List<SportsFacility> doRetrieveAll() {
		List<SportsFacility> facilityList = new ArrayList<SportsFacility>();
		PreparedStatement query;

		SportsFacility sportsFacility;
		ResultSet result = null;

		try{
			query = connection.prepareStatement("SELECT * FROM sport_facility;");
			result = query.executeQuery();

			while(result.next()) {
				sportsFacility = DatabaseJDBC.getInstance().getSportsFacilityProxy();
				sportsFacility.setId(result.getLong("id"));
				sportsFacility.setName(result.getString("name"));
				sportsFacility.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getLong("address_id")));
				sportsFacility.setPhone(result.getString("phone"));
				sportsFacility.setWebSiteUrl(result.getString("web_site_url"));

				facilityList.add(sportsFacility);
			}
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}

		return facilityList;
	}

	@Override
	public SportsFacility doRetrieveByKey(Long id) {
		SportsFacilityProxy sportsFacility;
		String query = "SELECT * FROM sport_facility WHERE id = ?";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, id);
			ResultSet result = statement.executeQuery(); 
			if(result.next()) {
				sportsFacility = DatabaseJDBC.getInstance().getSportsFacilityProxy();
				sportsFacility.setId(result.getLong("id"));
				sportsFacility.setName(result.getString("name"));
				sportsFacility.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getLong("address_id")));
				sportsFacility.setPhone(result.getString("phone"));
				sportsFacility.setWebSiteUrl(result.getString("web_site_url"));
				return sportsFacility;
			}
			else 
				return null;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean saveOrUpdate(SportsFacility sportsFacility) {
		try {
			String query;
			PreparedStatement statement;
			if(doRetrieveByKey(sportsFacility.getId()) == null) {
				//INSERT
				query = "INSERT INTO sport_facility values(?,?,?,?,?)";
				statement = connection.prepareStatement(query);
				statement.setLong(1, sportsFacility.getId());
				statement.setString(2, sportsFacility.getName());
				statement.setLong(3, sportsFacility.getAddress().getID());
				statement.setString(4, sportsFacility.getPhone());
				statement.setString(5, sportsFacility.getWebSiteUrl());
				statement.execute();
				statement.close();
			}
			else {
				//UPDATE
				query = "UPDATE sport_facility SET name = ?, address_id = ?, phone = ?, web_site_url = ? WHERE id = ?";
				statement = connection.prepareStatement(query);
				statement.setString(1, sportsFacility.getName());
				statement.setLong(2, sportsFacility.getAddress().getID());
				statement.setString(3, sportsFacility.getPhone());
				statement.setString(4, sportsFacility.getWebSiteUrl());
				statement.setLong(5, sportsFacility.getId());
				statement.executeUpdate();
				statement.close();
			}

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

	@Override
	public List<SportsFacility> doRetrieveByBBox(Address southWest, Address northEast) {
		List<SportsFacility> facilityList = new ArrayList<SportsFacility>();
		PreparedStatement query;
		SportsFacility sportsFacility;
		ResultSet result = null;
		try{
			query = connection.prepareStatement("SELECT * FROM sport_facility s INNER JOIN address a ON a.id = s.address_id WHERE a.longitude >= ? AND a.longitude <= ? AND a.latitude >= ? AND a.latitude <= ?;");
			query.setFloat(1,southWest.getLongitude());
			query.setFloat(2,northEast.getLongitude());
			query.setFloat(3,southWest.getLatitude());
			query.setFloat(4,northEast.getLatitude());
			result = query.executeQuery();
			while(result.next()) {
				sportsFacility = DatabaseJDBC.getInstance().getSportsFacilityProxy();
				sportsFacility.setId(result.getLong("id"));
				sportsFacility.setName(result.getString("name"));
				sportsFacility.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getLong("address_id")));
				sportsFacility.setPhone(result.getString("phone"));
				sportsFacility.setWebSiteUrl(result.getString("web_site_url"));
				facilityList.add(sportsFacility);
			}
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}
		return facilityList;	
	}
}
