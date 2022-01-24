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
.icon {
	font-size: 1.5rem;
}

.info-element {
	box-shadow: 0px 0px 37px -10px rgba(0, 0, 0, 0.15);
	-webkit-box-shadow: 0px 0px 37px -10px rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 0px 0px 37px -10px rgba(0, 0, 0, 0.15);
	border-bottom-style: solid;
	border-bottom-width: medium;
}

</style>
</head>

<body>

	<!-- HEADER --->
	<jsp:include page="header.jsp" />
	
	<div id = "hour_modal" class="modal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Orari</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body p-4">
					<table id="hour_table" class="table">
						<thead>
							<tr>
								<th scope="col">Giorno</th>
								<th scope="col">Apertura</th>
								<th scope="col">Chiusura</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
							</tr>
							<tr>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>@fat</td>
							</tr>
							<tr>
								<td colspan="2">Larry the Bird</td>
								<td>@twitter</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	<div id = "playground_modal" class="modal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Campo da gioco</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body p-4">
					<p id="description" class="fs-6 mb-3">Lorem ipsum dolor sit amet, consectetur
						adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat. Duis aute irure dolor in reprehenderit in voluptate
						velit esse cillum dolore eu fugiat nulla pariatur.</p>
				</div>
			</div>
		</div>
	</div>
	
	<div class="h-100 w-100 d-flex align-items-center position-relative">
		<div class="h-100 w-100" id="map"></div>
		
		<div class="col-12 col-md-7 col-xl-5 position-absolute top-50 start-0 translate-middle-y h-100 p-0 p-md-5" style="z-index: 2;">
			<div style="overflow-y: auto; max-height:100%"class="h-100 shadow-lg p-5 mb-5 bg-body rounded">
				<p id="name" class="fs-2 mb-3">Nome Struttura</p>
				<hr class="mb-4" style="height:0.5px">
				
				<p id="address" class="fs-6 mb-4"> 
					<i class="icon bi bi-geo-alt-fill me-2" style="color: #e59558;"></i>
					<strong>Indirizzo: </strong>Indirizzo</p>
				<p id="phone" class="fs-6 mb-3">
					<i class="icon bi bi-telephone-fill me-2" style="color: #e5c45d;"></i>
					<strong>Telefono: </strong>Telefono</p>
				<p id="web_site" class="fs-6 mb-3"> <i class="icon bi bi-globe me-2" style="color: #bbe39d;">
					</i><strong>Sito web: </strong> 
					<a href="#" class="link-primary">Web site url</a></p>
				<p id="hours" class="fs-6 mb-5"> <i class="icon bi bi-clock-fill me-2" style="color: #8aceec;">
					</i><strong>Orari di apertura: </strong>
					<a type="button" onclick="$('#hour_modal').modal('show')"href="#" class="link-primary">Mostra tutti gli orari</a></p>
					
				<div class="p-3 mb-5 info-element" style="border-bottom-color: #e59558">
					<p id="name" class="fs-5 mb-1"><strong>Campi da gioco</strong></p>
					<p id="name" class="fs-6 mb-3">La struttura ha a disposizione 2 campi da gioco</p>
					<p id="name" class="fs-6 mb-2"><strong>Campo da gioco n.1: </strong>Calcetto
						<a type="button" onclick="$('#playground_modal').modal('show')" href="#" class="link-primary">Mostra dettagli</a>
					</p>
					<p id="name" class="fs-6 mb-2"><strong>Campo da gioco n.2: </strong>Pallavolo
						<a type="button" href="#" class="link-primary">Mostra dettagli</a>
					</p>
				</div>
				
				<div class="p-3 mb-5 info-element" style="border-bottom-color: #4960c5">
					<p id="name" class="fs-5 mb-1"><strong>Eventi</strong></p>
					<p id="name" class="fs-6 mb-3">La struttura ospiterà 2 eventi</p>
					<p id="name" class="fs-6 mb-2"><strong>Evento n.1: </strong>Calcetto
						<a href="/visualizzaEventi" class="link-primary">Mostra dettagli</a>
					</p>
					<p id="name" class="fs-6 mb-2"><strong>Evento n.2: </strong>Pallavolo
						<a href="#" class="link-primary">Mostra dettagli</a>
					</p>
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
		
	<!-- Custom -->
	<script type="text/javascript" src="../js/sportFacilityDetails.js"> </script>
		
	

</body>