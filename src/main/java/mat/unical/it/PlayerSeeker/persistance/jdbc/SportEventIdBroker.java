package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class SportEventIdBroker {
	
	Connection connection;

	public SportEventIdBroker(Connection connection) {
		this.connection = connection;
	}
	
	public Long getId() {
		String query = "SELECT nextval('event_id_seq') AS id";
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
