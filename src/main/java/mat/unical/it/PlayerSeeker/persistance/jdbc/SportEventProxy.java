package mat.unical.it.PlayerSeeker.persistance.jdbc;

import mat.unical.it.PlayerSeeker.model.Player;

import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.model.SportsFacility;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class SportEventProxy extends SportEvent {

	private static final long serialVersionUID = 2724986691524647771L;
	Connection connection = DatabaseJDBC.getInstance().getConnection();

    public SportEventProxy() {}

    public Player getOrganizzatore() {
        Player player = new Player();

        try{
            PreparedStatement statement;
            String query = "SELECT * FROM player INNER JOIN event ON player.id=event.organizer_id WHERE event.id=?";

            statement = connection.prepareStatement(query);
            statement.setLong(1,super.getId());
            ResultSet result = statement.executeQuery();

            while(result.next()) {
                player.setId(result.getLong("id"));
                player.setName(result.getString("name"));
                player.setSurname(result.getString("surname"));
                player.setBirthday(result.getDate("birthday").toLocalDate());
                player.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getLong("address_id")));
            }
            statement.close();
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }

        this.setOrganizzatore(player);
        return super.getOrganizzatore();
    }

    public Playground getPlayground() {

        Playground tmpPlayground = new Playground();

        try {
            PreparedStatement statement;
            String query = "SELECT * FROM playground INNER JOIN event ON playground.id=event.playground_id WHERE event.id=?;";
            statement = connection.prepareStatement(query);
            statement.setLong(1,super.getId());
            ResultSet result = statement.executeQuery();

            while(result.next()) {
                tmpPlayground.setId(result.getLong("id"));
                tmpPlayground.setDescription(result.getString("description"));
                tmpPlayground.setSport(this.getSport());
                tmpPlayground.setSportFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(result.getLong("sport_facility_id")));
            }
            statement.close();
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }

        this.setPlayground(tmpPlayground);
        return super.getPlayground();
    }

    public Sport getSport() {
        Sport tmpSport = new Sport();

        try {
            PreparedStatement statement;
            String query = "SELECT * FROM sport INNER JOIN event ON sport.id=event.sport_id WHERE event.id=?;";
            statement = connection.prepareStatement(query);
            statement.setLong(1,super.getId());
            ResultSet result = statement.executeQuery();

            while(result.next()) {
                tmpSport.setId(result.getLong("id"));
                tmpSport.setType(result.getString("type"));
                tmpSport.setrequiredPlayers(result.getInt("required_players"));
            }
            statement.close();
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }

        this.setSport(tmpSport);
        return super.getSport();
    }
    public SportsFacility getSportFacility() {
    	 try {
    		 if(this.getPlayground()!=null)
    			 return this.getPlayground().getSportFacility();
             PreparedStatement statement;
             String query = "SELECT sport_facility_id FROM playground INNER JOIN event ON playground.id=event.playground_id WHERE event.id=?;";
             statement = connection.prepareStatement(query);
             statement.setLong(1,super.getId());
             ResultSet result = statement.executeQuery();

             if(result.next()) {
                 this.setSportFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(result.getLong(0)));
                 
             }
             statement.close();
         } catch(SQLException e) {
             e.printStackTrace();
             return null;
         }
    	
    	
    	
		return null;
    	
    }
}
