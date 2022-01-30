package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportEvent;
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
			query = connection.prepareStatement("SELECT * FROM event;");
			result = query.executeQuery();

			while(result.next()) {
				tmp = new SportEventProxy();

				tmp.setId(result.getLong("id"));
				tmp.setStart(result.getDate("start").toLocalDate());
				tmp.setDescription(result.getString("description"));

				sportEvents.add(tmp);
			}

		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}

		return sportEvents;
	}

	@Override
	public SportEvent doRetrieveByKey(Long ID) {
		PreparedStatement query = null;
		SportEvent tmp = null;

		try {
			if(checkConnection()) {
				query = connection.prepareStatement("SELECT * FROM event WHERE id=?;");
				query.setLong(1, ID);
				ResultSet result = query.executeQuery();

				if(result.next()) {
					tmp = new SportEventProxy();
					tmp.setId(result.getLong("id"));
					tmp.setData(result.getDate("start").toLocalDate());
					tmp.setBeginHour(result.getTime("begin_hour").toLocalTime());
					tmp.setEndHour(result.getTime("end_hour").toLocalTime());
					tmp.setPlayersNumber(result.getInt("players_number"));
					tmp.setDescription(result.getString("description"));
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
		try {
			String query;
			PreparedStatement statement;

			if(doRetrieveByKey(sportEvent.getId()) == null) {
				query = "INSERT INTO event values(?,?,?,?,?,?,?,?);";
				System.out.println();
				statement = connection.prepareStatement(query);
				statement.setLong(1,sportEvent.getId());
				statement.setDate(2, Date.valueOf(sportEvent.getStart().toString()));
				statement.setLong(3,sportEvent.getSport().getId());
				statement.setLong(4,sportEvent.getPlayground().getId());
				statement.setString(5,sportEvent.getDescription());
				statement.setLong(6,sportEvent.getOrganizzatore().getId());
				statement.setTime(7, Time.valueOf(sportEvent.getBeginHour()));
				statement.setTime(8,Time.valueOf(sportEvent.getEndHour()));
				this.saveParticipate(sportEvent);
				statement.execute();
				statement.close();
			} else {
				query = "UPDATE event SET id=?, start=?, sport_id=?, playground_id=?, description=?, organizer_id=?,begin_hour=?,end_hour=? WHERE id=?;";
				statement = connection.prepareStatement(query);
				statement.setLong(1,sportEvent.getId());
				statement.setDate(2, Date.valueOf(sportEvent.getStart()));
				statement.setLong(3,sportEvent.getSport().getId());
				statement.setLong(4,sportEvent.getPlayground().getId());
				statement.setString(5,sportEvent.getDescription());
				statement.setLong(6,sportEvent.getOrganizzatore().getId());
				statement.setTime(7,Time.valueOf(sportEvent.getBeginHour()));
				statement.setTime(8,Time.valueOf(sportEvent.getEndHour()));
				statement.setLong(9,sportEvent.getId());
				this.updateParticipate(sportEvent);
				statement.executeUpdate();
				statement.close();
			}

		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean delete(SportEvent sportEvent) {

		PreparedStatement query = null;

		try {
			query = connection.prepareStatement("DELETE event WHERE id=?;");
			query.setLong(1,sportEvent.getId());
			query.executeQuery();
			this.deleteParticipate(sportEvent);
			query.close();

		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public boolean updateParticipate(SportEvent sportEvent) {
		try{
			for(Player p : sportEvent.getPlayers()) {
				PreparedStatement query = connection.prepareStatement("UPDATE participate SET player_id=? WHERE event_id=?;");
				query.setLong(1,p.getId());
				query.setLong(2,sportEvent.getId());
				query.executeUpdate();
				query.close();
			}
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean saveParticipate(SportEvent sportEvent) {
		try{
			for(Player p : sportEvent.getPlayers()) {
				PreparedStatement query = connection.prepareStatement("INSERT INTO participate values(nextval('participate_id_seq'),?,?)");
				query.setLong(1,p.getId());
				query.setLong(2,sportEvent.getId());
				query.execute();
				query.close();
			}
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteParticipate(SportEvent sportEvent) {
		PreparedStatement query = null;

		try {
			query = connection.prepareStatement("DELETE participate WHERE event_id=?;");
			query.setLong(1,sportEvent.getId());
			query.executeQuery();
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}
	@Override
	public List<SportEvent> doRetrieveAllByPlaygroundsKey(Long ID) {
		PreparedStatement query = null;
		SportEvent tmp = null;
		List<SportEvent> tmpList=new ArrayList<SportEvent>();

	
			try {
				if(checkConnection()) {
					query = connection.prepareStatement("SELECT * FROM event WHERE playground_id=? and start >= current_date;");
					query.setLong(1, ID);
					ResultSet result = query.executeQuery();

					while(result.next()) {
						tmp = new SportEventProxy();
						tmp.setId(result.getLong("id"));
						tmp.setData(result.getDate("start").toLocalDate());
						tmp.setDescription(result.getString("description"));
						tmp.setBeginHour(result.getTime("begin_hour").toLocalTime());
						tmp.setEndHour(result.getTime("end_hour").toLocalTime());
						tmpList.add(tmp);
					}
				}
				query.close();
			} catch(SQLException e) {
				e.printStackTrace();
				return null;
			}
			
		
		return tmpList;
	}
	@Override
	public List<SportEvent> doRetrieveAllBySportFacilityKey(Long ID) {
		String sqlQuery="SELECT e.* FROM event e INNER JOIN playground p ON e.playground_id = p.id WHERE p.sport_facility_id = ? AND e.start > current_date;";
		SportEvent tmp = null;
		List<SportEvent> tmpList=new ArrayList<SportEvent>();
		try {
			PreparedStatement query = connection.prepareStatement(sqlQuery);
			query.setLong(1, ID);
			ResultSet result = query.executeQuery();

			while(result.next()) {
				tmp = new SportEventProxy();
				tmp.setId(result.getLong("id"));
				tmp.setData(result.getDate("start").toLocalDate());
				tmp.setDescription(result.getString("description"));
				tmp.setBeginHour(result.getTime("begin_hour").toLocalTime());
				tmp.setEndHour(result.getTime("end_hour").toLocalTime());
				tmpList.add(tmp);
			}
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}
		return tmpList;
	}
}
