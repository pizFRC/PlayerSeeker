package mat.unical.it.PlayerSeeker.persistance;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import mat.unical.it.PlayerSeeker.model.Player;
import mat.unical.it.PlayerSeeker.model.User;

public interface PlayerDao {
	
	public List<Player> doRetrieveAll();
	public Player doRetrieveByKey(Long userId);
	public boolean saveOrUpdate(Player player);
	public boolean delete(Player player);
	public boolean checkImpegni(User user,LocalDate start,LocalTime begin,LocalTime end);
}
