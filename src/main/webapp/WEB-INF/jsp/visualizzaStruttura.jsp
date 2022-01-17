<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<html lang="it">
<head>
<meta charset="utf-8">

<meta name="viewport"
	content="initial-scale=1,maximum-scale=1,user-scalable=no">
<link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
	rel="stylesheet">
<link rel="stylesheet"
	href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
	integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
	crossorigin="anonymous">
<script src="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<style>
{
list-style:none;
color:black;
}
/* The Modal (background) */
/* The Modal (background) */
.modal {
	display: none; /* Hidden by default */
	position: fixed; /* Stay in place */
	z-index: 1; /* Sit on top */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.sito_web {
	text-decoration: none;
}
/* Modal Content/Box */
.modal-content {
	background-color: #fefefe;
	margin: 15% auto; /* 15% from the top and centered */
	padding: 20px;
	border: 1px solid #888;
	width: 80%; /* Could be more or less, depending on screen size */
}

a.sito_web {
	margin-left: 4px!impotant;
	
}

/* The Close Button */
.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover, .close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}

body {
	margin: 0;
	padding: 0;
}

#form {
	position: relative;
	z-index: 1; /* The z-index should be higher than Google Maps */
	margin-right: 72%;
	width:40%;
	background: white;
	height: 85%;
	overflow-x:hidden;
	overflow-y:auto;
	/* Set the opacity for a slightly transparent Google Form */
	color: black;
}

#contents {
	position: absolute;
	z-index: 2; /* The z-index should be higher than Google Maps */
}

#map {
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
	/* Set z-index to 0 as it will be on a layer below the contact form */
}



@media screen and (max-width:800px){

#form{
min-width: 70%;


}
}
</style>
<jsp:include page="head.jsp" />
<link rel="stylesheet"
	href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.css"
	type="text/css">
<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css'
	rel='stylesheet' />
<title>Player Seeker</title>
</head>

