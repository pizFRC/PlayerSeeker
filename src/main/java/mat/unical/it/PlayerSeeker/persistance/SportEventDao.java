package mat.unical.it.PlayerSeeker.persistance;

import java.util.List;
import mat.unical.it.PlayerSeeker.model.SportEvent;

public interface SportEventDao {

	public List<SportEvent> doRetrieveAll();
	public SportEvent doRetrieveByKey(Long id);
	public boolean saveOrUpdate(SportEvent sportEvent);
	public boolean delete(SportEvent sportEvent);
	public boolean updateParticipate(SportEvent sportEvent);
	public boolean saveParticipate(SportEvent sportEvent);
	public boolean deleteParticipate(SportEvent sportEvent);
}
