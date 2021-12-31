package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import mat.unical.it.PlayerSeeker.persistance.Database;
import mat.unical.it.PlayerSeeker.persistance.PlayerDao;
import mat.unical.it.PlayerSeeker.persistance.SportEventDao;
import mat.unical.it.PlayerSeeker.persistance.SportsFacilityDao;
import mat.unical.it.PlayerSeeker.persistance.UserDao;

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
			connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/player_seeker", "postgres", "admin");
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
	public SportEventDao getspoSportEventDao() {
		return new SportEventDaoJDBC(connection);
	}

	@Override
	public UserDao getUserDao() {
		return new UserDaoJDBC(connection);
	}

}