<body>
	<!-- HEADER --->
	<jsp:include page="header.jsp" />


	<div id="map"></div>
	<div class=" d-inline-flex p-2 bd-highlight shadow-lg ms-5 rounded"
		align="left" id="form">
		<div class="row" style="min-width:40%;">
			<div id="carouselExampleControls" class="carousel slide col-12"
				data-bs-ride="carousel">
				<div class="carousel-inner">
					<div class="carousel-item active">
						<img src="../img/logo.png" class="d-block w-100" alt="...">
					</div>
					<div class="carousel-item">
						<img src="../img/logo.png" class="d-block w-100" alt="...">
					</div>
					<div class="carousel-item">
						<img src="../img/logo.png" class="d-block w-100" alt="...">
					</div>
				</div>
				<button class="carousel-control-prev" type="button"
					data-bs-target="#carouselExampleControls" data-bs-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Precedente</span>
				</button>
				<button class="carousel-control-next" type="button"
					data-bs-target="#carouselExampleControls" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Prossimo</span>
				</button>
			</div>
			<%String nome_struttura="JOGA BONITO"; //da sostituire con nome struttura%>
			<div class="col-12 border-bottom">
				<div class="alert alert-light" role="alert">
					<h4><%= nome_struttura %></h4>
				</div>
			</div>
			<%String[] campi_struttura={"PRIMO CAMPO DA CALCIO", "SECONDO CAMPO DA CALCIO","PRIMO CAMPO DA TENNIS", "SECONDO CAMPO DA CALCIO", "SECONDO CAMPO DA CALCIO", "SECONDO CAMPO DA CALCIO", "SECONDO CAMPO DA CALCIO", "SECONDO CAMPO DA CALCIO", "SECONDO CAMPO DA CALCIO", "SECONDO CAMPO DA CALCIO", "SECONDO CAMPO DA CALCIO"};//da sostituire LISTA CAMPI DELLA STRUTTURA%>
			<div class="col-12 border-bottom">
				<div class="row">
					<div class="col">
						<ul>
							<% for(int i=0;i<campi_struttura.length;i++)
						{
							if(i%2==0)
							{
								%>
							<li style="list-style: none;"><i class="bi bi-check"
								style="font-size: 1.5rem;"></i><%= campi_struttura[i]%></li>

							<%}}
						%>
						</ul>
					</div>
					<div class="col">
						<ul>
							<% for(int i=0;i<campi_struttura.length;i++)
						{
							if(i%2==1)
							{
								%>
							<li style="list-style: none;"><i class="bi bi-check"
								style="font-size: 1.5rem;"></i><%= campi_struttura[i]%></li>

							<%}}
						%>
						</ul>
					</div>
				</div>
			</div>
			<%double lat=16.248828;
			double longi=39.3301343;//da sostituire con nome struttura%>
			<input type="number" hidden value="<%=lat=16.248828%>" id="lat">
			<input type="number" hidden value="<%=lat=39.3301343%>" id="long">
			<div class="col-12 border-bottom">
				<a id="indirizzo"><i class="bi bi-geo-alt"
					style="font-size: 2rem;" id="icon"></i> indriizzo</a>

			</div>
			<br>
			<div class="col-12 border-bottom" id="orario">
				<a><i class="bi bi-stopwatch" style="font-size: 2rem;"></i>
					Orario Di Apertura<i class="bi bi-arrow-right-circle" id="myBtn"
					style="font-size: 1rem;"></i></a>
				<!-- Trigger/Open The Modal -->
				<!-- Trigger/Open The Modal -->

				<!-- The Modal -->
				<div id="myModal" class="modal" tabindex="-1" role="dialog"
					aria-labelledby="exampleModalLongTitle" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<!-- Modal content -->
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLongTitle">Orario
									di apertura</h5>
								<span class="close" aria-hidden="true">&times;</span>
							</div>
							<div class="modal-body">
								<table class="table">
									<thead>
										<tr>
											<th scope="col">Giorno</th>
											<th scope="col">Orario di lavoro</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">Lunedì</th>
											<td>14.00-22.00</td>
										</tr>
										<tr>
											<th scope="row">Martedì</th>
											<td>14.00-22.00</td>
										</tr>
										<tr>
											<th scope="row">Mercoledì</th>
											<td>14.00-22.00</td>
										</tr>

										<tr>
											<th scope="row">Giovedì</th>
											<td>14.00-22.00</td>
										</tr>
										<tr>
											<th scope="row">Venerdì</th>
											<td>14.00-22.00</td>
										</tr>
										<tr>
											<th scope="row">Sabato</th>
											<td>14.00-20.00</td>
										</tr>
										<tr>
											<th scope="row">Domenica</th>
											<td>18.00-22.00</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>

				</div>

			</div>
			<br>
			<%String telefono="+39 347 8742 173"; //da sostituire con telefono%>
			<div class="col-12 border-bottom">
				<a id="myInput"><i class="bi bi-telephone"
					style="font-size: 2rem;"></i> <%= telefono %> </a>
			</div>
			<br>
			<%String web="https://www.facebook.com/jogabonitoarcavacatcalcioa5/"; //da sostituire con telefono%>
			<div class="col-12 border-bottom">
				<i class="bi bi-globe2 col-1" style="font-size: 2rem;"></i> <a
					class="ms-2 col-11 text-break sito_web" href="<%=web %>" target="_blank"> <%=web %>
				</a>
			</div>

			<div class="col-12">
				<!-- FOOTER -->
				<jsp:include page="footer.jsp" />
			</div>
		</div>
	</div>

	<!-- CDN -->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
		integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
		crossorigin="anonymous"></script>

	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script type="text/javascript" src="../js/visualizzaStruttura.js"
		crossorigin="anonymous">
		
	</script>
	<script src='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'></script>
	<script
		src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.7.2/mapbox-gl-geocoder.min.js"></script>

	<link href="css/style.css" rel="stylesheet" type="text/css">
</body>
</html>

