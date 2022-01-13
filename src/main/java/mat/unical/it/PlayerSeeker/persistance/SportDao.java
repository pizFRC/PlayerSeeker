package mat.unical.it.PlayerSeeker.persistance;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Sport;

public interface SportDao {

	public List<Sport> doRetrieveAll();
	public Sport doRetrieveByKey(String type);
	public boolean saveOrUpdate(Sport sport);
	public boolean delete(Sport sport);
	
}
