package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCrypt;
import mat.unical.it.PlayerSeeker.model.User;
import mat.unical.it.PlayerSeeker.persistance.UserDao;

public class UserDaoJDBC implements UserDao {

	Connection connection;

	public UserDaoJDBC(Connection connection) {
		this.connection = connection;
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

				tmpUser.setId(rs.getLong("id"));
				tmpUser.setUsername(rs.getString("username"));
				tmpUser.setPassword(rs.getString("password"));
				tmpUser.setUserType(rs.getString("user_types"));
				tmpUser.setEmail(rs.getString("email"));

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
		String query = "SELECT u.*, t.type FROM users u INNER JOIN user_types t ON u.user_type_id = t.id WHERE u.username = ?;";
		User user;
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, username);
			ResultSet result = statement.executeQuery(); 
			if(result.next()) {
				user = new User();
				user.setId(result.getLong("id"));
				user.setUsername(username);
				user.setPassword(result.getString("password"));
				user.setUserType(result.getString("type"));
				user.setEmail(result.getString("email"));
				return user;
			}
			else 
				return null;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public User doRetrieveByMail(String mail) {
		String query = "SELECT u.*, t.type FROM users u INNER JOIN user_types t ON u.user_type_id = t.id WHERE u.email = ?;";
		User user;
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, mail);
			ResultSet result = statement.executeQuery();
			if(result.next()) {
				user = new User();
				user.setId(result.getLong("id"));
				user.setUsername(result.getString("username"));
				user.setPassword(result.getString("password"));
				user.setUserType(result.getString("type"));
				user.setEmail(mail);
				return user;
			}
			else
				return null;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}	
	}

	@Override
	public boolean saveOrUpdate(User user) {
		try {
			String query = "SELECT id FROM user_types WHERE type = ?";
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, user.getUserType());
			ResultSet result = statement.executeQuery(); 
			if(!result.next())
				return false;
			Long user_type_id = result.getLong("id");
			if(doRetrieveByKey(user.getUsername()) == null) {
				//INSERT
				statement.close();
				query = "INSERT INTO users values(?,?,?,?,?)";
				statement = connection.prepareStatement(query);
				statement.setLong(1, user.getId());
				statement.setString(2, user.getUsername());
				statement.setString(3, BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12)));
				statement.setLong(4, user_type_id);
				statement.setString(5, user.getEmail());
				statement.execute();
				statement.close();
			}
			else {
				//UPDATE
				statement.close();
				query = "UPDATE users SET username = ?, password = ?, user_type_id = ? WHERE id = ?";
				statement = connection.prepareStatement(query);
				statement.setString(1, user.getUsername());
				statement.setString(2, BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12)));
				statement.setLong(3, user_type_id);	
				statement.setLong(4, user.getId());
				statement.setString(5, user.getEmail());
				statement.executeUpdate();
				statement.close();
			}
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
			query.executeQuery();

			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return false;
		}

		return true;
	}

}
