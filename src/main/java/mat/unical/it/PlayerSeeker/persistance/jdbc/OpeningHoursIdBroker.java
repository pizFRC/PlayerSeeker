package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class OpeningHoursIdBroker {
	Connection connection;

	public OpeningHoursIdBroker(Connection connection) {
		this.connection = connection;
	}
	
	public Long getId() {
		String query = "SELECT nextval('facility_hours_id_seq') AS id";
		try {
			Statement statement = connection.createStatement();
			ResultSet rs = statement.executeQuery(query);
			rs.next();
			return rs.getLong("id");
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
