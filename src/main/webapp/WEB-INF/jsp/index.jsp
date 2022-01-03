<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
	<jsp:include page="head.jsp"/>
	<title>Player Seeker</title>
</head>

<body>
	<!-- HEADER --->
	<jsp:include page="header.jsp" />

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
					<label for="search" class="form-label">Visualizza i
						migliori eventi e le migliori strutture nella tua città</label>
					<div class="d-flex justify-content-between">
						<input class="form-control mr-sm-2" type="search"
							placeholder="Inserisci la tua città" aria-label="Search">
						<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Cerca</button>
					</div>
				</div>
			</form>
		</div>
	</div>
	<!-- END JUMBOTRON -->

	<!-- Events Carousel-->
	<div class="container">
		<p class="col-md-8 fs-4">Migliori eventi</p>
	</div>
	<div id="carousel_eventi" class="carousel slide row"
		data-bs-ride="carousel">

		<!-- The slideshow/carousel -->
		<div class="carousel-inner col-md-6 col-sm-10">
			<div class="carousel-item active">
				<div class="container">
					<div class="row">
						<div class="col-12 col-md-4">

							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>

						<div class="col-12 col-md-4">

							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>


						<div class="col-12 col-md-4">

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
			<div class="carousel-item">
				<div class="container">
					<div class="row">
						<div class="col-12 col-md-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>

						<div class="col-12 col-md-4">
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
			<div class="carousel-item">
				<div class="container">
					<div class="row">
						<div class="col-12 col-md-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>

						<div class="col-12 col-md-4">
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

		<div class="col-md-6 col-sm-1">
			<!-- Left and right controls/icons -->

			<div class="">
				<button class="carousel-control-prev btn_colorato" type="button"
					style="color: black; font-size: 40px;"
					data-bs-target="#carousel_eventi" data-bs-slide="prev">
					<!--  <span class="carousel-control-prev-icon btn_colorato "></span> -->
					<span><i class="fa fa-angle-left" aria-hidden="true"></i></span> <span
						class="sr-only">Previous</span>
				</button>
				<button class="carousel-control-next" type="button"
					style="color: black; font-size: 40px;"
					data-bs-target="#carousel_eventi" data-bs-slide="next">
					<span><i class="fa fa-angle-right" aria-hidden="true"></i></span> <span
						class="sr-only">Next</span>
				</button>
			</div>
		</div>
	</div>
	<!-- END Events Carousel  -->

	<!-- Structures Carousel-->
	<div class="container mt-5">
		<p class="col-md-8 fs-4">Migliori strutture</p>
	</div>

	<div id="carousel_strutture" class="carousel slide row"
		data-bs-ride="carousel">

		<!-- The slideshow/carousel -->
		<div class="carousel-inner col-md-6 col-sm-10">
			<div class="carousel-item active">
				<div class="container">
					<div class="row">
						<div class="col-12 col-md-4">

							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>

						<div class="col-12 col-md-4">

							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>


						<div class="col-12 col-md-4">

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
			<div class="carousel-item">
				<div class="container">
					<div class="row">
						<div class="col-12 col-md-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>

						<div class="col-12 col-md-4">
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
			<div class="carousel-item">
				<div class="container">
					<div class="row">
						<div class="col-12 col-md-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div class="col-12 col-md-4">
							<div class="card">
								<div class="card-body">
									<h5 class="card-title">Special title treatment</h5>
									<p class="card-text">With supporting text below as a
										natural lead-in to additional content.</p>
									<a href="#" class="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>

						<div class="col-12 col-md-4">
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

		<div class="col-md-6 col-sm-1">
			<!-- Left and right controls/icons -->

			<div class="">
				<button class="carousel-control-prev btn_colorato" type="button"
					style="color: black; font-size: 40px;"
					data-bs-target="#carousel_strutture" data-bs-slide="prev">
					<!--  <span class="carousel-control-prev-icon btn_colorato "></span> -->
					<span><i class="fa fa-angle-left" aria-hidden="true"></i></span> <span
						class="sr-only">Previous</span>
				</button>
				<button class="carousel-control-next" type="button"
					style="color: black; font-size: 40px;"
					data-bs-target="#carousel_strutture" data-bs-slide="next">
					<span><i class="fa fa-angle-right" aria-hidden="true"></i></span> <span
						class="sr-only">Next</span>
				</button>
			</div>
		</div>
	</div>
	<!-- END CAROUSEL -->

	<!-- FOOTER -->
	<jsp:include page="footer.jsp" />

	<!-- CDN -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

</body>
</html>

