package mat.unical.it.PlayerSeeker.persistance;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

import mat.unical.it.PlayerSeeker.model.Address;
import mat.unical.it.PlayerSeeker.model.SportsFacility;

public interface SportsFacilityDao {
	
	public List<SportsFacility> doRetrieveAll();
	public SportsFacility doRetrieveByKey(Long id);
	public boolean saveOrUpdate(SportsFacility sportsFacility);
	public boolean delete(SportsFacility sportsFacility);
	public List<SportsFacility> doRetrieveByBBox(Address southWest, Address northEast);
	public Map<Long, Long> doRetrieveAllByDateAndSport(Long ID,LocalDate start,LocalTime begin,LocalTime end);

}
