package mat.unical.it.PlayerSeeker.persistance.jdbc;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportEvent;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SportEventProxy extends SportEvent {

    Connection connection = DatabaseJDBC.getInstance().getConnection();

    public SportEventProxy() {}

    public List<Player> getPlayers() {
        List<Player> players = new ArrayList<Player>();

        try{
            PreparedStatement statement;
            String query = "SELECT * FROM players INNER JOIN participate ON players.id=participate.player_id WHERE event_id=?";

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
}
