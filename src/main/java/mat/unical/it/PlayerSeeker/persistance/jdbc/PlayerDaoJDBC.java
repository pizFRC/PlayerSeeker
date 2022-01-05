package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.persistance.PlayerDao;

public class PlayerDaoJDBC implements PlayerDao{
	
	Connection connection;
	
	public PlayerDaoJDBC(Connection connection) {
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
				tmpPlayer.setNome(result.getString("nome"));
				tmpPlayer.setCognome(result.getString("cognome"));
				tmpPlayer.setEta(result.getInt("eta"));
				tmpPlayer.setEmail(result.getString("email"));
				tmpPlayer.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getInt(("address"))));

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
	public Player doRetrieveByKey(String username) {
		PreparedStatement query;
		Player tmpPlayer = null;
		try{
			query = connection.prepareStatement("SELECT * FROM players WHERE id=?;");
			ResultSet result = query.executeQuery();

			if(result.next()) {
				tmpPlayer = new Player();
				tmpPlayer.setNome(result.getString("nome"));
				tmpPlayer.setCognome(result.getString("cognome"));
				tmpPlayer.setEta(result.getInt("eta"));
				tmpPlayer.setEmail(result.getString("email"));
				tmpPlayer.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getInt(("address"))));
			}
			query.close();
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}

		return tmpPlayer;
	}

	@Override
	public boolean saveOrUpdate(Player player) {
		PreparedStatement query = null;

		try{
			Player tmp = doRetrieveByKey(player.getUsername());
			if(tmp == null) {
				String statement = "insert into players(username,name,surname,birthday,sex,address) values(?,?,?,?,?,?);";
				query = connection.prepareStatement(statement);
				query.setString(1,player.getUsername());
				query.setString(2,player.getNome());
				query.setString(3,player.getCognome());
				query.setInt(4,player.getEta());
				query.setString(5,player.getSesso());
				query.setInt(6,player.getAddress().getID());
				query.executeUpdate();
			} else {
				query = connection.prepareStatement("UPDATE users SET username=?,name=?,surname=?,birthday=?,sex=?,address=? WHERE username=?;");
				query.setString(1,player.getUsername());
				query.setString(2,player.getNome());
				query.setString(3,player.getCognome());
				query.setInt(4,player.getEta());
				query.setString(5,player.getSesso());
				query.setInt(6,player.getAddress().getID());
				query.setString(7,player.getUsername());
				query.executeUpdate();
			}

			query.close();
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
			query = connection.prepareStatement("DELETE players WHERE username=?;");
			query.setString(1,player.getUsername());
			query.executeQuery();
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

}
