var auth2;
function init() {
	if(sessionStorage.getItem("user")){
		return;
	}
  	gapi.load('auth2', function() {
  		auth2 = gapi.auth2.init({
            client_id: '345576690488-5jgneq5npfclnad4b92mvflcuhsundgs.apps.googleusercontent.com'
    	});
  	
	auth2.currentUser.listen(function(user){
			if(user.isSignedIn()){
				var google_id = user.getId()
				$.ajax({
					type: "POST",
					url: "checkGoogleUser",
					contentType: "application/json",
					data: JSON.stringify(google_id),
					async: false,
					success: function(user) {
						if(user.userType === "sport_facility"){
							window.location.replace("/accountManagementSportFacility");
							sessionStorage.setItem("user", true);
						}
						else{
							window.location.reload();
							sessionStorage.setItem("user", true);
						}
					},
					error: function(){
						if(window.location.pathname.split('/').pop() != "login"){
							auth2.signOut();
						}
						sessionStorage.setItem("user", false);
					}
				});
			}
		})
	});
}