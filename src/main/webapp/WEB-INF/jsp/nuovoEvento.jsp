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
<link href="../css/style.css"rel="stylesheet" type="text/css">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">


<script src='https://api.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js'></script>

<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>
<style>

#map {  width: 100%; height:50%; }
.marker{

}
</style>

	
		
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">









	
	
	
	<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
	
	<title>Player Seeker</title>
</head>

<body>

<!-- HEADER --->
 	<jsp:include page="header.jsp" />
	
	<!-- FORM -->
<div class="container shadow rounded-2 bg-body bg-dark p-5" id="form_creazione_evento">

		<form class=" needs-validation container-fluid w-75 mx-auto " id="form_evento">
		
	
          <div class="row">


            <div class="col-12" id="title">
            
            <h1 class="h1">Seleziona uno sport per l'evento da creare</h1>
            
            </div>

			<div  id="contenitore" class="col-12 mb-3"  style="position: relative; height: 20px;">
			
			<div id="step" class="d-flex justify-content-between w-100 "  style="z-index:9;">
			
				    <span class="badge badge-pill border border-2 border-dark point bg-light "  ><i class="fas fa-volleyball-ball" ></i></span>
			<span class="badge badge-pill point border border-2 bg-light  " ><i class="far fa-calendar-alt"></i> </span>
				<span class="badge badge-pill point border border-2 bg-light  " ><i class="fas fa-map-marked-alt"></i>  </span>
			<span class="badge badge-pill point border border-2 bg-light " > <i class="fas fa-users-cog"></i> </span>
			<span class="badge badge-pill  point border border-2 bg-light  " >  <i class="fas fa-check-circle"></i>  </span> 	
			</div>
				
				<div  id="progress" class="progress " style="height: 1px;z-index:6;">
				
					<div id="progress_bar" class="progress-bar bg-dark "
						role="progressbar" style="width: 0%;" aria-valuenow="0"
						aria-valuemin="0" aria-valuemax="100">
						
					</div>
				</div>
				
				
			</div>
			
             <!-- Carousel -->
			<div  class="col-12 d-y" id="first_step">
				<div class="carousel d-flex m-4 mt-3"></div>
			</div>

            <!-- TIME PICKER -->
				<div class="col-12 mb-3 d-n " id="second_step" name="second_step">

					<div class="row">

						<div class="col-sm-10">
							<label for="data_input" class="form-label">Data</label> 
							<input type="date" class="form-control" id="data_input"
								name="data_input" placeholder="" value="" required="">
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
			<div class="col-12 mb-5 d-n" id="third_step">

				<h1>Seleziona una struttura</h1>





				<div class="container border border-2 rounded" id="map"></div>




			</div>

		

           <!-- SET NUMERO GIOCATORI -->
			<div class="col-12 mb-3 d-n" id="four_step">

				<label class="form-label" for="num_giocatori">Numero
					giocatori mancati</label>
				<div class="input-group mb-3">
					<input type="text" class="form-control" id="num_giocatori"
						placeholder="" aria-label="" aria-describedby="button-addon2"
						disabled pattern="[0-9]+">
					<button class="btn btn-outline-secondary" type="button"
						onclick="addInputNameGiocatore()" id="button-addon2">
						<span><i class="fa fa-plus" aria-hidden="true"></i></span> <span
							class="sr-only">Previous</span>
					</button>

				</div>

				<div id="set_giocatori" class="container-fluid"></div>
			</div>



   <!-- COMMENTO
			<div class="col-12 mt-4  d-n " id="comment_step">

				<div class="container mb-3 mt-3">
					<label for="comment">Inserisci un promemoria per l'evento:</label>
					<textarea class="form-control w-100" rows="5" id="comment"
						name="text"></textarea>
				</div>

			</div>
			 -->
			








               <!-- CONDIZIONI PRIVACY CHECKBOX AND CONFERMA CREAZIONE BUTTON-->
               
               
               
               <div class="form-check col-12 d-n " id="last_step">
               <div>
            <input type="checkbox" class="form-check-input" id="privacy">
            <label class="form-check-label" for="same-address" onclick="prova()">Shipping address is the same as my billing address</label>
            </div>
           <div class="d-flex ">
				 <button class="btn btn-light mx-auto" disabled   id="confirm_btn" type="submit">Fine </button>
				
				</div>
          </div>
          
            <!-- TASTI AVANTI E INDIETRO -->
          <div class="col-md-12">

			<div class="d-flex justify-content-around">

				<div  >
					<button class="btn btn-outline-secondary float-start "
						type="button" onclick="prev()" id="btn_prev">
						<span><i class="fa fa-angle-left" aria-hidden="true"></i></span> <span
							class="sr-only">Previous</span>
					</button>
				</div>
				
				
				<div >
					<button class="btn btn-outline-secondary float-end" type="button"
						onclick="next()" id="btn_next">
						<span><i class="fa fa-angle-right" aria-hidden="true"></i></span>
						<span class="sr-only">Next</span>
					</button>
				</div>

			</div>


		</div>
			
			<!-- END ROW -->
			
          </div>
		</form>


     
		


	</div>
	
	<!-- end FORM -->
	

	
<!-- FOOTER -->
	<jsp:include page="footer.jsp" />


	
	<!-- Bootstrap -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>
		
	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>

	
		
	<!--Slick -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>
	

	
	
		<script type="text/javascript" src="../js/nuovoEvento.js"
		crossorigin="anonymous">
		
         </script>
     
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">
	

</body>
</html>

