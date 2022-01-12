<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="head.jsp" />
	<title>Player Seeker - Eventi</title>
</head>

<body onload="loadJSONEventsFromRestController()">

	<!-- HEADER --->
	<jsp:include page="header.jsp" />
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">
	<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />

	<section class="intro">
		<div class="bg-image h-100">
			<div class="mask d-flex align-items-center h-100"
				style="background-color: white;">
				<div class="container">
					<p class="display-4 font-weight-bold mb-5 text-dark">Scegli gli
						eventi della tua città</p>
					<div class="card">
						<div class="card-body">
							<div class="row justify-content-center">
								<div class="col-md-6 mb-3 mb-md-0">
									<div id="basic" class="form-outline"> 
										<div class="form-notch">
											<div class="form-notch-leading" style="width: 9px;"></div>
											<div class="form-notch-middle" style="width: 170.4px;"></div>
											<div class="form-notch-trailing"></div>
										</div>
									</div>
								</div>


								<div class="col-md-4 mb-3 mb-md-0">


									<label for="browser" class="form-label">Scegli uno
										sport</label> <select class="form-select form-select-lg">
										<option selected>Tutti gli sport</option>
										<option>Calcio</option>

										<option value="fa-apple">fa-apple</option>
										<option>4</option>
									</select>



								</div>


								<div class="col-md-2">
									<label> </label>
									<button
										class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3 h-75"
										type="submit">
										<span><i class="fa fa-search" aria-hidden="true"></i></span> <span
											class="sr-only">Google</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</section>


	<section class="container" style="background-color: white">
		<div class="row">

			<div class="col-lg-12  col-xxl-12 col-xl-12 col-sm-12">
				<div class="tasti_da_nascondere mx-auto ">
					<button id="btn_list" class="btn btn-primary btn-rounded btn-block"
						type="submit" value="Search">
						<span><i class="bi bi-list"></i></span> <span class="sr-only">Lista</span>
					</button>

					<button id="btn_grid" class="btn btn-primary btn-rounded btn-block"
						type="submit" value="Search">
						<span><i class="bi bi-grid-fill"></i></span><span class="sr-only">Griglia</span>
					</button>

				</div>
				<div class="row" id="card_container">


					<div
						class="item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 mx-auto m-1 pb-1">

						<div class="card">
							<div class="card-body">
								<h5 class="card-title">Special title treatment</h5>
								<p class="card-text">With supporting text below as a natural
									lead-in to additional content.</p>
								<a href="#" class="btn btn-primary">Go somewhere</a>
							</div>
						</div>

					</div>

					<div
						class="item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12 mx-auto m-1 pb-1">

						<div class="card">
							<div class="card-body">
								<h5 class="card-title">Special title treatment</h5>
								<p class="card-text">With supporting text below as a natural
									lead-in to additional content.</p>
								<a href="#" class="btn btn-primary">Go somewhere</a>
							</div>
						</div>

					</div>

					<div
						class="item col-md-12 col-sm-12 col-lg-12 col-xxl-12 col-xl-12  mx-auto m-1 pb-1">

						<div class="card">
							<div class="card-body">
								<h5 class="card-title">Special title treatment</h5>
								<p class="card-text">With supporting text below as a natural
									lead-in to additional content.</p>
								<a href="#" class="btn btn-primary">Go somewhere</a>
							</div>
						</div>

					</div>



				</div>

			</div>
		</div>
	</section>
	
	<!-- FOOTER -->
	<jsp:include page="footer.jsp" />
	
	<!-- CDN -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	
	<script type="text/javascript" src="../js/eventi.js"
		crossorigin="anonymous">
		
	</script>
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'></script>
	<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>

</body>
</html>