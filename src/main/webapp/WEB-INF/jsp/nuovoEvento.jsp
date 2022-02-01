<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>

	<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

	<!-- Slick CSS-->
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"/>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"/>
	
	<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>

	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">

	<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet">
	
	
	<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">

	<jsp:include page="head.jsp"/>
	<title>Player Seeker</title>
</head>

<body class="h-100">

<!-- HEADER --->
 	<jsp:include page="header.jsp" />
 	
 	<c:if test="${user == null }">
		<div class ="h-100 w-100 position-relative">
			<div class="card position-absolute top-50 start-50 translate-middle shadow mb-5 rounded">
				<h5 class="card-header pt-3 pb-3">Ops, c'è un problema!</h5>
				<div class="card-body">
					<div class="alert alert-danger d-flex align-items-center"
						role="alert">
						<i class="bi bi-exclamation-circle-fill me-2"></i>
						<div>
							<p class="fs-6">Effettua il login come giocatore per
								effettuare la creazione di un nuovo evento!</p>
						</div>
					</div>
					<div class="d-flex justify-content-end">
						<a href="/" class="btn btn-outline-secondary me-3">Torna alla home</a>
						<a href="/login" class="btn btn-primary">Effettua il login</a>
					</div>
				</div>
			</div>
		</div>
 	</c:if>
 	
 	<c:if test="${user != null && user.userType == 'sport_facility'}">
 		<div class ="h-100 w-100 position-relative">
			<div class="card position-absolute top-50 start-50 translate-middle shadow mb-5 rounded">
				<h5 class="card-header pt-3 pb-3">Ops, c'è un problema!</h5>
				<div class="card-body">
					<div class="alert alert-danger d-flex align-items-center"
						role="alert">
						<i class="bi bi-exclamation-circle-fill me-2"></i>
						<div>
							<p class="fs-6">Una struttura sportiva non è autorizzata alla creazione di un evento.
							Effettua il login come giocatore per effettuare la creazione di un nuovo evento!
							</p>
						</div>
					</div>
					<div class="d-flex justify-content-end">
						<a href="/" class="btn btn-outline-secondary me-3">Torna alla home</a>
						<a href="/login" class="btn btn-primary">Effettua il login</a>
					</div>
				</div>
			</div>
		</div>
 	</c:if>
 	
 <c:if test="${user != null && user.userType == 'player'}">
 <div class ="m-5">
 	 <div class="container-fluid" id="title">
            
            <h1 class="h1" align="center" style="color: #e59558">Crea il tuo evento </h1>
            
            </div>
	<!-- FORM -->
