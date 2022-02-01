package mat.unical.it.PlayerSeeker.persistance;

import java.util.List;

import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.SportEvent;

public interface SportEventDao {

	public List<SportEvent> doRetrieveAll();
	public SportEvent doRetrieveByKey(Long id);
	public boolean saveOrUpdate(SportEvent sportEvent);
	public boolean deleteById(Long id);
	public boolean updateParticipate(SportEvent sportEvent);
	public boolean saveParticipate(SportEvent sportEvent);
	public boolean deleteParticipate(SportEvent sportEvent);
	public List<Player> getParticipate(Long id);
	public List<SportEvent> doRetrieveAllByPlaygroundsKey(Long ID);
	public List<SportEvent> doRetrieveAllBySportFacilityKey(Long ID);
	public List<SportEvent> doRetrieveByOrganizer(Long ID);
	public List<SportEvent> doRetrieveByParticipant(Long ID);
	public List<SportEvent> doRetrieveBestEventBySportFacilityKey(Long ID);
}
