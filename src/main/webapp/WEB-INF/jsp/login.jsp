<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
		<title> Player Seeker - Sign in </title>

		<!-- Bootstrap CSS -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	
		<!-- Custom CSS -->
		<link href="css/style.css" rel="stylesheet" type="text/css">
		
		<!--Bootstrap Icon -->
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
	
		<!-- Font -->
		<link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway:300,400" rel="stylesheet">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway:300,400" rel="stylesheet">
	</head>
	
<body >
<div class="text-center hero-image"style="height: 100%" id="div_login">
<!-- logo -->
	<div class=" container-fluid  logo">
		<img class="mb-4 " src="img/logo.png" alt="" width="250" height="100">
<!-- fine logo -->
	</div>
	
	<!-- form autenticazione -->
	<div class="container border form_autenticazione">
		<main class="form-signin ">
			<form>

				<h1 class="h3 mb-3 fw-normal space_top">Accedi</h1>

				<div class="form-floating space_bottom">
					<input type="email" class="form-control" id="floatingInput"
						placeholder="name@example.com"> <label for="floatingInput">Indirizzo
						email</label>
				</div>
				<div class="form-floating space_bottom ">
					<input type="password" class="form-control" id="floatingPassword"
						placeholder="Password"> <label for="floatingPassword">Password</label>
				</div>

				<div class="checkbox mb-3">
					<label> <input type="checkbox" value="remember-me">
						Ricordami
					</label>
				</div>
				<button class="w-100 btn btn-lg btn-primary space_bottom"
					type="submit">Accedi</button>
				<button class="w-100 btn btn-lg btn-primary space_bottom"
					type="submit">Registrati</button>
				<p class="mt-5 mb-3 text-muted">© 2021 Player Seeker</p>
			</form>
		</main>

	</div>
	
		<!-- fine form autenticazione -->



</div>
</body>
</html>