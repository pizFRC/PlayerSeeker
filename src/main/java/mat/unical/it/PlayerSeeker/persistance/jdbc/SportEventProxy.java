package mat.unical.it.PlayerSeeker.persistance.jdbc;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.model.Sport;
import mat.unical.it.PlayerSeeker.model.SportEvent;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SportEventProxy extends SportEvent {

    Connection connection = DatabaseJDBC.getInstance().getConnection();

    public SportEventProxy() {}

    public Player getOrganizzatore() {
        Player player = new Player();

        try{
            PreparedStatement statement;
            String query = "SELECT * FROM players INNER JOIN event ON players.id=event.organizer_id WHERE event.id=?";

            statement = connection.prepareStatement(query);
            statement.setLong(1,super.getId());
            ResultSet result = statement.executeQuery();

            while(result.next()) {
                player.setId(result.getLong("id"));
                player.setName(result.getString("username"));
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

    public List<Player> getPlayers() {
        List<Player> players = new ArrayList<Player>();

        try{
            PreparedStatement statement;
            String query = "SELECT * FROM players INNER JOIN participate ON players.id=participate.player_id WHERE participate.event_id=?";

            statement = connection.prepareStatement(query);
            statement.setLong(1,super.getId());
            ResultSet result = statement.executeQuery();

            while(result.next()) {
                Player player = new Player();
                player.setId(result.getLong("id"));
                player.setName(result.getString("username"));
                player.setSurname(result.getString("surname"));
                player.setBirthday(result.getDate("birthday").toLocalDate());
                player.setAddress(DatabaseJDBC.getInstance().getAddressDao().doRetrieveByID(result.getLong("address_id")));
                players.add(player);
            }
            statement.close();
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }

        this.setPlayers(players);
        return super.getPlayers();
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
                tmpPlayground.setDescription(result.getString("desscription"));
                tmpPlayground.setSport(this.getSport());
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
}
