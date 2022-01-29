package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.persistance.PlaygroundDao;

public class PlaygroundDaoJDBC implements PlaygroundDao{

	Connection connection;
	
	public PlaygroundDaoJDBC(Connection connection) {
		this.connection = connection;
	}

	@Override
	public List<PlaygroundDao> doRetrieveAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Playground doRetrieveByKey(Long id) {
		Playground playground;
		String query = "SELECT * FROM playground WHERE id = ?";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, id);
			ResultSet result = statement.executeQuery(); 
			if(result.next()) {
				playground = new Playground();
				playground.setId(id);
				playground.setDescription(result.getString("description"));
				playground.setSport(DatabaseJDBC.getInstance().getSportDao().doRetrieveById(result.getLong("sport_id")));
				playground.setSportFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey( result.getLong("sport_facility_id")));
				return playground;
			}
			else 
				return null;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean saveOrUpdate(Playground playground, Long sportFacilityId) {
		try {
			String query;
			PreparedStatement statement;
			if(doRetrieveByKey(playground.getId()) == null) {
				//INSERT
				query = "INSERT INTO playground values(?,?,?,?)";
				statement = connection.prepareStatement(query);
				statement.setLong(1, playground.getId());
				statement.setString(2, playground.getDescription());
				statement.setLong(3, playground.getSport().getId());
				statement.setLong(4, sportFacilityId);
				statement.execute();
				statement.close();
			}
			else {
				//UPDATE
				query = "UPDATE playground SET description = ?, sport_id = ?, sport_facility_id = ? WHERE id = ?";
				statement = connection.prepareStatement(query);
				statement.setString(1, playground.getDescription());
				statement.setLong(2, playground.getSport().getId());
				statement.setLong(3, sportFacilityId);
				statement.setLong(4, playground.getId());
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
	public boolean delete(Playground playground) {
		// TODO Auto-generated method stub
		return false;
	}
	
	@Override
	public  List<Playground>  doRetrieveBySportFacilityKey(Long id) {
		Playground playground;
		String query = "SELECT * FROM playground WHERE sport_facility_id = ?";
		try {
			 List<Playground> list=new  ArrayList<Playground>();
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, id);
			ResultSet result = statement.executeQuery(); 
			while(result.next()) {
				playground = new Playground();
				playground.setId(id);
				playground.setDescription(result.getString("description"));
				playground.setSport(DatabaseJDBC.getInstance().getSportDao().doRetrieveById(result.getLong("sport_id")));
				playground.setSportFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey( result.getLong("sport_facility_id")));
                list.add(playground);
				
			}
			
			
			return list;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

}
