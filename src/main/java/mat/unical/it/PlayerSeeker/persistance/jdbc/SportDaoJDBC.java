package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.persistance.SportDao;

public class SportDaoJDBC implements SportDao{
	
	Connection connection;
	
	public SportDaoJDBC(Connection connection) {
		this.connection = connection;
	}
	
	@Override
	public List<Sport> doRetrieveAll() {
		List<Sport> sports = new ArrayList<Sport>();
		String query = "SELECT * FROM sport";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			ResultSet result = statement.executeQuery();
			while(result.next()) {
				Sport sport = new Sport();
				sport.setId(result.getLong("id"));
				sport.setType(result.getString("type"));
				sport.setrequiredPlayers(result.getInt("required_players"));
				
				sports.add(sport);
			}
			statement.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return sports;
	}

	@Override
	public Sport doRetrieveByKey(String type) {
		Sport tmp = new Sport();

		try {
			PreparedStatement query = connection.prepareStatement("SELECT * FROM sport WHERE type=?;");
			ResultSet result = query.executeQuery();
			query.setString(1,type);

			while(result.next()) {
				tmp.setId(result.getLong("id"));
				tmp.setType(result.getString("type"));
				tmp.setrequiredPlayers(result.getInt("required_players"));
			}
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}

		return tmp;
	}

	@Override
	public boolean saveOrUpdate(Sport sport) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean delete(Sport sport) {
		// TODO Auto-generated method stub
		return false;
	}

}
