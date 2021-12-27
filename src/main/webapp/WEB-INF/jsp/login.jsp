<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">

<title>Player Seeker</title>

<!-- Bootstrap CSS -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous">

<!-- Custom CSS -->
<link href="css/style.css" rel="stylesheet" type="text/css">

<!--Bootstrap Icon -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<!-- Font -->
<link
	href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway:300,400"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link
	href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway:300,400"
	rel="stylesheet">

<style>
body {
	background-image: url('img/bg.jpg');
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-size: cover;
}
</style>
</head>

<body>
	<!-----------HEADER --------->
	<header
		class="d-flex fixed-top navbar-light bg-light flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
		<div class="container d-flex justify-content-between">
			<a href="/"
				class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
				<img rel="icon" width="150" height="50" src="img/logo.png"
				type="image/x-icon" />
			</a>

			<ul
				class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
				<li><a href="#" class="nav-link px-2 link-dark ">Home</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Eventi</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Strutture</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Contattaci</a></li>
			</ul>
		</div>
	</header>
	<!-----------END HEADER --------->
	<div
		class="position-absolute top-50 start-50 translate-middle p-3 shadow-lg p-5 bg-body rounded">
		<form method="post" action="...">
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
							aria-describedby="inputGroupPrepend2" required>
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
			<div class="row justify-content-md-center">
				<div class="col-sm-auto">
					<button type="submit" class="btn btn-primary m-4">Accedi</button>
				</div>
			</div>
			
			<div class="row justify-content-md-center">
				<div class="col-sm-auto">
					<a href="#" class="link-primary">Non hai ancora un account? Registrati!</a>
				</div>
			</div>


		</form>
	</div>

</body>
</html>
