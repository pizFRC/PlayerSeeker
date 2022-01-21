<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
<jsp:include page="head.jsp" />
<!-- Mapbox CSS-->
<link rel="stylesheet"
	href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
	type="text/css">
<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css'
	rel='stylesheet' />
<title>Player Seeker - Gestione Struttura</title>
<style>
body {
	background-color: #eaf4f4;
}

.info-element {
	height: 150px;
	box-shadow: 0px 0px 37px -10px rgba(0, 0, 0, 0.15);
	-webkit-box-shadow: 0px 0px 37px -10px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 0px 0px 37px -10px rgba(0, 0, 0, 0.15);
	border-bottom-style: solid;
	border-bottom-width: medium;
}

.icon {
	font-size: 2rem;
}

.bg-success {
	background-color: #4960c5 !important;
}
</style>
</head>

<body style="padding-top: 80px;">
	<!-- HEADER --->
	<jsp:include page="header.jsp" />
	<div class="m-5 p-5">
		<div class="row">
			<div class="col-lg-8 p-0">
				<div class="h-100 p-5 pb-2 shadow p-3 mb-5 bg-body rounded">
					<p class="fs-2 mb-1">Dettagli Evento</p>
					<p class="fs-6 mb-3"> <i class="bi bi-pencil-fill me-2"></i> 
						Organizzatore: <a id="manager" href="#" class="link-primary">Nome Cognome</a>
					</p>
					<p id="description" class="fs-6 mb-3">Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.</p>
					<div class="row mb-4">
						<div class="col-md-3 p-4">
							<div class="text-center p-4 info-element"
								style="border-bottom-color: #e59558;">
								<i class="icon bi bi-geo-alt-fill" style="color: #e59558;"></i>
								<p id="sport_facility" class="fs-6 mt-3">Nome della struttura</p>
							</div>
						</div>
						<div class="col-md-3 p-4">
							<div class="text-center p-4 info-element"
								style="border-bottom-color: #e5c45d;">
								<i class="icon bi bi-pin-angle-fill" style="color: #e5c45d;"></i>
								<p id="sport" class="fs-6 mt-3">Sport</p>
							</div>
						</div>
						<div class="col-md-3 p-4">
							<div class="text-center p-4 info-element"
								style="border-bottom-color: #bbe39d;">
								<i class="icon bi bi-calendar-x-fill" style="color: #bbe39d;"></i>
								<p id="date" class="fs-6 mt-3">Data</p>
							</div>
						</div>
						<div class="col-md-3 p-4">
							<div class="text-center p-4 info-element"
								style="border-bottom-color: #8aceec;">
								<i class="icon bi bi-clock-fill" style="color: #8aceec;"></i>
								<p id="start" class="fs-6 mt-3">Ora inizio</p>
								<p id="finish" class="fs-6">Ora fine</p>
							</div>
						</div>
					</div>
					<p id="participants" class="fs-6 mb-3">Partecipanti: 4 su 10</p>
					<div class="progress mb-5" style="height: 10px;">
						<div id="progress_bar" class="progress-bar bg-success" role="progressbar"
							style="width: 25%" aria-valuenow="25" aria-valuemin="0"
							aria-valuemax="100"></div>
					</div>
					<div class="text-center"> 
						<button type="button" class="btn btn-outline-primary">Partecipa all'evento</button>
					</div>
				</div>
			</div>
			<div class="col-lg-4" id="map"></div>
		</div>
	</div>

	<!-- Bootstrap -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>

	<!-- JQuery -->
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script
		src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.js"></script>

	<!-- Mapbox -->
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'></script>
	<script
		src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>

	<!-- EmailJS -->
	<script type="text/javascript"
		src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

	<!-- Custom -->
	<script type="text/javascript" src="../js/visualizzaEventi.js"> </script>
</body>