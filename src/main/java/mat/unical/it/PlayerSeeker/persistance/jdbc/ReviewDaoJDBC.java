package mat.unical.it.PlayerSeeker.persistance.jdbc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Review;
import mat.unical.it.PlayerSeeker.persistance.ReviewDao;

public class ReviewDaoJDBC implements ReviewDao{
	
	Connection connection;
	
	public ReviewDaoJDBC(Connection connection) {
		this.connection = connection;
	}
	
	@Override
	public List<Review> doRetrieveAll() {
		List<Review> lista = new ArrayList<Review>();
		String query = "SELECT * FROM review";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			ResultSet result = statement.executeQuery();
			while(result.next()) {
				Review review = new Review();
				
				review.setId(result.getLong("id"));
				review.setAuthor(DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(result.getLong("player_id")));
				review.setSportsFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(result.getLong("sports_facility_id")));
				review.setText(result.getString("text"));
				review.setStars(result.getInt("stars"));
				review.setData(result.getDate("data").toLocalDate());
				
				lista.add(review);
			}
			statement.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return lista;
	}

	@Override
	public List<Review> doRetrieveByKeyPlayer(Long id) {
		List<Review> lista = new ArrayList<Review>();
		String query = "SELECT * FROM review WHERE player_id= ?";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, id);
			ResultSet result = statement.executeQuery();
			while(result.next()) {
				Review review = new Review();
				
				review.setId(result.getLong("id"));
				review.setAuthor(DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(result.getLong("player_id")));
				review.setSportsFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(result.getLong("sports_facility_id")));
				review.setText(result.getString("text"));
				review.setStars(result.getInt("stars"));
				review.setData(result.getDate("data").toLocalDate());
				
				lista.add(review);
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}
		return lista;
		
	}

	@Override
	public Review doRetrieveByKey(Long id) {
		Review review = new Review();

		try {
			PreparedStatement query = connection.prepareStatement("SELECT * FROM review WHERE id=?;");
			query.setLong(1,id);
			ResultSet result = query.executeQuery();
			

			if(result.next()) {					
					review.setId(result.getLong("id"));
					review.setAuthor(DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(result.getLong("player_id")));
					review.setSportsFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(result.getLong("sports_facility_id")));
					review.setText(result.getString("text"));
					review.setStars(result.getInt("stars"));
					review.setData(result.getDate("data").toLocalDate());
					
				}else
					return null;
			
			query.close();
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}

		return review;
	}
    
	
	@Override
	public List<Review> doRetrieveByIdSportsFacility(Long id) {
		List<Review> lista = new ArrayList<Review>();
		String query = "SELECT * FROM review WHERE sports_facility_id= ?";
		try {
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setLong(1, id);
			ResultSet result = statement.executeQuery();
			while(result.next()) {
				Review review = new Review();
				
				review.setId(result.getLong("id"));
				review.setAuthor(DatabaseJDBC.getInstance().getPlayerDao().doRetrieveByKey(result.getLong("player_id")));
				review.setSportsFacility(DatabaseJDBC.getInstance().getSportsFacilityDao().doRetrieveByKey(result.getLong("sports_facility_id")));
				review.setText(result.getString("text"));
				review.setStars(result.getInt("stars"));
				review.setData(result.getDate("data").toLocalDate());
				
				lista.add(review);
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
			return null;
		}
		return lista;
	}
	@Override
	public boolean saveOrUpdate(Review review) {
		try {
			String query;
			PreparedStatement statement;
			if(doRetrieveByKey(review.getId()) == null) {
				//INSERT
				query = "INSERT INTO review values(?,?,?,?,?,?)";
				statement = connection.prepareStatement(query);
				statement.setLong(1, DatabaseJDBC.getInstance().getReviewIdBroker().getId());
				statement.setLong(3, review.getSportsFacility().getId());
				statement.setLong(2, review.getAuthor().getId());
				statement.setString(4, review.getText());
				statement.setInt(5, review.getStars());
				statement.setDate(6, Date.valueOf(review.getData()));
				statement.execute();
				statement.close();
				
			}
			else {
				//UPDATE
				query = "UPDATE review SET id = ?, player_id = ?, sports_facility_id = ?, text = ? , stars =? , data=? WHERE id = ?";
				statement = connection.prepareStatement(query);
				statement = connection.prepareStatement(query);
				statement.setLong(1, review.getId());
				statement.setLong(3, review.getSportsFacility().getId());
				statement.setLong(2, review.getAuthor().getId());
				statement.setString(4, review.getText());
				statement.setInt(5, review.getStars());
				statement.setDate(6, Date.valueOf(review.getData()));
				statement.setLong(7, review.getId());
				statement.execute();
				
				statement.executeUpdate();
				statement.close();
			
			}

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public boolean delete(Review review) {
		// TODO Auto-generated method stub
		return false;
	}


}
