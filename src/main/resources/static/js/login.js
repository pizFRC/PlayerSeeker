function onSignIn(googleUser) {
 	var profile = googleUser.getBasicProfile();
	var google_id = profile.getId();
	$.ajax({
		type: "POST",
		url: "checkGoogleUser",
		contentType: "application/json",
		data: JSON.stringify(google_id),
		async: false,
		success: function(user) {
			if (user.userType === "sport_facility") {
				window.location.replace("/accountManagementSportFacility")
			}
			else {
				window.location.replace("/");
			}
		},
		error: function() {
			switchToGoogleRegistration(profile.getId(), profile.getGivenName(), profile.getFamilyName(), profile.getEmail());
		}
	});
}

