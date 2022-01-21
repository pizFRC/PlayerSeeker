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

.menu-item {
	display: inline-flex;
	align-items: center;
	background-color: transparent;
	border: none;
	font-size: small;
}

.menu-item.selected {
	font-weight: bold;
	color: #00a896;
}

.menu-icon {
	font-size: 2rem;
}

.section {
	display: none;
}

.section.active {
	display: block;
}
</style>
</head>

<body style="padding-top: 80px;">
	<!-- HEADER --->
	<jsp:include page="header.jsp" />

	<div class="row h-100 p-5">
		<div class="col-3 p-3" id="map"></div>
		<%double lat=16.248828;
			double longi=39.3301343;//da sostituire con nome struttura
			String organizzatore="GIOVANNI BERALDI";
			String orario="17.00 - 19.00";%>
		<input type="number" hidden value="<%=lat=16.248828%>" id="lat">
		<input type="number" hidden value="<%=lat=39.3301343%>" id="long">
		<div class="col-9 p-3">
			<!-- ACCOUNT SETTINGS -->
			<div class="p-5 shadow-sm p-3 mb-5 bg-body rounded section active">
				<p class="fs-2 d-block">Visualizzazione Evento</p>
				<div class="row">
					<div class="col">
						<div class="row">
							<div class="col">
								<i class="bi bi-cursor-fill" style="font-size: 3.5rem;"
									id="icon"></i>
							</div>
							
							<div class="col" id="indirizzo">
							
					</div>
					<div class="col">
						<a id=><i class="bi bi-person-fill" style="font-size: 3.5rem;"></i><%=organizzatore%></a>
					</div>
					<div class="col">
					<a id=><i class="bi bi-stopwatch-fill" style="font-size: 3.5rem;"></i><%=orario%></a></div>
					<%String telefono="+39 347 8742 173";%>
					<div class="col">
						<a id=><i class="bi bi-telephone-fill"
							style="font-size: 3.5rem;"></i><%=telefono%></a>
					</div>
				</div>
				<br>
				<br>
				<div class="row">
				<div class="col">
					<div class="progress">
						<div class="progress-bar bg-success" role="progressbar"
							style="width: 50%" aria-valuenow="25" aria-valuemin="0"
							aria-valuemax="100">Partecipanti</div>
					</div>
					</div>
				</div>
				<br>
				<div class="row">
					<button type="button" class="btn btn-primary">Iscriviti all'evento</button>
				</div>
				<div class="row">
					<jsp:include page="footer.jsp" />
				</div>
			</div>
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