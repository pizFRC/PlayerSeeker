package mat.unical.it.PlayerSeeker.persistance;

import java.util.List;
import mat.unical.it.PlayerSeeker.model.SportEvent;

public interface SportEventDao {

	public List<SportEvent> doRetrieveAll();
	public SportEvent doRetrieveByKey(String username);
	public boolean saveOrUpdate(SportEvent sportEvent);
	public boolean delete(SportEvent sportEvent);
	
}
