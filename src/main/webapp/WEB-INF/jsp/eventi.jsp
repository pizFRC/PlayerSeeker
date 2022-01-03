<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">

<title>Player Seeker -Eventi</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"
			  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
			  crossorigin="anonymous"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script><!-- Bootstrap CSS -->
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
	crossorigin="anonymous">

<!-- Custom CSS -->
<link href="css/style.css" rel="stylesheet" type="text/css">

<!--Bootstrap Icon -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>

<!-- Font -->

<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link
	href="https://fonts.googleapis.com/css?family=Open+Sans|Raleway:300,400"
	rel="stylesheet">
</head>
<body onload="loadJSONEventsFromRestController()">
<!-----------HEADER --------->
	<header
		class="d-flex fixed-top navbar-light bg-light flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
		<div class="container d-flex justify-content-between row">
			<a href="/"
				class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
				<img rel="icon" width="150" height="50" src="img/logo.png"
				type="image/x-icon" />
			</a>
   
			<ul class="nav col-sm-12 col-md-7 mb-2 justify-content-center mb-md-0"   id="menu_items">
				<li class="raleway_font"><a href="#"
					class="nav-link px-2 link-secondary ">Home</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Eventi</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Strutture</a></li>
				<li><a href="#" class="nav-link px-2 link-dark">Contattaci</a></li>
			</ul>
			<div class="col-md-2 text-end  " id="login_div">
		
				<a type="button" class="btn btn-outline-primary me-2" href="login">Accedi</a>
				
			</div>
			
			</div>
	</header>
	<!-----------END HEADER --------->
	
	
	
<section class="intro">
  <div class="bg-image h-100" >
    <div class="mask d-flex align-items-center h-100" style="background-color: white;">
        
        
        <!--  -->
        <div class="container">
        <p class="display-4 font-weight-bold mb-5 text-dark">Scogli gli eventi della tua città</p>
        <div class="card">
          <div class="card-body">
            <div class="row justify-content-center">
              <div class="col-md-6 mb-3 mb-md-0">
                <div id="basic" class="form-outline">
                <label class="form-label autocomplete-label" for="form1" style="margin-left: 0px;">Cerca qui la tua città</label>
                
                  <input type="text" id="form1" class="form-control form-control-lg autocomplete-input" role="combobox" placeholder="Cerca qui la tua città" aria-expanded="false" aria-owns="autocomplete-dropdown-138001" aria-haspoup="true" autocomplete="off">
                <div class="form-notch"><div class="form-notch-leading" style="width: 9px;"></div><div class="form-notch-middle" style="width: 170.4px;"></div><div class="form-notch-trailing"></div></div></div>
              </div>
              
          
								<div class="col-md-4 mb-3 mb-md-0">
								
							                 
							 <label for="browser" class="form-label">Scegli uno sport</label>
  <select class="form-select form-select-lg">
     <option selected>Tutti gli sport</option>
     <option>Calcio</option>
     
  <option value="fa-apple"> fa-apple</option>
     <option>4</option>
   </select>
  


								</div>
 

								<div class="col-md-2">
								  <label >  </label>
              <button class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3 h-75" type="submit">
          <span><i class="fa fa-search" aria-hidden="true"></i></span> <span
						class="sr-only">Google</span>
          </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        
        <!--  -->
    </div>
  </div>
</section>


<section class="container" style="background-color:white">
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
	<script type="text/javascript"  src="../js/eventi.js"  crossorigin="anonymous"> </script>

</body>
</html>