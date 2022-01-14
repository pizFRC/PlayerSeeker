<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>



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
<div class="container  shadow-lg bg-body bg-dark rounded p-5" id="form_creazione_evento">

		<div class=" needs-validation container w-75 mx-auto row" novalidate>
            <div class="col-md-12">
            
            <h1 class="h1">Seleziona uno sport per l'evento da creare</h1>
            
            </div>
            <div id="first_step" >
            <div class="carousel d-flex m-4 mt-3" >
              
            
            </div>
			</div>
			
				<div class="col-md-12 mb-3 d-n " id="second_step">
				<div class="row">
					<div class="col">
					<label class="form-label" for="data">Data</label>
						<input type="date" class="form-control"  id="data"	name="date">
					</div>
					<div class="col">
					<label class="form-label" for="time">Ora</label>
						<input type="time" class="form-control" id="time" name="time">
					</div>
					</div>
				</div>
			
			<div class="col-md-12 mb-5 d-n"   id="third_step"> 
			 
			<h1> Seleziona una struttura</h1>
			
			
			
			
		
          	<div class="container  border border-2 rounded"   id="map">
			</div>

				
				
               
                </div>

          	<div class="col-md-12 mb-3 d-n " id="upload_file">
					
						<label class="form-label" for="uploadImage">Upload</label>
						<select>
						<option></option>
						
						
						
						</select>
					
				</div>


			<div class="col-md-12 mb-3  d-n"  id="four_step">
			
				<label class="form-label" for="num_giocatori">Numero giocatori mancati</label>
				<div class="input-group mb-3">
					<input type="text" class="form-control" id="num_giocatori"
						placeholder="" aria-label="" aria-describedby="button-addon2"
						disabled pattern="[0-9]+">
					<button class="btn btn-outline-secondary" type="button" onclick="addInputNameGiocatore()" id="button-addon2">
						<span><i class="fa fa-plus" aria-hidden="true"></i></span> 
						<span class="sr-only">Previous</span>
					</button>

				</div>

				<div id="set_giocatori" class="container-fluid">
				</div>
			 </div>

			<div class="col-md-12 mb-3 d-n " id="upload_file">
					
						<label class="form-label" for="uploadImage">Upload</label>
						<input type="file" class="form-control" id="uploadImage">
					
				</div>
			


				
			
			
				<div class="container mt-4  d-n "  id="comment_step">
					
				
				
						<div class="container mb-3 mt-3">
							<label for="comment">Inserisci un promemoria per l'evento:</label>
							<textarea class="form-control w-75" rows="5" id="comment" name="text"></textarea>
						</div>
						
					
				</div>
				
				
				<div class="form-group col-md-12  d-n "  id="last_step">
				<div class="form-check">
					<input class="form-check-input" type="checkbox" value=""
						id="invalidCheck" required> <label
						class="form-check-label" for="invalidCheck"> Agree to
						terms and conditions </label>
					<div class="invalid-feedback">You must agree before
						submitting.</div>
				</div>
				<button class="btn btn-primary" type="submit">Submit form</button>
			</div>
				
			</div>
		
          
      <div class="col-md-12">
            
            <div class="row">
            
            <div class="col-md-6">
            <button class="btn btn-outline-secondary float-start " type="button" onclick="prev()" id="btn_prev">
						<span><i class="fa fa-angle-left" aria-hidden="true"></i></span> 
						<span class="sr-only">Previous</span>
					</button>
				</div>
				 <div class="col-md-6 ">	
					<button class="btn btn-outline-secondary float-end" type="button" onclick="next()" id="btn_next">
						<span><i class="fa fa-angle-right" aria-hidden="true"></i></span> 
						<span class="sr-only">Next</span>
					</button>
					</div>
            
            </div>
	</div>
	
	
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
	
	
		
	<!--Slick -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js"></script>
	

	
	
		<script type="text/javascript" src="../js/nuovoEvento.js"
		crossorigin="anonymous">
		
         </script>
     
<script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>
<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css" type="text/css">
	

</body>
</html>

