<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>

	<!-- Mapbox CSS-->
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />
	
	<!-- Slick CSS-->
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"/>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"/>

	<jsp:include page="head.jsp"/>
	<title>Player Seeker - Login</title>
	
</head>

<body class="d-flex align-items-center" id="login_body">
	<!-- HEADER --->
	<jsp:include page="header.jsp" />

	<div id="login_form_div" class="d-flex align-items-center justify-content-center p-0 p-sm-5 w-100">
		<form class="shadow-lg bg-body rounded p-5 pt-4" method="post"
			id="login_form" action="checkUser" style="min-width: 450px; max-width: 450px;">
			<div class="text-center">
				<img class="m-3 text-center" rel="icon" width="200" height="65"
					 src="img/logo.png" type="image/x-icon">
			</div>
			<c:if test="${errorMessage != null}">
				<div class="alert alert-danger d-flex align-items-center"
					role="alert">
					<i class="bi bi-exclamation-triangle-fill me-2" width="24"
						height="24" role="img" aria-label="Danger:"> <use
							xlink:href="#exclamation-triangle-fill" /></i>
					<div>${errorMessage}</div>
				</div>
			</c:if>
			<label for="username" class="sr-only"> Username </label> 
			<input type="text" class="form-control mt-3" id="username" name="username"
				placeholder="Username" required autofocus> 
			<label for="password" class="sr-only"> Password </label> 
			<input type="password" class="form-control mt-3" id="password" name="password"
				   placeholder="Password" required autofocus>

			<div class="text-center" id="to_hide">
				<div class="mt-3 mb-3">
					<button type="submit" class="btn btn-primary btn-block">Accedi</button>
				</div>
				<a href="#" id="btn_registrati" onclick="switchToRegistration()"
					class="link-primary">Non hai ancora un account? Registrati!</a>
				<h3 class="fs-6 fw-bold mt-5 mb-3" style="text-align: center;">Puoi
					anche accedere con</h3>
				<div class="g-signin2 row justify-content-center" data-onsuccess="onSignIn"></div>
			</div>
		</form>
	</div>

	<!-- CDN -->
	
	<!-- Bootstrap -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>
		
	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.js"></script>
	
	<!-- Mapbox -->
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'></script>
	<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
	
	<!-- EmailJS -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
		
	<!-- Slick -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>

	<!-- Custom -->
	<script type="text/javascript"  src="../js/login.js"> </script>
	<script type="text/javascript"  src="../js/registration.js"> </script>
	<script type="text/javascript"  src="../js/googleRegistration.js"> </script>
	<script type="text/javascript"  src="../js/validators.js"> </script>
	<script type="text/javascript"  src="../js/googleValidators.js"> </script>
</body>
</html>


