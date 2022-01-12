package mat.unical.it.PlayerSeeker.persistance;

import java.util.List;
import mat.unical.it.PlayerSeeker.model.Player;

public interface PlayerDao {
	
	public List<Player> doRetrieveAll();
	public Player doRetrieveByKey(Long userId);
	public boolean saveOrUpdate(Player player);
	public boolean delete(Player player);
	
}