<div class="container shadow-sm bg-body p-5 border border-2 rounded-2" id="form_creazione_evento">

		<div class="d-flex justify-content-between h-100">
			<div class="align-self-center" id="div_btn_prev">
				<button class="btn btn-outline-primary float-start " type="button"
					onclick="prev()" id="btn_prev">
					<span><i class="fa fa-angle-left" aria-hidden="true"></i></span> <span
						class="sr-only">Previous</span>
				</button>
			</div>

			<form class=" needs-validation container w-75  h-100 p-3 "
				method="post" name="form_evento" id="form_evento">


				<div class="row mx-auto h-75 " id="row">




					<div id="contenitore" class="col-12 mb-3"
						style="position: relative; height: 50px;">

						<div id="step" class="d-flex justify-content-between w-100 "
							style="z-index: 9;">

							<div>
								<span
									class=" badge border border-primary point bg-light active "><i
									class="fas fa-volleyball-ball text-primary"> </i> </span> <label
									class="lbl_progress "> Sport</label>
							</div>

							<div>
								<span class="badge point border bg-light"> <i
									class="far fa-calendar-alt "></i>
								</span> <label class="lbl_progress">Data e ora</label>
							</div>
							<div>
								<span class="badge  point border bg-light"><i
									class="fas fa-map-marked-alt"></i> </span> <label class="lbl_progress">Struttura</label>
							</div>
							<div>
								<span class="badge point border bg-light"> <i
									class="fas fa-users-cog"></i>
								</span> <label class="lbl_progress">Partecipanti</label>
							</div>
							<div>
								<span class="badge point border bg-light"> <i
									class="fas fa-check-circle"></i>
								</span> <label class="lbl_progress">Privacy</label>
							</div>
						</div>

						<div id="progress" class="progress "
							style="height: 1px; z-index: 6;">

							<div id="progress_bar" class="progress-bar bg-primary "
								role="progressbar" style="width: 0%;" aria-valuenow="0"
								aria-valuemin="0" aria-valuemax="100"></div>
						</div>


					</div>
						<div id = "error_modal" class="modal" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Ops, c'è un problema</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-danger d-flex align-items-center" role="alert">
						<i class="bi bi-exclamation-circle-fill me-3"></i>
						<div>
							<p id="error_message" class="fs-6"></p>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<a type="button" onclick="$('#error_modal').modal('hide')"  id="error_button" class="btn btn-primary">Capito</a>
				</div>
			</div>
		</div>
	</div>
	
	<div id = "success_modal" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Successo</h5>
					<button type="button" onclick="" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="alert alert-success" role="alert">
						<h4 class="alert-heading">Ben fatto!</h4>
						<p>L'evento è stato creato con successo!.</p>
					</div>
					
				</div>
				<div class="modal-footer">
					<a type="button" href="/" class="btn btn-primary">Capito</a>
				</div>
			</div>
		</div>
	</div>

					<!-- lista sport -->


					<div class="col-12 d-y h-75 mx-auto  " style="height: 500px"
						id="first_step">

						<h4>Scegli uno sport fra quelli presenti</h4>
						
						
						<div id="error_msg" class="d-flex justify-content-center"> </div>
						<div>
						<select class="form-select mb-2" aria-label="Default select example" id="sport_select" name="sport_select" required form="form_evento">
						<option value="">Seleziona uno sport </option>
						</select>
						</div>
						<div class="carousel  m-4 mt-3 h-75"></div>
						


					</div>

					<!-- TIME PICKER -->
					<div class="col-12 mb-3 d-n h-75" id="second_step"
						name="second_step">

						<h6 class="text-center fs-3 text-decoration link-primary">Seleziona
							la data e l'ora che preferisci troveremo le strutture disponili</h6>
					
						<div class="row">

							<div class="col-sm-10">
								<label for="data_input" class="form-label">Data</label> <input
									type="date" class="form-control" id="data_input"
									name="data_input" placeholder="" value="" required min="">
								
							</div>

							<div class="col-sm-6">
								<label for="ora_inizio" class="form-label">Ora inizio</label> <input
									class="timepicker form-control" id="ora_inizio"
									name="ora_inizio" required="">
								
							</div>

							<div class="col-sm-6">
								<label for="ora_fine" class="form-label">Ora Fine</label> <input
									class="timepicker form-control" id="ora_fine" name="ora_fine"
									required="">
								
							</div>





						</div>

					</div>


					<!-- MAP -->
					<div class="col-12 d-n h-100 " id="third_step">

						<h3 class="fs-4 " >Seleziona una struttura nella
							tua città o cercane una</h5>
						
							
							
							
							<div style="position: relative; width: 100%; height: 100%;">
							<div id="map" name="map"
								class="border border-2 h-100 w-100"
								style="position: absolute; z-index: 90;"></div>

							<div class="border border-2 text-dark glass row "
								id="info_struttura_selezionata">
								
								<div class="col-12  ">

									<label class="form-check-label fn-4 text-primary">Struttura	Selezionata</label>
									<p class="bg-lbody border-bottom border-2 rounder mb-2 "id="struttura_selezionata"></p>

							


									<label class="form-check-label fn-4 text-primary">Data scelta</label>
									<p class="bg-lbody border-bottom border-2 rounder mb-2"	id="data_scelta"></p>

								


									<label class="form-check-label fn-4 text-primary">Fascia oraria</label>
									<p class="bg-lbody border-bottom border-2 rounder mb-2 " id="fascia_scelta"></p>



									<label class="form-check-label fn-4 text-primary">Campo selezionato</label>
									<select class="form-select mb-2" aria-label="Default select example" id="campo_selezionato" name="campo_selezionato" form="form_evento">
									</select>

								</div>
							</div>
							<div class="alert alert-warning alert-dismissible  rounded rounded-pill align-items-center d-none "role="alert" id="alert_strutture">
								
								
								<i class="bi bi-info-circle-fill"width="24" height="24" id="icon_alert"></i> 
								<p class="text_alert align-middle">Potrebbero non esserci strutture disponibili nella zona in cui stai cercando </br>  prova a cambiare fascia oraria o a spostarti sulla mappa</p> 
								<button type="button" class="btn-close " id="btn_close_alert" action="hideAlert()" aria-label="Close"></button>
								
								 
							</div>
							
							
							
						</div>
					</div>

					<!-- SET NUMERO GIOCATORI -->
					<div class="col-12 mb-3 d-n " id="four_step">
						<div class="">

							
							<h6>Aggiungi qui i giocatori</h6>
						
							<label class="form-label" for="num_giocatori">Numero
								giocatori mancati</label>
						</div>

						<div class="input-group mb-3 ">
							<input type="text" class="form-control" id="num_giocatori"
								placeholder="" aria-label="" aria-describedby="button-addon2"
								disabled pattern="[0-9]+">
							<button class="btn btn-outline-secondary" type="button"
								onclick="addInputNameGiocatore()" id="button-addon2">
								<span><i class="fa fa-plus" aria-hidden="true"></i></span> <span
									class="sr-only">Previous</span>
							</button>

						</div>

						<div id="set_giocatori" class="container "></div>
					</div>



					<!-- CONDIZIONI PRIVACY CHECKBOX AND CONFERMA CREAZIONE BUTTON-->



					<div class="form-check col-12 d-n " id="last_step">
						<h1 class="fn-2 text-center">Resoconto creazione evento</h1>

						<div class="row " id="resoconto">

							<div class="col-12  ">


								<label class="form-check-label fn-4 text-primary">Nome
									creatore evento</label>
								<p class=" border-bottom border-2 rounder ">Francesco de fazio</p>
								
							</div>
							<div class="col-12  ">


								<label class="form-check-label fn-4 text-primary">Struttura
									ospitante</label>
								<p class="bg-lbody border-bottom border-2 rounder " id="struttura_resoconto"></p>

							</div>
							<div class="col-12  ">


								<label class="form-check-label fn-4 text-primary">Sport selezionato</label>
								<p class="bg-lbody border-bottom border-2 rounder " id="sport_selezionato_resoconto"></p>

							</div>
                              <div class="col-12  ">


								<label class="form-check-label fn-4 text-primary">Data </label>
								<p class="bg-lbody border-bottom border-2 rounder " id="data_resoconto"> </p>

							</div>
							
							<div class="col-12  ">

								<label class="form-check-label fn-4 text-primary">Fascia oraria</label>
								<p class="bg-lbody border-bottom border-2 rounder " id="ora_resoconto"> </p>

							</div>
							
						</div>
						<div class=" row  ">
						<div  class="col-12 d-flex justify-content-center">
								<input type="checkbox" class="form-check-input text-center" id="privacy" name="privacy_cornfirm">
								<label class="form-check-label text-center" for="same-address">Accetta le normative della privacy per confermare la creazione</label>
							</div>
							<div  class="col-12 d-flex justify-content-center">
						<button class="btn btn-success mx-auto" disabled id="confirm_btn"
									type="submit">Fine</button>
									</div>
									</div>
									
					</div>
					<!-- TASTI AVANTI E INDIETRO -->


					<!-- END ROW -->

				</div>
				
		<c:if test="${user != null && user.userType=='player'}">
		<input type="hidden" id="longitude" value="${profile.address.latitude}"> 
		<input type="hidden" id="latitude" value="${profile.address.longitude}">
		</c:if>
		</form>





		<div class="align-self-center "  id="div_btn_next">
			<button class="btn btn-outline-primary  " type="button"
				onclick="next()" id="btn_next">
				<span><i class="fa fa-angle-right" aria-hidden="true"></i></span> <span
					class="sr-only">Next</span>
			</button>
		</div>
		
		
		</div>
	</div>
</div>
	</c:if>
	
	<!-- end FORM -->



		

	
<!-- FOOTER -->
	<jsp:include page="footer.jsp" />


	
	<!-- Bootstrap -->
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	
	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>

	<script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
		
	<!--Slick -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>
	
	<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js" crossorigin="anonymous"></script>
	<script  crossorigin="anonymous" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
	<script src='https://api.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js'></script>
	
		<script type="text/javascript" src="../js/nuovoEvento.js"
		crossorigin="anonymous">
		
         </script>

	
<link href="css/nuovoEventoStyle.css" rel="stylesheet" type="text/css">
</body>
</html>

