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
<title>Player Seeker - Dettagli Struttura</title>

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
							<c:forEach var="i" begin="1" end="7" step="1">
								<tr>
								<c:choose>
									<c:when test="${i == 1}"> <td>Lunedì</td> </c:when>
									<c:when test="${i == 2}"> <td>Martedì</td> </c:when>
									<c:when test="${i == 3}"> <td>Mercoledì</td> </c:when>
									<c:when test="${i == 4}"> <td>Giovedì</td> </c:when>
									<c:when test="${i == 5}"> <td>Venerdi</td> </c:when>
									<c:when test="${i == 6}"> <td>Sabato</td> </c:when>
									<c:when test="${i == 7}"> <td>Domenica</td> </c:when>
								</c:choose>
								<c:set var="open" value="false"/>
								<c:forEach var="hour" items="${ sportFacility.openingHours }">
									<c:if test="${hour.day == i }">
										<td>${hour.openTime}</td>
										<td>${hour.closeTime}</td>
										<c:set var="open" value="true"/>
									</c:if>
								</c:forEach>
								<c:if test="${open eq false}">
									<td colspan="2">Chiuso</td>
								</c:if>
								</tr>
							</c:forEach>
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
					<p id="description" class="fs-6 mb-3"></p>
				</div>
			</div>
		</div>
	</div>
	
	<div class="h-100 w-100 d-flex align-items-center position-relative">
		<div class="h-100 w-100" id="map"></div>
		
		<div class="col-12 col-md-7 col-xl-5 position-absolute top-50 start-0 translate-middle-y h-100 p-0 p-md-5" style="z-index: 2;">
			<div style="overflow-y: auto; max-height:100%"class="h-100 shadow-lg p-5 mb-5 bg-body rounded">
				<p id="name" class="fs-2 mb-3">${sportFacility.name }</p>
				<c:if test="${user != null }">
					<hr class="mb-2" style="height:0.5px">
					<p style="font-size:90%" id="distance" class="mb-4"> Distanza dalla tua posizione:</p>
				</c:if>
				<c:if test="${user == null }">
					<hr class="mb-5" style="height:0.5px">
				</c:if>
				<div class="d-flex mb-4"> 
					<i class="icon bi bi-geo-alt-fill me-2" style="color: #e59558;"></i>
					<p class ="fs-6 me-2"><strong>Indirizzo:</strong></p>
					<p class = "fs-6" id = "address"></p>
				</div>
				<p id="phone" class="fs-6 mb-3">
					<i class="icon bi bi-telephone-fill me-2" style="color: #e5c45d;"></i>
					<strong>Telefono: </strong>
					<c:if test="${sportFacility.phone == ' '}">
						Nessun numero di telefono
					</c:if>
					<c:if test="${sportFacility.phone != ' '}">
						${sportFacility.phone }
					</c:if>
					</p>
				<p id="web_site" class="fs-6 mb-3"> <i class="icon bi bi-globe me-2" style="color: #bbe39d;">
					</i><strong>Sito web: </strong> 
					<c:if test="${sportFacility.webSiteUrl == null}">
						Nessun sito web
					</c:if>
					<c:if test="${sportFacility.phone != null}">
						<a href="//${sportFacility.webSiteUrl}" class="link-primary" target="_blank">${sportFacility.webSiteUrl}</a>
					</c:if>
					</p>
				<p id="hours" class="fs-6 mb-5"> <i class="icon bi bi-clock-fill me-2" style="color: #8aceec;">
					</i><strong>Orari di apertura: </strong>
					<a type="button" onclick="$('#hour_modal').modal('show')"href="#" class="link-primary">Mostra tutti gli orari</a></p>
					
				<div class="p-3 mb-5 info-element" style="border-bottom-color: #e59558">
					<p id="name" class="fs-5 mb-1"><strong>Campi da gioco</strong></p>
					<p id="name" class="fs-6 mb-3">La struttura ha a disposizione ${ sportFacility.playgrounds.size() } campo/i da gioco</p>
					<c:set var="count" value="1"/>
					<c:forEach var="playground" items="${ sportFacility.playgrounds }">
						<p class="fs-6 mb-2"><strong>Campo da gioco n. ${count}: </strong> ${playground.sport.type}
							<a type="button" onclick="showPlaygroundDescription('${playground.description}')" href="#" class="link-primary">Mostra dettagli</a>
						</p>
						<c:set var="count" value="${count+1 }"/>
					</c:forEach>
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
		
	<!-- Turf JS -->	
	<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
	
	<!-- Custom -->
	<script type="text/javascript" src="../js/sportFacilityDetails.js"> </script>
		
	<script type="text/javascript">
		initializePosition(${sportFacility.address.longitude}, ${sportFacility.address.latitude});
	</script>
	
	<c:if test="${user != null}">
	<script type="text/javascript">
		getDistance(${sportFacility.address.longitude}, ${sportFacility.address.latitude}, ${profile.address.longitude}, ${profile.address.latitude});
	</script>
	</c:if>
	

</body>