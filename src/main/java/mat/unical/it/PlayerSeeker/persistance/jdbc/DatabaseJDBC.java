package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import mat.unical.it.PlayerSeeker.persistance.*;

public class DatabaseJDBC implements Database{
	
	private static DatabaseJDBC instance = null;
	Connection connection;
	
	public static DatabaseJDBC getInstance() {
		if (instance == null) 
			instance = new DatabaseJDBC();
		return instance;
	}

	private DatabaseJDBC() {
		try {
			connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/player_seeker", "postgres", "1234");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public PlayerDao getPlayerDao() {
		return new PlayerDaoJDBC(connection);
	}

	@Override
	public SportsFacilityDao getSportsFacilityDao() {
		return new SportsFacilityDaoJDBC(connection);
	}

	@Override
	public SportEventDao getSportsEventDao() {
		return new SportEventDaoJDBC(connection);
	}

	@Override
	public UserDao getUserDao() {
		return new UserDaoJDBC(connection);
	}

	@Override
	public AddressDao getAddressDao() {
		return new AddressDaoJDBC(connection);
	}

}
