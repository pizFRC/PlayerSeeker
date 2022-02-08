<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


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
	
		<div id = "review_modal" class="modal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Lascia la tua recensione</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="d-flex mb-3">
							<span class="fa fa-user-circle  mx-2 my-1" class="fa fa-user"></span> 
							<p> ${ profile.name } ${ profile.surname } </p>
						</div>
						
						<div class="d-flex justify-content-start my-2 mx-2" id="review_stars">
						
						<span class="fa fa-star review_star chosen" id="1" ></span>
						<span class="fa fa-star review_star" id="2"></span>
						<span class="fa fa-star review_star" id="3" ></span>
						<span class="fa fa-star review_star" id="4"></span>
						<span class="fa fa-star review_star" id="5"></span>
						</div>
					<form  class="input-group">
						<div class="input-group">
						
							<textarea class="form-control" aria-label="With textarea" id="review_text" style="border-bottom-color: #4960c5; border-bottom-width: 3px"></textarea>
						</div>
					</form>
			
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Annulla</button>
					<button id="confirm_review" onclick="sendReview(${ profile.id })" type="button" class="btn btn-primary">Conferma</button>
				</div>
			</div>
		</div>
	</div>


	<div id="review_list_modal" class="modal fade" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Recensioni</h5>
					<button type="button" onclick="" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<c:if test="${ reviews != null }">
						<c:forEach var="review" items="${reviews}">
								<div class="p-2 pb-1">
								<div class="d-flex mb-3 align-items-center my-2 mx-2">
									<i class="bi bi-person-circle me-2" style="font-size: 1.3rem"></i>
									<p>${ review.author.name  } ${ review.author.surname }</p>
								</div>
								<div class="d-flex justify-content-start my-2 mx-2"
									id="review_stars">          
                                    <c:forEach var="i" begin="0" end="5" step="1" varStatus ="status">
                                           <c:if test = "${ review.stars > i }">
                                       <span class="fa fa-star chosen" id=""></span> 
                                     </c:if>
                                      <c:if test = "${review.stars < i}">
                                       <span class="fa fa-star star-color" id=""></span> 
                                     </c:if>
                                     </c:forEach>
								</div>
								<div class="d-flex justify-content-start my-2 mx-2">
								
								<section> 
									<p class="mb-3" >${ review.text  }  </p>
									<p style="font-size: 80%">${ review.data  } </p>
								</section>
								</div>
							</div>
							<hr style="height:0.5px">
						</c:forEach>
					</c:if>
					<c:if test = "${ reviews == null }">
						<p>Ops,sembra le recensioni non siano disponibili al momento riprova più tardi </p>
					</c:if>
				</div>
			</div>
		</div>
	</div>
	
	
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
					<p id="description_label" class="fs-6 mb-1"><strong>Descrizione:</strong></p>
					<p id="description" class="fs-6 mb-3"></p>
					<div id="image_carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
					<p class="fs-6 mb-2"><strong>Immagini:</strong></p>
  					<div class="carousel-inner"></div>
  					<button class="carousel-control-prev" type="button" data-bs-target="#image_carousel" data-bs-slide="prev">
    					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    					<span class="visually-hidden">Previous</span>
  					</button>
  					<button class="carousel-control-next" type="button" data-bs-target="#image_carousel" data-bs-slide="next">
    					<span class="carousel-control-next-icon" aria-hidden="true"></span>
    					<span class="visually-hidden">Next</span>
  					</button>
				</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="email_modal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
  		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    		<div class="modal-content">
      			<div class="modal-header">
        			<h5 class="modal-title" id="title">Nuovo messaggio per ${sportFacility.name }</h5>
        			<button onclick="closeEmailModal()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      			</div>
     		 	<div class="modal-body">
        			<form>
          				<div class="mb-3">
            				<label for="message-text" class="col-form-label">Messaggio:</label>
            				<textarea class="form-control" id="message"></textarea>
          				</div>
        			</form>
      			</div>
      			<div class="modal-footer">
        			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
        			<button id="send_message_button" disabled onclick="sendMessage(${sportFacility.id}, '${sportFacility.name}')" type="button" class="btn btn-primary">Invia messaggio</button>
      			</div>
    		</div>
  		</div>
	</div>
	
	<div class="h-100 w-100 d-flex align-items-center position-relative">
		<div class="h-100 w-100" id="map"></div>
		<c:if test="${user != null}">
		<div class="position-fixed bottom-0 end-0 m-4" style="z-index: 2;">
			<button id="calendar_button" onclick="$('#email_modal').modal('show')" class="w-100 near-position-button rounded-pill btn btn-primary shadow-lg p-3 ps-4 pe-4 mb-3 rounded d-flex align-items-center">
				<i style="font-size: 1.5rem"class="bi bi-send-plus me-3"></i>Contatta
			</button>		
		</div>
		</c:if>
		<div class="col-12 col-md-7 col-xl-5 position-absolute top-50 start-0 translate-middle-y h-100 p-0 p-md-5" style="z-index: 2;">
			<div style="overflow-y: auto; max-height:100%" class="h-100 shadow-lg p-4 p-md-5 pt-5 mb-5 bg-body rounded">
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
						<div class="d-flex align-items-center justify-content-between mb-3">
							<p class="fs-6 me-2"><strong>Campo da gioco ${count}: </strong> ${playground.sport.type}</p>
							<button onclick="showPlaygroundDetails(${playground.id}, '${playground.description}')" class="pe-3 ps-3 btn btn-sm btn-outline-light border border-2 rounded-pill d-flex justify-content-center align-items-center"> 
								<i class="bi bi-eye me-2"></i> Dettagli
							</button>
						</div>
						<c:set var="count" value="${count+1 }"/>
					</c:forEach>
				</div>
				
				<div class="p-3 mb-5 info-element" style="border-bottom-color: #4960c5">
					<p id="name" class="fs-5 mb-1"><strong>Eventi</strong></p>
					<p id="name" class="fs-6 mb-3">La struttura ospiterà ${ sportFacility.events.size()} evento/i</p>
					<c:set var="count" value="1"/>
					<c:forEach var="event" items="${ sportFacility.events }">
						<div class="d-flex align-items-center justify-content-between mb-3">
							<p class="fs-6 me-2"><strong>Evento ${count}: </strong> ${event.sport.type}</p>
							<button onclick="window.location = '//localhost:8080/eventDetails/${event.id}'" class="pe-3 ps-3 btn btn-sm btn-outline-light border border-2 rounded-pill d-flex justify-content-center align-items-center"> 
								<i class="bi bi-eye me-2"></i> Dettagli
							</button>
						</div>
						<c:set var="count" value="${count+1 }"/>
					</c:forEach>
				</div>
				
				<!-- Review -->
				<div class="p-3 mb-5 info-element" style="border-bottom-color: #bbe39d">
					<p id="name" class="fs-5 mb-1"><strong>Recensioni</strong></p>
                  <div class="d-flex justify-content-between">
					<table class="table table-borderless ">
						<tbody >
							<tr>
								<th scope="row" >5</th>
								<td>
									<div id="5_stars"  class="progress" style="height: 2px;">
										<div class="progress-bar" role="progressbar"
									style="width:${(review.votes[4] * 100)/review.totalVotes}%;" aria-valuenow="${review.votes[4]}" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</td>
							</tr>
							<tr>
								 <th scope="row"  class="w-10">4</th>
									<td>
									<div id="4_stars"  class="progress" style="height: 2px;">
										<div class="progress-bar" role="progressbar"
									style="width:${(review.votes[3] * 100)/review.totalVotes}%;" aria-valuenow="${review.votes[3]}" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row"  class="w-10">3</th>
									<td>
									<div id="3_stars"  class="progress" style="height: 2px;">
										<div class="progress-bar" role="progressbar"
											style="width:${(review.votes[2] * 100)/review.totalVotes}%;" aria-valuenow="${review.votes[2]}" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row"  class="w-10" >2</th>
									<td>
									<div id="2_stars"  class="progress" style="height: 2px;">
										<div class="progress-bar" role="progressbar"
											style="width:${(review.votes[1] * 100)/review.totalVotes}%;" aria-valuenow="${review.votes[1]}" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row" class="w-10" >1</th>
									<td>
									<div id="1_stars" class="progress" style="height: 2px;">
										<div class="progress-bar" role="progressbar"
											style="width:${(review.votes[0] * 100)/review.totalVotes}%;" aria-valuenow="${(review.votes[0] * 100)/review.totalVotes}" aria-valuemin="0"
											aria-valuemax="100"></div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
						<div id="voto "	class="position-relative voto my-auto">
							<div class="position-aboslute text-center w-100  mw-100">
								<h2 id="voto_value"><fmt:formatNumber type="number" maxFractionDigits="1" value=" ${review.starsAverage} "/></h2>
								<div class="d-flex justify-content-center" id="stars">
									<span class="fa fa-star"></span>
									<span class="fa fa-star"></span>
									<span class="fa fa-star "></span>
									<span class="fa fa-star"></span>
									<span class="fa fa-star"></span>
								</div>
								<input type="button" class="btn link-primary btn-sm mx-auto" onclick="showReview(${sportFacility.id })" value="${review.totalVotes} Recensioni"> 
							</div>
						</div>	
					</div>
					<div class="d-flex justify-content-center">
					<c:if test="${user != null}">					
		           <button onclick="showAddReview()"class="btn btn-outline-primary mx-auto rounded-pill d-flex align-items-center"> <i class="bi bi-chat-quote me-2"></i> Scrivi una recensione </button>
		         </c:if>
		         <c:if test="${user == null}">					
		           <a href="/login" class="btn btn-outline-primary rounded-pill">Accedi per lasciare una recensione  </a>
		         </c:if>
		           </div>
				</div>

				<div style = "min-height: 350px" class="w-100" id="internal_map"></div>
				<c:if test="${user != null}">
				<div id="internal_email_button" class="position-fixed bottom-0 end-0 m-4" style="z-index: 2;">
					<button onclick="$('#email_modal').modal('show')" class="w-100 near-position-button rounded-pill btn btn-primary shadow-lg p-3 ps-4 pe-4 mb-3 rounded d-flex align-items-center">
						<i style="font-size: 1.5rem"class="bi bi-send-plus me-3"></i>Contatta
					</button>		
				</div>
				</c:if>
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
	
	<!-- EmailJS -->
	<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
		
	<script type="text/javascript">
		initializePosition(${sportFacility.address.longitude}, ${sportFacility.address.latitude});
	</script>
	
	<c:if test="${user != null}">
	<script type="text/javascript">
		getDistance(${sportFacility.address.longitude}, ${sportFacility.address.latitude}, ${profile.address.longitude}, ${profile.address.latitude});
	</script>
	</c:if>
	
</body>