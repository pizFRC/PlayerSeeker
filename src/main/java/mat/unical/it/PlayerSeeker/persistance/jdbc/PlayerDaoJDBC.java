package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.persistance.PlayerDao;

public class PlayerDaoJDBC implements PlayerDao{
	
	Connection connection;
	
	public PlayerDaoJDBC(Connection connection) {
		this.connection = connection;
	}

	@Override
	public List<Player> doRetrieveAll() {
		List<Player> playerList = new ArrayList<Player>();
		PreparedStatement query;

		Player tmpPlayer = null;
		ResultSet result = null;

		try{
			query = connection.prepareStatement("SELECT * FROM players;");
			result = query.executeQuery();

			while(result.next()) {
				tmpPlayer = new Player();
				tmpPlayer.setName(result.getString("nome"));
				tmpPlayer.setSurname(result.getString("cognome"));
				tmpPlayer.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getLong(("address_id"))));

				playerList.add(tmpPlayer);
			}
			query.close();
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}

		return playerList;
	}

	@Override
	public Player doRetrieveByKey(Long id) {
		Player player;
		String query = "SELECT * FROM player WHERE id = ?";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, id);
			ResultSet result = statement.executeQuery(); 
			if(result.next()) {
				player = new Player();
				player.setId(result.getLong("id"));
				player.setName(result.getString("name"));
				player.setSurname(result.getString("surname"));
				player.setBirthday(result.getDate("birthday").toLocalDate());
				player.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getLong("address_id")));
				return player;
			}
			else 
				return null;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean saveOrUpdate(Player player) {
		try {
			String query;
			PreparedStatement statement;
			if(doRetrieveByKey(player.getId()) == null) {
				//INSERT
				query = "INSERT INTO player values(?,?,?,?,?)";
				statement = connection.prepareStatement(query);
				statement.setLong(1, player.getId());
				statement.setString(2, player.getName());
				statement.setString(3, player.getSurname());
				statement.setDate(4, Date.valueOf(player.getBirthday()));
				statement.setLong(5, player.getAddress().getID());
				statement.execute();
				statement.close();
				this.saveInterested(player);
			}
			else {
				//UPDATE
				query = "UPDATE player SET name = ?, surname = ?, birthday = ?, address_id = ? WHERE id = ?";
				statement = connection.prepareStatement(query);
				statement.setString(1, player.getName());
				statement.setString(2, player.getSurname());
				statement.setDate(3, Date.valueOf(player.getBirthday()));
				statement.setLong(4, player.getAddress().getID());
				statement.setLong(5, player.getId());
				statement.executeUpdate();
				statement.close();
				this.updateInterested(player);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean delete(Player player) {
		PreparedStatement query = null;

		try{
			query = connection.prepareStatement("DELETE players WHERE id=?;");
			query.setLong(1,player.getId());
			query.executeQuery();
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}
	
	private boolean saveInterested(Player player) {
		try{
			for(Sport sport: player.getSports()) {
				String query = "INSERT INTO interested (player_id, sport_id) VALUES(?,?)";
				PreparedStatement statement = connection.prepareStatement(query);
				statement.setLong(1, player.getId());
				statement.setLong(2, sport.getId());
				statement.execute();
				statement.close();
			}
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	private boolean updateInterested(Player player) {
		try{
			for(Sport sport: player.getSports()) {
				String query = "UPDATE interested SET sport_id = ? WHERE player_id = ?";
				PreparedStatement statement = connection.prepareStatement(query);	
				statement.setLong(1, sport.getId());
				statement.setLong(2, player.getId());
				statement.execute();
				statement.close();
			}
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
