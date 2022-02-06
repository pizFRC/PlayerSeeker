package mat.unical.it.PlayerSeeker.persistance;

import mat.unical.it.PlayerSeeker.model.OpeningHours;

import java.util.List;

public interface OpeningHoursDao {

    public List<OpeningHours> doRetrieveAll();
    public OpeningHours doRetrieveByKey(Long id);
    public boolean saveOrUpdate(OpeningHours hour, Long sportFacilityId);
    public boolean delete(OpeningHours hour);
}
