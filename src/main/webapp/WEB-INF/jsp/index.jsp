<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
		<title> Player Seeker </title>

		<!-- Bootstrap CSS -->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	
		<!-- Custom CSS -->
		<link href="css/style.css" rel="stylesheet" type="text/css">
		
		<!--Bootstrap Icon -->
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
	
		<!-- Font -->
		<link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway:300,400" rel="stylesheet">
	</head>

<body>
	<!-----------HEADER --------->
	<header
		class="d-flex fixed-top navbar-light bg-light flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
		<a href="/"
			class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
			<img rel="icon" width="150" height="50" src="img/logo.png"
			type="image/x-icon" />
		</a>

		<ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
			<li class="raleway_font"><a href="#"
				class="nav-link px-2 link-secondary ">Home</a></li>
			<li><a href="#" class="nav-link px-2 link-dark">Eventi</a></li>
			<li><a href="#" class="nav-link px-2 link-dark">Strutture</a></li>
			<li><a href="#" class="nav-link px-2 link-dark">Contattaci</a></li>

		</ul>

		<div class="col-md-3 text-end">
			<button type="button" class="btn btn-outline-primary me-2" onclick="">Login</button>
		</div>
	</header>
	<!-----------END HEADER --------->

	<!-- JUMBOTRON -->
	<div id="jumbotron" class="p-5 mb-4 rounded-3 bg-light">
		<div class="container">
			<h1 class="display-5 fw-bold">Player Seeker</h1>
			<p class="col-md-8 fs-4">
				Scopri gli eventi sportivi e le migliori strutture vicino a te. </br>Dimenticati
				dello stress e pensa solo a divertirti!
			</p>

			<!-- Search -->
			<form class="form-inline">
				<div class="mb-3 mt-3">
					<label for="search" class="form-label">Visualizza i migliori eventi e le migliori strutture nella tua città</label>
					<div class="d-flex flex-row"> 
						<input class="form-control mr-sm-2" type="search" placeholder="Inserisci la tua città" aria-label="Search">
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Cerca</button>
						</div>
				</div>
			</form>
		</div>
	</div>
	<!-- END JUMBOTRON -->

	<!-- Events Carousel-->
	<div class="container">
		<p class="col-md-8 fs-4">Migliori eventi </p>
	</div>
	<div id="carouselExampleControls" class="carousel slide"
		data-bs-ride="carousel">
		<div class="carousel-inner">
			<div class="carousel-item active">
				<div class="container pl-30">
					<div class="row">
						<div class="col-sm-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="carousel-control-prev" type="button"
			data-bs-target="#carouselExampleControls" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" style="background-color: black" aria-hidden="true"></span> <span
				class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button"
			data-bs-target="#carouselExampleControls" data-bs-slide="next">
			<span class="carousel-control-next-icon"
				style="background-color: black" aria-hidden="true"></span> <span
				class="visually-hidden">Next</span>
		</button>
	</div>
	<!-- END Events Carousel  -->
	
	<!-- Structures Carousel-->
	<div class="container mt-4">
		<p class="col-md-8 fs-4">Migliori strutture </p>
	</div>
	<div id="carouselExampleControls" class="carousel slide"
		data-bs-ride="carousel">
		<div class="carousel-inner">
			<div class="carousel-item active">
				<div class="container pl-30">
					<div class="row">
						<div class="col-sm-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div class="col-sm-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<button class="carousel-control-prev" type="button"
			data-bs-target="#carouselExampleControls" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" style="background-color: black" aria-hidden="true"></span> <span
				class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button"
			data-bs-target="#carouselExampleControls" data-bs-slide="next">
			<span class="carousel-control-next-icon"
				style="background-color: black" aria-hidden="true"></span> <span
				class="visually-hidden">Next</span>
		</button>
	</div>
	
	<!-- END Structures Carousel  -->

	<!-- Bootstrap JavaScript -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</body>
</html>

