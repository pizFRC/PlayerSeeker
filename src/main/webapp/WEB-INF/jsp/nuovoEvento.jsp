<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

	<!-- Slick CSS-->
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"/>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css"/>
	
	<jsp:include page="head.jsp"/>
	<!-- Custom CSS -->


<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">


<script src='https://api.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js'></script>

<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js" crossorigin="anonymous"></script>
<style>


.marker{

}
</style>

	
		
<script  crossorigin="anonymous" src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">









	
	
	
	<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
	
	<title>Player Seeker</title>
</head>

<body class="h-100">

<!-- HEADER --->
 	<jsp:include page="header.jsp" />
 	
 	 <div class="container-fluid" id="title">
            
            <h1 class="h1" align="center">Crea il tuo evento </h1>
            
            </div>
	<!-- FORM -->
<div class="container shadow-sm   bg-body  pb-2 border border-2 rounded-2 h-75" id="form_creazione_evento">
        
    <div class="d-flex justify-content-between h-100">
				<div class="align-self-center"  >
					<button class="btn btn-outline-primary float-start "
						type="button" onclick="prev()" id="btn_prev">
						<span><i class="fa fa-angle-left" aria-hidden="true"></i></span> <span
							class="sr-only">Previous</span>
					</button>
				</div>
				
		<form class=" needs-validation container w-75  h-100 p-3 "  method="post"  name="form_evento" id="form_evento" >
		  
	
          <div class="row mx-auto h-75 "  id="row">




				<div id="contenitore" class="col-12 mb-3" style="position:relative; height:50px;">

					<div id="step" class="d-flex justify-content-between w-100 " style="z-index: 9;">

						<div   >
							<span class=" badge border border-primary point bg-light active " ><i
								class="fas fa-volleyball-ball text-primary"> </i> </span>
								 <label
								class="lbl_progress " > Sport</label>
						</div>
						
						<div>
							<span class="badge point border bg-light" >
							     <i class="far fa-calendar-alt "></i> 
							</span> 
								<label class="lbl_progress" >Data e ora</label>
						</div>
						<div>
							<span class="badge  point border bg-light"><i
								class="fas fa-map-marked-alt"></i> </span> <label class="lbl_progress">Struttura</label>
						</div>
						<div>
							<span class="badge point border bg-light"> <i
								class="fas fa-users-cog"></i>
							</span>
							 <label class="lbl_progress">Partecipanti</label>
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

				<!-- Carousel -->
				
				
			<div  class="col-12 d-y h-75 mx-auto  " style="height: 500px" id="first_step">
			
				<hr class="my-4">
				<h6>Seleziona uno sport</h6>
				<hr class="my-4">
				<div class="carousel  m-4 mt-3 h-75">
				</div>
				<div id="error_msg" class="d-flex justify-content-center"> </div>
				
				
			</div>
               
            <!-- TIME PICKER -->
				<div class="col-12 mb-3 d-n h-75" id="second_step" name="second_step">
                   
                   <hr class="my-4">
				<h6 class="text-center fs-3 text-decoration link-primary" >Seleziona la data e l'ora che preferisci troveremo le strutture disponili</h6>
				<hr class="my-4">
					<div class="row">

						<div class="col-sm-10">
							<label for="data_input" class="form-label">Data</label> 
							<input type="date" class="form-control" id="data_input"
								name="data_input" placeholder="" value="" required min="">
							<div class="invalid-feedback">Valid first name is required.
							</div>
						</div>

						<div class="col-sm-6">
							<label for="ora_inizio" class="form-label">Ora inizio</label> 
							<input   class="timepicker form-control" id="ora_inizio"
								name="ora_inizio" required="" >
							<div class="invalid-feedback">Valid first name is required.
							</div>
						</div>

						<div class="col-sm-6">
							<label for="ora_fine" class="form-label">Ora Fine</label> <input
								 class="timepicker form-control" id="ora_fine"
								name="ora_fine" required="">
							<div class="invalid-feedback">Valid first name is required.
							</div>
						</div>





					</div>

				</div>


				<!-- MAP -->
			<div class="col-12 d-n h-100 " id="third_step">
				
			<h5 class="fs-5 text-primary">Seleziona una struttura nella tua città o	cercane una</h5>
			<hr class="my-4">
			<div style="position:relative; width: 100%; height: 100%;">
			 <div id="map" name="map" value="prova" class="border border-2 h-100 w-100" style="position:absolute;z-index: 90;">
			    	
			 
			 </div>
			 
			 <div class="border border-2 text-dark  glass "   id="info_struttura_selezionata">
								
								<address class="fs-4">

									Città attuale: <br> <i class="fas fa-map-marker-alt"
										aria-hidden="true"></i>Cosenza,Italia
								</address>

								<hr class="my-4">
								
								


							 <div class="input-group mx-auto ">
								
									<input class="form-control" aria-label="With textarea" name="indirizzo_struttura" placeholder="Struttura attualmente selezionata" disabled>
								</div>
							</div>
					
                  </div>
					</div>

		

           <!-- SET NUMERO GIOCATORI -->
			<div class="col-12 mb-3 d-n " id="four_step">
			<div class="" >
			
             <hr class="my-4">
				<h6>Aggiungi qui i giocatori </h6>
				<hr class="my-4">
				<label class="form-label" for="num_giocatori">Numero
					giocatori mancati</label>
					</div>
					
				<div class="input-group mb-3 " >
					<input type="text" class="form-control" id="num_giocatori"
						placeholder="" aria-label="" aria-describedby="button-addon2"
						disabled pattern="[0-9]+">
					<button class="btn btn-outline-secondary" type="button"
						onclick="addInputNameGiocatore()" id="button-addon2">
						<span><i class="fa fa-plus" aria-hidden="true"></i></span> <span
							class="sr-only">Previous</span>
					</button>

				</div>

				<div id="set_giocatori" class="container " ></div>
			</div>



 
			








               <!-- CONDIZIONI PRIVACY CHECKBOX AND CONFERMA CREAZIONE BUTTON-->
               
               
               
               <div class="form-check col-12 d-n " id="last_step">
               <div>
            <input type="checkbox" class="form-check-input" id="privacy">
            <label class="form-check-label" for="same-address" >Shipping address is the same as my billing address</label>
            </div>
           <div class="d-flex ">
				 <button class="btn btn-light mx-auto" disabled   id="confirm_btn" type="submit">Fine </button>
				
				</div>
          </div>
          
            <!-- TASTI AVANTI E INDIETRO -->
          
			
			<!-- END ROW -->
			
          </div>
          
          
          
          	
		</form>





		<div class="align-self-center " >
			<button class="btn btn-outline-primary  " type="button"
				onclick="next()" id="btn_next">
				<span><i class="fa fa-angle-right" aria-hidden="true"></i></span> <span
					class="sr-only">Next</span>
			</button>
		</div>
		
		
		</div>
	</div>
	
	<!-- end FORM -->


<c:if test="${user != null}">
			<div class="border border-2 border-primary">  </div>
			<a href="loginAction" class="btn btn-light">Login</a>  
		</c:if>
		

	
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
	

	
	
		<script type="text/javascript" src="../js/nuovoEvento.js"
		crossorigin="anonymous">
		
         </script>

	
<link href="css/nuovoEventoStyle.css" rel="stylesheet" type="text/css">
</body>
</html>

