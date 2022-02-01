package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.OpeningHours;
import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.SportsFacility;

public class SportsFacilityProxy extends SportsFacility {

	private static final long serialVersionUID = -5578418411592689722L;
	
	Connection connection;
	
	public SportsFacilityProxy(Connection connection) {
		this.connection = connection;
	}
	
	@Override
	public List<Playground> getPlaygrounds() {
		if(super.getPlaygrounds() != null)
			return super.getPlaygrounds();
		List<Playground> playgrounds = new ArrayList<>();
		String query = "SELECT * FROM playground WHERE sport_facility_id = ?";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, this.getId());
			ResultSet result = statement.executeQuery(); 
			while(result.next()) {
				Playground playground = new Playground();
				playground.setId(result.getLong("id"));
				playground.setDescription(result.getString("description"));
				playground.setSport(DatabaseJDBC.getInstance().getSportDao().doRetrieveById(result.getLong("sport_id")));
				playgrounds.add(playground);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		this.setPlaygrounds(playgrounds);
		return super.getPlaygrounds();
	}
	
	@Override
	public List<OpeningHours> getOpeningHours() {
		if(super.getOpeningHours() != null)
			return super.getOpeningHours();
		List<OpeningHours> openingHours = new ArrayList<>();
		String query = "SELECT * FROM facility_hours WHERE sport_facility_id = ?";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, this.getId());
			ResultSet result = statement.executeQuery(); 
			while(result.next()) {
				OpeningHours openingHour = new OpeningHours();
				openingHour.setId(result.getLong("id"));
				openingHour.setDay(result.getInt("day"));
				openingHour.setOpenTime(result.getTime("open_time").toLocalTime());
				openingHour.setCloseTime(result.getTime("close_time").toLocalTime());
				openingHours.add(openingHour);
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		this.setOpeningHours(openingHours);
		return super.getOpeningHours();
	}

}
