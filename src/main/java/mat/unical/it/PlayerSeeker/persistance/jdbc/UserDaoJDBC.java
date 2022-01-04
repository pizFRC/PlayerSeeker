package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.Database;
import mat.unical.it.PlayerSeeker.persistance.UserDao;

public class UserDaoJDBC implements UserDao {
	
	Connection connection;
	
	public UserDaoJDBC(Connection connection) {
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
	public List<User> doRetrieveAll() throws SQLException {
		PreparedStatement query;
		List<User> userList = new ArrayList<User>();
		User tmpUser = null;
		ResultSet rs = null;

		try {
			query = connection.prepareStatement("SELECT * FROM users;");
			rs = query.executeQuery();

			while(rs.next()) {
				tmpUser = new User();

				tmpUser.setUsername(rs.getString("username"));
				tmpUser.setPassword(rs.getString("password"));

				userList.add(tmpUser);
			}
			query.close();
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}

		return userList;
	}

	@Override
	public User doRetrieveByKey(String username)  {
		PreparedStatement query;
		try {
			if(checkConnection()) {
				query = connection.prepareStatement("SELECT * FROM users WHERE username=?;");
				query.setString(1, username);
				ResultSet result = query.executeQuery(); 
				if(result.next()) {
					//qui mi serve l'utente che
					if(result.getBoolean(3)) 
						return DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(username);
					else
						return DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(username);
				}
				else {
					query.close();
					return null;
				}
			}
			else {
				return null;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean saveOrUpdate(User user) {
		PreparedStatement query;

		try {
			User tmp = doRetrieveByKey(user.getUsername());
			if(tmp == null) {
				String statement = "insert into users(username,password,is_player) values(?,?,?);";
				query = connection.prepareStatement(statement);
				query.setString(1,user.getUsername());
				query.setString(2, user.getPassword());

				if(user instanceof Player)
					query.setBoolean(3,true);
				else
					query.setBoolean(3,false);

				query.executeUpdate();
			} else {
				query = connection.prepareStatement("UPDATE users SET username=?,password=?,is_player=? WHERE username=?;");
				query.setString(1, user.getUsername());
				query.setString(2, user.getPassword());
				query.setString(1, user.getUsername());

				if(user instanceof Player)
					query.setBoolean(3,true);
				else
					query.setBoolean(3,false);

				query.executeUpdate();
			}

			if(user instanceof Player) {
				Player player = (Player) user;
				DatabaseJDBC.getInstance().getPlayerDao().saveOrUpdate(player);
			} else if(user instanceof SportsFacility) {
				SportsFacility sportsFacility = (SportsFacility) user;
				DatabaseJDBC.getInstance().getSportsFacilityDao().saveOrUpdate(sportsFacility);
			}

			query.close();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

	@Override
	public boolean delete(User user) {
		PreparedStatement query;

		try{
			query = connection.prepareStatement("DELETE users WHERE username=?;");
			query.setString(1, user.getUsername());
			if(user instanceof Player) {
				Player player = (Player) user;
				DatabaseJDBC.getInstance().getPlayerDao().delete(player);
			} else if(user instanceof SportsFacility) {
				SportsFacility sportsFacility = (SportsFacility) user;
				DatabaseJDBC.getInstance().getSportsFacilityDao().delete(sportsFacility);
			}

			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

}
