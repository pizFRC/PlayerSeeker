<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="google-signin-client_id" content="345576690488-5jgneq5npfclnad4b92mvflcuhsundgs.apps.googleusercontent.com">

<title>Player Seeker</title>

<link rel="icon" href="img/favicon.png">

<style>
body { 
	background-image: url('../img/bg.jpg');
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
}
</style>
<!-- Jquery -->
<script
			  src="https://code.jquery.com/jquery-3.6.0.min.js"
			  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
			  crossorigin="anonymous"></script>
			  
<!-- Google login -->
<script src="https://apis.google.com/js/platform.js" async defer></script>

<!-- Bootstrap CSS -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous">

<!-- Custom CSS -->
<link href="css/style.css" rel="stylesheet" type="text/css">

<!--Bootstrap Icon -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<!-- Font -->
<link
	href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway:300,400"
	rel="stylesheet">

</head>

<body>
	<!-----------HEADER --------->
	<header
		class="d-flex fixed-top navbar-light bg-light flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
		<div class="container d-flex justify-content-between row">
			<a href="/"
				class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
				<img rel="icon" width="150" height="50" src="img/logo.png"
				type="image/x-icon" />
			</a>

			<ul
				class="nav col-sm-12 col-md-7 mb-2 justify-content-center mb-md-0"
				id="menu_items">
				<li class="raleway_font"><a href="#"
					class="nav-link px-2 link-secondary ">Home</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Eventi</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Strutture</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Contattaci</a></li>
			</ul>


		</div>
	</header>
	<!-----------END HEADER --------->
	
	<div id = "login"
		class="position-absolute top-50 start-50 translate-middle p-3 shadow-lg p-5 bg-body rounded">
		<c:if test="${errorMessage != null}">
			<div class="alert alert-danger d-flex align-items-center" role="alert">
			<i class="bi bi-exclamation-triangle-fill me-2" width="24" height="24" role="img" aria-label="Danger:"> <use xlink:href="#exclamation-triangle-fill" /></i>
				<div>${errorMessage}</div>
			</div>
		</c:if>
		<form method="post" id="form_login" action="checkUser">
			<div>
				<div class="row justify-content-md-center">
					<div class="col-sm-auto">
						<img class="m-3" rel="icon" width="200" height="65"
							src="img/logo.png" type="image/x-icon" />
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="col-sm-12">
						<label for="validationDefaultUsername" class="form-label">Username</label>
						<div class="input-group">
							<span class="input-group-text" id="inputGroupPrepend2">@</span> <input
								type="text" class="form-control" id="validationDefaultUsername"
								aria-describedby="inputGroupPrepend2"
								name="validationDefaultUsername" required>
						</div>
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="col-sm-12">
						<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
						<input type="password" class="form-control" id="inputPassword"
							aria-describedby="inputGroupPrepend2" required>
					</div>
				</div>
				<div id="btn_accedi" class="row justify-content-md-center">
					<div class="col-sm-auto">
						<button type="submit" class="btn btn-primary m-4">Accedi</button>
					</div>
					<div class="row justify-content-md-center">
						<div class="col-sm-auto">
							<a id="btn_registrati" onclick="hideBtn()" class="link-primary">Non
								hai ancora un account? Registrati!</a>
						</div>
					</div>
				</div>
			</div>
		</form>
		<div class="row align-items-center m-4">
			<hr class="col-sm-4">
			<p class="col-sm-4 open_sans_font" align="center"> oppure </p>
			<hr class="col-sm-4">
		</div>
		
		<div class="g-signin2 row justify-content-md-center" data-onsuccess="onSignIn"></div>
	</div>
	
	<div id = "registration"
		class="position-absolute top-50 start-50 translate-middle p-3 shadow-lg p-5 bg-body rounded">
		
		<form method="post" id="form_registrazione" action="registrationUser">
			<div>
				<div class="row justify-content-md-center">
					<div class="col-sm-auto">
						<img class="m-3" rel="icon" width="200" height="65"
							src="img/logo.png" type="image/x-icon" />
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="col-sm-12">
						<label for="validationDefaultUsername" class="form-label">Username</label>
						<div class="input-group">
							<span class="input-group-text" id="inputGroupPrepend2">@</span> <input
								type="text" class="form-control" id="validationDefaultUsername"
								aria-describedby="inputGroupPrepend2"
								name="validationDefaultUsername" required>
						</div>
					</div>
				</div>
				<div class="row justify-content-md-center">
					<div class="col-sm-12">
						<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
						<input type="password" class="form-control" id="inputPassword"
							aria-describedby="inputGroupPrepend2" required>
					</div>
				</div>
				<div id="btn_accedi" class="row justify-content-md-center">
					<div class="col-sm-auto">
						<button type="submit" class="btn btn-primary m-4">Accedi</button>
					</div>
					<div class="row justify-content-md-center">
						<div class="col-sm-auto">
							<a id="btn_registrati" onclick="hideBtn()" class="link-primary">Non
								hai ancora un account? Registrati!</a>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
	
	<script type="text/javascript"  src="../js/registrazione.js"> </script>
	<script type="text/javascript"  src="../js/login.js"> </script>
</body>
</html>


