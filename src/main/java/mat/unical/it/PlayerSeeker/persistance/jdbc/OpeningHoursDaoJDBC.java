package mat.unical.it.PlayerSeeker.persistance.jdbc;

import mat.unical.it.PlayerSeeker.model.OpeningHours;

import mat.unical.it.PlayerSeeker.persistance.OpeningHoursDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class OpeningHoursDaoJDBC implements OpeningHoursDao {

    Connection connection;

    public OpeningHoursDaoJDBC(Connection connection) {this.connection = connection;}

    private boolean checkConnection() {
        try {
            if(connection == null || connection.isClosed())
                return false;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return true;
    }

    @Override
    public List<OpeningHours> doRetrieveAll() {
        List<OpeningHours> openingHours = new ArrayList<OpeningHours>();
        PreparedStatement query;
        ResultSet result;

        if(checkConnection()) {
            try {
                query = connection.prepareStatement("SELECT * FROM facility_hours");
                result = query.executeQuery();

                OpeningHours tmp;

                while(result.next()) {
                    tmp = new OpeningHours();
                    tmp.setId(result.getLong("id"));
                    tmp.setDay(result.getInt("day"));
                    tmp.setOpenTime(result.getTime("open_time").toLocalTime());
                    tmp.setCloseTime(result.getTime("close_time").toLocalTime());

                    openingHours.add(tmp);
                }
                query.close();
            } catch(SQLException e) {
                e.printStackTrace();
                return null;
            }
        }
        return openingHours;
    }

    @Override
    public OpeningHours doRetrieveByKey(Long id) {
        PreparedStatement query;
        OpeningHours tmp = new OpeningHours();

        if(checkConnection()) {
            try {
                query = connection.prepareStatement("SELECT * FROM facility_hours WHERE id=?");
                ResultSet result = query.executeQuery();
                query.setLong(1,id);
                while(result.next()) {
                    tmp.setId(result.getLong("sport_facility_id"));
                    tmp.setDay(result.getInt("day"));
                    tmp.setOpenTime(result.getTime("open_time").toLocalTime());
                    tmp.setCloseTime(result.getTime("close_time").toLocalTime());
                }
                query.close();
            } catch(SQLException e) {
                e.printStackTrace();
                return null;
            }
        }
        return tmp;
    }

    @Override
    public boolean saveOrUpdate(OpeningHours hour, Long sportFacilityId) {
    	String query;
    	PreparedStatement statement;
    	try {
    		query = "INSERT INTO facility_hours VALUES (?,?,?,?,?)";
    		statement = connection.prepareStatement(query);
    		statement.setLong(1, hour.getId());
    		statement.setLong(2, sportFacilityId);
    		statement.setInt(3,hour.getDay());
    		statement.setTime(4,Time.valueOf(hour.getOpenTime()));
    		statement.setTime(5,Time.valueOf(hour.getCloseTime()));
    		statement.execute();
    		statement.close();
    	} catch(SQLException e) {
    		e.printStackTrace();
    		return false;
    	}
    	return true;
    }

    @Override
    public boolean delete(OpeningHours hour) {
    	String query = "DELETE FROM facility_hours WHERE id=?";
        PreparedStatement statement;
        try {
        	statement = connection.prepareStatement(query);
        	statement.setLong(1,hour.getId());
        	statement.executeQuery();
        	statement.close();
        } catch(SQLException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
