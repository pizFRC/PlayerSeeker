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
    public Address doRetrieveByInteger(int address) {
        PreparedStatement query;
        ResultSet result;

        Address tmp = null;

        try{

            query = connection.prepareStatement("SELECT * FROM address WHERE id=?");
            result = query.executeQuery();
            query.setInt(1,address);

            while(result.next()) {
                tmp = new Address();
                tmp.setCity(result.getString(1));
                tmp.setVia(result.getString(4));
                tmp.setZip(result.getInt(3));
                tmp.setProvince(result.getString(2));
                tmp.setPosition(result.getString("position"));
            }

            query.close();
        } catch(SQLException e) {
            e.printStackTrace();
            return null;
        }

        return tmp;
    }
}
