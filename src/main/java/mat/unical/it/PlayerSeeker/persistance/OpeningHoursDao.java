package mat.unical.it.PlayerSeeker.persistance;

import mat.unical.it.PlayerSeeker.model.OpeningHours;
import mat.unical.it.PlayerSeeker.model.Player;

import java.util.List;

public interface OpeningHoursDao {

    public List<OpeningHours> doRetrieveAll();
    public OpeningHours doRetrieveByKey(Long id);
    public boolean saveOrUpdate(OpeningHours hour);
    public boolean delete(OpeningHours hour);
}
