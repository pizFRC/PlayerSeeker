<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head>
<jsp:include page="head.jsp" />
<link rel="stylesheet"
	href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
	type="text/css">
<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css'
	rel='stylesheet' />
<title>Player Seeker - Eventi</title>
</head>

<body>

	<!-- HEADER --->
	<jsp:include page="header.jsp" />
	<div class="m-5">
		<p class="fs-1">Visualizza gli eventi</p>
		<p class="fs-6 mb-4">Qui puoi scoprire gli eventi vicino alla tua posizione o della tua città preferita</p>
		<div style="border-bottom-color: #e59558" class="info-element p-4">
			<div class="row">
				<div class="col-md-6 mb-3">
					<label for="browser" class="form-label">Inserisci una città</label>
					<div id="address"></div>
				</div>
				<div class="col-md-4  mb-3">
					<label for="browser" class="form-label">Scegli uno sport</label> 
					<select class="form-select">
						<option selected>Tutti gli sport</option>
						<option>Calcio</option>
						<option value="fa-apple">fa-apple</option>
						<option>4</option>
					</select>
				</div>
				<div class="col-md-2 mb-3 d-flex align-items-end">
					<button class="w-100 bottom-0 btn btn-outline-primary" type="submit">
						<i class="fa fa-search" aria-hidden="true"></i> Cerca
					</button>
				</div>
			</div>
		</div>
	</div>


	<div class="m-5">
		<div class="row">
			<div class="col-lg-12  col-xxl-12 col-xl-12 col-sm-12">
				<div class="d-flex justify-content-between align-items-center mb-3">
					<div class="tasti_da_nascondere">
						<button id="btn_list" class="new-event-button btn btn-primary me-2" type="submit" value="Search">
							<i class="bi bi-list"></i> Lista
						</button>
						<button id="btn_grid" class="btn new-event-button btn btn-primary" type="submit" value="Search"> 
							<i class="bi bi-grid-fill"></i> Griglia
						</button>
					</div>
					<div id="rangeDiv" class="w-50">
						<label for="range" class="form-label">Distanza dalla tua posizione: 15 km</label>
						<input type="range" class="custom-range-events form-range" min="5" max="25" step="5" id="range">
					</div>
				</div>
				
				<div class="row" id="card_container">
				<c:if test="${user == null}">
						<div class="alert alert-warning d-flex align-items-center" role="alert">
							<i class="bi bi-info-circle-fill me-2"></i>
							<div>Effettua l'accesso o cerca una città per visualizzare gli eventi!</div>
						</div>
				</c:if>
				<c:if test="${user != null}">
					<div
						class="item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 mx-auto m-1 pb-1">
						<div class="card mb-3">
							<div class="card-body">
								<h5 class="card-title">Special title treatment</h5>
								<p class="card-text mb-3">With supporting text below as a natural
									lead-in to additional content.</p>
								<a href="#" class="btn btn-outline-primary">Go somewhere</a>
							</div>
						</div>

					</div>
					<div
						class="item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 mx-auto m-1 pb-1">
						<div class="card mb-3">
							<div class="card-body">
								<h5 class="card-title">Special title treatment</h5>
								<p class="card-text mb-3">With supporting text below as a natural
									lead-in to additional content.</p>
								<a href="#" class="btn btn-outline-primary">Go somewhere</a>
							</div>
						</div>

					</div>
					<div
						class="item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12  mx-auto m-1 pb-1">
						<div class="card mb-3">
							<div class="card-body">
								<h5 class="card-title">Special title treatment</h5>
								<p class="card-text mb-3">With supporting text below as a natural
									lead-in to additional content.</p>
								<a href="#" class="btn btn-outline-primary">Go somewhere</a>
							</div>
						</div>
					</div>
				</c:if>
				</div>
			</div>
		</div>
	</div>
	
	<div class="position-fixed bottom-0 end-0 m-4" style="z-index: 2;">
	<c:if test="${user == null}">
		<span id="popover-event" class="d-flex d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Effettua l'accesso per visualizzare gli eventi vicini a te">
  			<button disabled id="my_position" class="w-100 near-position-button rounded-pill btn btn-primary shadow-lg p-3 ps-4 pe-4 mb-3 rounded d-flex align-items-center">
				<i style="font-size: 1.5rem"class="bi bi-geo-alt-fill me-3"></i>Vicini a te
			</button>
		</span>
		<span id="popover-new-event" class="d-flex d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Effettua l'accesso per creare nuovi eventi">
  			<button disabled id="new_event" class="new-event-button rounded-pill btn btn-primary shadow-lg p-3 ps-4 pe-4 rounded d-flex align-items-center">
				<i style="font-size: 1.5rem"class="bi bi-plus-lg me-3"></i>Nuovo evento
			</button>
		</span>
	</c:if>
	<c:if test="${user != null}">
		<button id="my_position" class="w-100 near-position-button rounded-pill btn btn-primary shadow-lg p-3 ps-4 pe-4 mb-3 rounded d-flex align-items-center">
			<i style="font-size: 1.5rem"class="bi bi-geo-alt-fill me-3"></i>Vicini a te
		</button>
		<a id="new_event" href="/nuovoEvento" class="new-event-button rounded-pill btn btn-primary shadow-lg p-3 ps-4 pe-4 rounded d-flex align-items-center">
			<i style="font-size: 1.5rem"class="bi bi-plus-lg me-3"></i>Nuovo evento
		</a>
	</c:if>
	</div>

	<!-- FOOTER -->
	<jsp:include page="footer.jsp" />

	<!-- CDN -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script type="text/javascript" src="../js/eventi.js" crossorigin="anonymous"></script>
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'></script>
	<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>

</body>
</html>