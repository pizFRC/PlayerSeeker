package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.User;
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
	public List<User> doRetrieveAll() {
		return null;
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
	public boolean saveOrUpdate(User player) {
		return false;
	}

	@Override
	public boolean delete(User player) {
		return false;
	}

}
