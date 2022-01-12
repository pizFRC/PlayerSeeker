package mat.unical.it.PlayerSeeker.persistance;

import java.util.List;
import mat.unical.it.PlayerSeeker.model.SportsFacility;

public interface SportsFacilityDao {
	
	public List<SportsFacility> doRetrieveAll();
	public SportsFacility doRetrieveByKey(Long id);
	public boolean saveOrUpdate(SportsFacility sportsFacility);
	public boolean delete(SportsFacility sportsFacility);

}
