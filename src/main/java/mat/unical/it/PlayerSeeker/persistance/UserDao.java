package mat.unical.it.PlayerSeeker.persistance;

import java.sql.SQLException;
import java.util.List;
import mat.unical.it.PlayerSeeker.model.User;

public interface UserDao {
	
	public List<User> doRetrieveAll() throws SQLException;
	public User doRetrieveByKey(String username);
	public boolean saveOrUpdate(User player);
	public boolean delete(User player);

}
