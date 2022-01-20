package mat.unical.it.PlayerSeeker.persistance.jdbc;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.persistance.AddressDao;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AddressDaoJDBC implements AddressDao {

	Connection connection;

	public AddressDaoJDBC(Connection connection) {
		this.connection = connection;
	}

	@Override
	public Address doRetrieveByID(Long id) {
		PreparedStatement query;
		ResultSet result;

		Address tmp = null;

		try{

			query = connection.prepareStatement("SELECT * FROM address WHERE id=?");
			query.setLong(1,id);
			result = query.executeQuery();

			while(result.next()) {
				tmp = new Address();
				tmp.setLatitude(result.getFloat(1));
				tmp.setLongitude(result.getFloat(2));
				tmp.setId(result.getLong(3));
			}

			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}

		return tmp;
	}

	@Override
	public Address doRetrieveByPosition(float latitude, float longitude) {
		Address address;
		try {
			String query = "SELECT * FROM address WHERE latitude = ? AND longitude = ?";
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setFloat(1, latitude);
			statement.setFloat(2, longitude);
			ResultSet result = statement.executeQuery();
			if(result.next()) {
				address = new Address();
				address.setId(result.getLong("id"));
				address.setLatitude(result.getFloat("latitude"));
				address.setLongitude(result.getFloat("longitude"));
				return address;
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
	public boolean saveOrUpdate(Address address) {
		try {
			String query;
			PreparedStatement statement;
			Address existing = doRetrieveByPosition(address.getLatitude(), address.getLongitude());
			if(existing == null) {
				//INSERT
				query = "INSERT INTO address VALUES (?, ?, ?)";
				statement = connection.prepareStatement(query);
				statement.setLong(1, address.getID());
				statement.setFloat(2, address.getLatitude());
				statement.setFloat(3, address.getLongitude());
				statement.execute();
				statement.close();
			}
			else {
				//UPDATE
				query = "UPDATE address SET latitude = ?, longitude = ? WHERE id = ?";
				statement = connection.prepareStatement(query);
				statement.setFloat(1, address.getLatitude());
				statement.setFloat(2, address.getLongitude());
				statement.setLong(3, existing.getID());
				statement.executeUpdate();
				statement.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
