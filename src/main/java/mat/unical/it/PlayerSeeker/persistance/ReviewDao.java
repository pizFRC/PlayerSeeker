package mat.unical.it.PlayerSeeker.persistance;
import java.util.List;

import mat.unical.it.PlayerSeeker.model.Review;


public interface ReviewDao {

	public List<Review> doRetrieveAll();
	public List<Review> doRetrieveByKeyPlayer(Long id);
	public Review doRetrieveByKey(Long id);
	public List<Review> doRetrieveByIdSportsFacility(Long id);
	public boolean saveOrUpdate(Review review);
	public boolean delete(Review review);
	
}
