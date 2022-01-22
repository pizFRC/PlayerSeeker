<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
						<button id="btn_list" class="me-2 btn btn-primary btn-rounded btn-block" type="submit" value="Search">
							<i class="bi bi-list"></i> Lista
						</button>
						<button id="btn_grid" class="btn btn-primary btn-rounded btn-block" type="submit" value="Search"> 
							<i class="bi bi-grid-fill"></i> Griglia
						</button>
					</div>
					<div id="rangeDiv" class="w-50">
						<label for="range" class="form-label">Distanza dalla tua posizione: 15 km</label>
						<input type="range" class="form-range" min="5" max="25" step="5" id="range">
					</div>
				</div>
				
				<div class="row" id="card_container">
					<div
						class="item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 mx-auto m-1 pb-1">
						<div class="card mb-3">
							<div class="card-body">
								<h5 class="card-title">Special title treatment</h5>
								<p class="card-text mb-3">With supporting text below as a natural
									lead-in to additional content.</p>
								<a href="#" class="btn btn-primary">Go somewhere</a>
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
								<a href="#" class="btn btn-primary">Go somewhere</a>
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
								<a href="#" class="btn btn-primary">Go somewhere</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
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