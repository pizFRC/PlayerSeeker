package mat.unical.it.PlayerSeeker.persistance.jdbc;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportsFacility;
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
    public Address doRetrieveByID(int id) {
        PreparedStatement query;
        ResultSet result;

        Address tmp = null;

        try{

            query = connection.prepareStatement("SELECT * FROM address WHERE id=?");
            result = query.executeQuery();
            query.setInt(1,id);

            while(result.next()) {
                tmp = new Address();
                tmp.setLatitude(result.getFloat(1));
                tmp.setLongitude(result.getFloat(2));
                tmp.setId(result.getInt(3));
            }

            query.close();
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }

        return tmp;
    }
}
