<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<link rel="icon" href="../img/favicon.png">

<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

<!-- Custom CSS -->
<link href="../css/style.css" rel="stylesheet" type="text/css">

<!--Bootstrap Icon -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

<!-- Font -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway:300,400" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<!-- Mapbox CSS-->
<link rel="stylesheet"
	href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
	type="text/css">
<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css'
	rel='stylesheet' />
<!-- Mapbox CSS-->
<link rel="stylesheet"
	href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
	type="text/css">
<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css'
	rel='stylesheet' />
<title>Player Seeker - Dettagli Evento</title>
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

<body>
	<!-- HEADER --->
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<nav class="navbar fixed-top navbar-expand-lg navbar-light shadow-lg p-3 mb-5 bg-body">
  <div class="container-fluid">
    <c:if test="${user == null || user.userType == 'player'}">
    	<a class="navbar-brand" href="/">
    		<img width="150" height="50" src="../img/logo.png"/>
   		</a>
    </c:if>
    <c:if test="${user != null && user.userType == 'sport_facility'}">
    	<a class="navbar-brand" href="#">
    		<img width="150" height="50" src="../img/logo.png"/>
   		</a>
    </c:if>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <c:if test="${user == null || user.userType == 'player'}">
        <li class="nav-item">
          	<a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          	<a class="nav-link" href="../eventi">Eventi</a>
       	 </li>
        <li class="nav-item">
          	<a class="nav-link" href="../strutture">Strutture</a>
        </li>
     </c:if>
     </ul>
        <c:if test="${user == null}">
			<a type="button" class="btn btn-outline-primary me-2" href="../login">Accedi</a>
		</c:if>
		<c:if test="${user != null}">
			<c:if test="${user.userType == 'player'}">
				<a type="button" class="btn btn-outline-primary me-2" href="../accountManagementPlayer"> <i class="bi bi-person me-2"></i> ${ profile.name }</a>
			</c:if>
			<c:if test="${user.userType == 'sport_facility'}">
				<a type="button" class="btn btn-outline-primary me-2" href="../accountManagementSportFacility"> <i class="bi bi-person me-2"></i> ${ profile.name }</a>
			</c:if>
		</c:if>
    </div>
  </div>
</nav>

	<div class="m-0 m-sm-5 p-0 p-sm-5">
		<div class="row">
			<div class="col-lg-8 p-0">
				<div class="h-100 p-5 pb-2 shadow mb-5 bg-body rounded">
					<p class="fs-2 mb-1">Dettagli Evento</p>
					<p class="fs-6 mb-3"> <i class="bi bi-pencil-fill me-2"></i> 
						Organizzatore: <strong> ${event.organizzatore.name} ${event.organizzatore.surname} </strong>
					</p>
					<c:if test="${event.description == null || event.description == ''}">
						<p id="description" class="fs-6 mb-3">Nessuna descrizione</p>
					</c:if>
					<c:if test="${event.description != null || event.description != ''}">
						<p id="description" class="fs-6 mb-3">${event.description}</p>
					</c:if>
					<div class="row mb-4">
						<div class="col-md-3 p-4">
							<div class="text-center p-4 info-element"
								style="border-bottom-color: #e59558;">
								<i class="icon bi bi-geo-alt-fill" style="color: #e59558;"></i>
								<p id="sport_facility" class="fs-6 mt-3">${event.sportFacility.name}</p>
							</div>
						</div>
						<div class="col-md-3 p-4">
							<div class="text-center p-4 info-element"
								style="border-bottom-color: #e5c45d;">
								<i class="icon bi bi-pin-angle-fill" style="color: #e5c45d;"></i>
								<p id="sport" class="fs-6 mt-3">${event.sport.type}</p>
							</div>
						</div>
						<div class="col-md-3 p-4">
							<div class="text-center p-4 info-element"
								style="border-bottom-color: #bbe39d;">
								<i class="icon bi bi-calendar-event-fill" style="color: #bbe39d;"></i>
								<p id="date" class="fs-6 mt-3">${event.start}</p>
							</div>
						</div>
						<div class="col-md-3 p-4">
							<div class="text-center p-4 info-element"
								style="border-bottom-color: #8aceec;">
								<i class="icon bi bi-clock-fill" style="color: #8aceec;"></i>
								<p id="start" class="fs-6 mt-3">${event.beginHour}</p>
								<p id="finish" class="fs-6">${event.endHour}</p>
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
	
	<!-- FOOTER -->
	<jsp:include page="footer.jsp" />

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
	<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>

	<!-- Custom -->
	<script type="text/javascript" src="../js/eventDetails.js"> </script>
	
	<script type="text/javascript">
		initializePosition(${event.sportFacility.address.longitude}, ${event.sportFacility.address.latitude});
	</script>
</body>