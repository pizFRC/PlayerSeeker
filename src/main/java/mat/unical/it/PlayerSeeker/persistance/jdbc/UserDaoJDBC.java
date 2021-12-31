package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Player;
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
			query = connection.prepareStatement("SELECT * FROM users WHERE username=?;");
			query.setString(1, username);
			ResultSet result = query.executeQuery(); 
			if(result.next()) {
				if(result.getBoolean(3)) 
					return DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(username);
				else
					return DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(username);
			}
			else {
				query.close();
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
				query = connection.prepareStatement("INSERT INTO users");
			} else {
				query = connection.prepareStatement("UPDATE users WHERE username=?");
			}

			if(user instanceof Player) {
				Player player = (Player) user;
				DatabaseJDBC.getInstance().getPlayerDao().saveOrUpdate(player);
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
		return false;
	}

}
