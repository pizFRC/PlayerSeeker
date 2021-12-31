package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.persistance.PlayerDao;

public class PlayerDaoJDBC implements PlayerDao{
	
	Connection connection;
	
	public PlayerDaoJDBC(Connection connection) {
		this.connection = connection;
	}

	@Override
	public List<Player> doRetrieveAll() {
		List<Player> playerList = new ArrayList<Player>();

		return playerList;
	}

	@Override
	public Player doRetrieveByKey(String username) {
		return null;
	}

	@Override
	public boolean saveOrUpdate(Player player) {
		return false;
	}

	@Override
	public boolean delete(Player player) {
		return false;
	}

}
