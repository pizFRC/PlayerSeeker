package mat.unical.it.PlayerSeeker.persistance;

public interface Database {
	
	public PlayerDao getPlayerDao();
	public SportsFacilityDao getSportsFacilityDao();
	public SportEventDao getSportsEventDao();
	public UserDao getUserDao();

}
