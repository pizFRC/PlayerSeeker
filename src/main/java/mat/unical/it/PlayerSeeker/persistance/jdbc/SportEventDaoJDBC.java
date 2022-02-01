package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.User;
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
					tmp.setPlayers(this.getParticipate(ID));
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
				query = "INSERT INTO event values(?,?,?,?,?,?,?,?,?);";
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
				statement.setInt(9, sportEvent.getPlayersNumber());
				statement.execute();
				this.saveParticipate(sportEvent);
				statement.close();
			} else {
				query = "UPDATE event SET start=?, sport_id=?, playground_id=?, description=?, organizer_id=?, begin_hour=?, end_hour=?, players_number=? WHERE id=?;";
				statement = connection.prepareStatement(query);
				statement.setDate(1, Date.valueOf(sportEvent.getStart()));
				statement.setLong(2,sportEvent.getSport().getId());
				statement.setLong(3,sportEvent.getPlayground().getId());
				statement.setString(4,sportEvent.getDescription());
				statement.setLong(5,sportEvent.getOrganizzatore().getId());
				statement.setTime(6,Time.valueOf(sportEvent.getBeginHour()));
				statement.setTime(7,Time.valueOf(sportEvent.getEndHour()));
				statement.setInt(8, sportEvent.getPlayersNumber());
				statement.setLong(9,sportEvent.getId());
				this.deleteParticipate(sportEvent);
				this.saveParticipate(sportEvent);
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
	public boolean deleteById(Long id) {
		String query = "DELETE FROM event WHERE id = ?";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, id);
			statement.executeUpdate();
			statement.close();
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
				System.out.println(p.getId());
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
			query = connection.prepareStatement("DELETE FROM participate WHERE event_id=?;");
			query.setLong(1,sportEvent.getId());
			query.executeUpdate();
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
						tmp.setPlayers(this.getParticipate(ID));
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
		String sqlQuery="SELECT e.* FROM event e INNER JOIN playground p ON e.playground_id = p.id WHERE p.sport_facility_id = ? AND e.start >= current_date;";
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
				tmp.setPlayers(this.getParticipate(tmp.getId()));
				tmpList.add(tmp);
			}
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}
		return tmpList;
	}

	@Override
	public List<Player> getParticipate(Long id) {
		List<Player> players = new ArrayList<Player>();
        try{
            PreparedStatement statement;
            String query = "SELECT * FROM player INNER JOIN participate ON player.id=participate.player_id WHERE participate.event_id=?";
            statement = connection.prepareStatement(query);
            statement.setLong(1, id);
            ResultSet result = statement.executeQuery();

            while(result.next()) {
                Player player = new Player();
                player.setId(result.getLong("id"));
                player.setName(result.getString("name"));
                player.setSurname(result.getString("surname"));
                player.setBirthday(result.getDate("birthday").toLocalDate());
                player.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getLong("address_id")));
                players.add(player);
            }
            statement.close();
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }
        return players;
	}

	@Override
	public List<SportEvent> doRetrieveByOrganizer(Long ID) {
		String query = "SELECT e.id FROM event e WHERE e.organizer_id = ?";
		List<SportEvent> events = new ArrayList<>();
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, ID);
			ResultSet result = statement.executeQuery(); 
			while(result.next()) {
				SportEvent event = this.doRetrieveByKey(result.getLong("id"));
				events.add(event);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return events;
	}

	@Override
	public List<SportEvent> doRetrieveByParticipant(Long ID) {
		String query = "SELECT p.event_id FROM participate p WHERE p.player_id = ? ";
		List<SportEvent> events = new ArrayList<>();
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, ID);
			ResultSet result = statement.executeQuery(); 
			while(result.next()) {
				SportEvent event = this.doRetrieveByKey(result.getLong("event_id"));
				if(event.getOrganizzatore().getId() != ID) {
					events.add(event);
				}
					
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return events;
	}

	@Override
	public List<SportEvent> doRetrieveBestEventBySportFacilityKey(Long ID) {
		String query;
		if(ID != null)
			query = "SELECT e.* FROM event e INNER JOIN playground p ON e.playground_id = p.id WHERE p.sport_facility_id = ? AND e.start >= current_date ORDER BY e.start, e.begin_hour LIMIT 6";
		else
			query = "SELECT e.* FROM event e WHERE e.start >= current_date ORDER BY e.start, e.begin_hour LIMIT 6";
		
		List<SportEvent> events = new ArrayList<SportEvent>();
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			if(ID != null)
				statement.setLong(1, ID);
			
			ResultSet result = statement.executeQuery();
			while(result.next()) {
				SportEvent event = new SportEventProxy();
				event.setId(result.getLong("id"));
				event.setData(result.getDate("start").toLocalDate());
				event.setDescription(result.getString("description"));
				event.setBeginHour(result.getTime("begin_hour").toLocalTime());
				event.setEndHour(result.getTime("end_hour").toLocalTime());
				event.setPlayers(this.getParticipate(event.getId()));
				events.add(event);
			}
			statement.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}
		return events;
	}

}
