package mat.unical.it.PlayerSeeker.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

public class CloudinaryManager {

	private static CloudinaryManager instance = null;
	private Cloudinary cloudinary = null;
	
	public static CloudinaryManager getInstance() {
		if (instance == null) 
			instance = new CloudinaryManager();
		return instance;
	}
	
	private CloudinaryManager() {
		cloudinary = new Cloudinary(ObjectUtils.asMap(
		"cloud_name", "player-seeker",
		"api_key", "332612951931372",
		"api_secret", "TMX90UHgZV26cDpe850LtlhQTII",
		"secure", false));
	}
	
	public Cloudinary getCloudinary() {
		return cloudinary;
	}
	
}
