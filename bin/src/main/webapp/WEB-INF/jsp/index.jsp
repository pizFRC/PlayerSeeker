<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
	<jsp:include page="head.jsp"/>
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />
	<title>Player Seeker</title>
	
	<style>
	.event-card{
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #e59558;
	}
	.sportFacility-card {
		border-bottom-style: solid;
		border-bottom-width: 3px;
		border-bottom-color: #4960c5;
	}
	</style>
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
		</div>
	</div>
	<!-- END JUMBOTRON -->

	<!-- Best Events Carousel-->
	<div class="row mt-5 mb-4">
		<p style="color: #e59558" class="fs-4 fw-bold text-center col-12 d-flex justify-content-center"> Migliori eventi </p>
		<p class="pe-5 ps-5 fs-6 col-12 text-center d-flex justify-content-center"> Ecco i migliori eventi, selezionati con cura soltanto per te!</p>
	</div>
	<!-- The slideshow/carousel -->
	<div id="carousel_eventi" class="carousel slide row" data-bs-ride="carousel" data-bs-interval="false">
		<div class="carousel-inner ">
			<div id = "first_event_container" class="carousel-item active">
				
			</div>
			<div id = "second_event_container" class="carousel-item">
	
			</div>
		</div>

		<!-- Left and right controls/icons -->
		<div class="col-md-6 col-sm-1">
			<div>
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
	<!-- END Best Events Carousel  -->

	<!-- Best Sport Facility Carousel-->
	<div class="row mt-5 mb-4">
		<p style="color: #4960c5" class="fs-4 fw-bold text-center col-12 d-flex justify-content-center"> Migliori strutture </p>
		<p class="pe-5 ps-5 fs-6 col-12 text-center d-flex justify-content-center"> Ed ecco anche le migliori srutture dove organizzare i tuoi eventi!</p>
	</div>
	<!-- The slideshow/carousel -->
	<div id="carousel_strutture" class="carousel slide row" data-bs-ride="carousel" data-bs-interval="false">
		<div class="carousel-inner ">
			<div id = "first_facility_container" class="carousel-item active"></div>
				
			<div id = "second_facility_container" class="carousel-item"> </div>
		</div>

		<!-- Left and right controls/icons -->
		<div class="col-md-6 col-sm-1">
			<div>
				<button id="facility_carousel_prev" class="carousel-control-prev btn_colorato" type="button"
					style="color: black; font-size: 40px;"
					data-bs-target="#carousel_strutture" data-bs-slide="prev">
					<!--  <span class="carousel-control-prev-icon btn_colorato "></span> -->
					<span><i class="fa fa-angle-left" aria-hidden="true"></i></span> <span
						class="sr-only">Previous</span>
				</button>
				<button id="facility_carousel_next" class="carousel-control-next" type="button"
					style="color: black; font-size: 40px;"
					data-bs-target="#carousel_strutture" data-bs-slide="next">
					<span><i class="fa fa-angle-right" aria-hidden="true"></i></span> <span
						class="sr-only">Next</span>
				</button>
			</div>
		</div>
	</div>
	
	<!-- END Best Sport Facility Carousel  -->

	<!-- FOOTER -->
	<jsp:include page="footer.jsp" />

	<!-- CDN -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	
	<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
	
	<script type="text/javascript" src="../js/index.js" crossorigin="anonymous"></script>
	
	<c:if test="${user != null}">
	<script type="text/javascript">
		changeCurrentPosition(${profile.address.longitude}, ${profile.address.latitude});
	</script>
	</c:if>
</body>
</html>

