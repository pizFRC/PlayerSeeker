package mat.unical.it.PlayerSeeker.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.google.gson.Gson;

import mat.unical.it.PlayerSeeker.model.Playground;
import mat.unical.it.PlayerSeeker.persistance.jdbc.DatabaseJDBC;

@RestController
public class PlaygroundController {
	
	@PostMapping("/getPlayground")
	public Playground getPlayground(HttpServletResponse res, @RequestBody String id) {
		Gson gson = new Gson();
		id = gson.fromJson(id, String.class);
		Playground playground = DatabaseJDBC.getInstance().getPlaygroundDao().doRetrieveByKey(Long.parseLong(id));
		if(playground!=null)
			res.setStatus(HttpServletResponse.SC_OK);
		else
			res.setStatus(HttpServletResponse.SC_NOT_FOUND);
		return playground;
	}
	
	@PostMapping("/deleteImage")
	public int deleteImage(HttpServletResponse res, @RequestBody String path) {
		Gson gson = new Gson();
		path = gson.fromJson(path, String.class);
		Cloudinary cloudinary = CloudinaryManager.getInstance().getCloudinary();
		try {
			cloudinary.api().deleteResourcesByPrefix(path, null);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
		}
		
		res.setStatus(HttpServletResponse.SC_OK);
		return HttpServletResponse.SC_OK;
	}
	
	@PostMapping("/deleteImageFolder")
	public int deleteImageFolder(HttpServletResponse res, @RequestBody String path) {
		Gson gson = new Gson();
		path = gson.fromJson(path, String.class);
		Cloudinary cloudinary = CloudinaryManager.getInstance().getCloudinary();
		try {
			cloudinary.api().deleteResourcesByPrefix(path, null);
			cloudinary.api().deleteFolder(path, null);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return HttpServletResponse.SC_SERVICE_UNAVAILABLE;
		}
		
		res.setStatus(HttpServletResponse.SC_OK);
		return HttpServletResponse.SC_OK;
	}
	
	@PostMapping("/getPlaygroundImage")
	public ApiResponse getPlaygroundImage(HttpServletResponse res, @RequestBody String path) {
		Gson gson = new Gson();
		path = gson.fromJson(path, String.class);
		Cloudinary cloudinary = CloudinaryManager.getInstance().getCloudinary();
		ApiResponse result = null;
		try {
			result = cloudinary.search().expression("folder:"+path).execute();
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);
			return null;
		}
		
		res.setStatus(HttpServletResponse.SC_OK);
		return result;
	}

}
