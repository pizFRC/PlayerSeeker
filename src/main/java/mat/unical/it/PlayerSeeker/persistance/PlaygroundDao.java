package mat.unical.it.PlayerSeeker.persistance;

import java.util.List;

import mat.unical.it.PlayerSeeker.model.Playground;

public interface PlaygroundDao {
	
	public List<PlaygroundDao> doRetrieveAll();
	public Playground doRetrieveByKey(Long id);
	public boolean saveOrUpdate(Playground playground, Long sportFacilityId);
	public boolean delete(Playground playground);

}
