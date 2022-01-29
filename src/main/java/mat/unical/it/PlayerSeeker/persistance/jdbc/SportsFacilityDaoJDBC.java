package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.time.LocalDate;
import java.time.LocalTime;
import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.SportEvent;
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
	@Override
	public Map<Long,Long> doRetrieveAllByDateAndSport(Long ID,LocalDate start,LocalTime begin,LocalTime end) {
		PreparedStatement query = null;
		
		Map<Long,Long>mappa=new HashMap<Long,Long>();

	String sqlQuery="select p.id, p.sport_facility_id from playground p where p.sport_id = ? and p.id not in" +
					"(select p.id from playground p inner join event e on e.playground_id = p.id where p.sport_id = ?" +
					"and e.start = ? and not (e.end_hour <= ? or e.begin_hour >= ?))";
			try {
				if(checkConnection()) {
			
					query = connection.prepareStatement(sqlQuery);
					query.setLong(1, ID);
					query.setDate(3,Date.valueOf(start)) ;
					query.setLong(2, ID);
					query.setTime(4,Time.valueOf(begin));
					query.setTime(5,Time.valueOf(end));
					
					/*	query.setDate(3,Date.valueOf(start)) ;
					
					query.setTime(4,Time.valueOf(begin));
					query.setTime(5,Time.valueOf(end));
					
					query.setTime(6,Time.valueOf(begin));
					query.setTime(7,Time.valueOf(end));
					query.setTime(8,Time.valueOf(begin));
					
					
					query.setTime(9,Time.valueOf(begin));
					query.setTime(10,Time.valueOf(end));
					query.setTime(11,Time.valueOf(end));
					
					query.setTime(12,Time.valueOf(begin));
					query.setTime(13,Time.valueOf(end));
					query.setTime(14,Time.valueOf(end));
					*/
					ResultSet result = query.executeQuery();

					while(result.next()) {
						
						mappa.put(result.getLong("id"),result.getLong("sport_facility_id"));
						
					}
				}
				query.close();
			} catch(SQLException e) {
				e.printStackTrace();
				return null;
			}
			
					
		
		return mappa;
	}
}
