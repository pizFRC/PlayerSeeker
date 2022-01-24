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
			//connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/player_seeker_copy", "postgres", "admin");
			connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/player_seeker_copy", "postgres", "admin");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public boolean checkConnection() {
		try {
			if(connection == null || connection.isClosed())
				return false;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return true;
	}

	public Connection getConnection() {
		return connection;
	}
	
	@Override
	public UserIdBroker getUserIdBroker() {
		return new UserIdBroker(connection);
	}
	
	@Override
	public AddressIdBroker getAddressIdBroker() {
		return new AddressIdBroker(connection);
	}

	@Override
	public PlaygroundIdBroker getPlaygroundIdBroker() {
		return new PlaygroundIdBroker(connection);
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
	
	@Override
	public SportDao getSportDao() {
		return new SportDaoJDBC(connection);
	}

	@Override
	public SportEventProxy getSportEventProxy() {
		return null;
	}

	@Override
	public PlaygroundDao getPlaygroundDao() {
		return new PlaygroundDaoJDBC(connection);
	}

	@Override
	public SportsFacilityProxy getSportsFacilityProxy() {
		return new SportsFacilityProxy(connection);
	}

	@Override
	public OpeningHoursDao getoOpeningHoursDao() {
		return new OpeningHoursDaoJDBC(connection);
	}

}
