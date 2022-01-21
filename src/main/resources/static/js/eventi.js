$(document).ready(function(){
  	mapboxgl.accessToken = 'pk.eyJ1IjoiZ3ZuYmVyYWxkaSIsImEiOiJja3kwMTY1cjQydXVtMnZvMHI3N3B6Y2piIn0.BVrI0Ru6h55mmhivqa-39Q';
	const addressGeocoder = new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		placeholder: 'Città, Via, Numero Civico',
	});
	addressGeocoder.addTo("#address");
	addressGeocoder.on('result', function(e) {
		console.log(e.result);
	});
});

let lastViewPressed="list";

//Visualizzazione lista
$(document).on('click', '#btn_list', function(e) {
	e.preventDefault();
	if (lastViewPressed === "list")
		return;
	lastViewPressed = "list";
	document.querySelectorAll(".item").forEach(element => element.className = "item col-12 col-xxl-12  col-md-12 col-sm-12 col-lg-12 col-xl-12 mx-auto m-1 pb-1");
});

//Vista lista se largezza <= 991
window.addEventListener("resize", function() {
	var larghezza = $(window).width();
	if (larghezza <= 991) {
		$(".tasti_da_nascondere").hide(1000);
		document.querySelectorAll(".item").forEach(element => element.className  = "item col-sm-12 col-md-12 col-lg-12 col-xl-12  mx-auto m-1 pb-1");
		lastViewPressed  = "list";
	}
	else {
		$(".tasti_da_nascondere").show(1000);
		if ((larghezza > 991 && larghezza <= 1199) && lastViewPressed === "grid") {
			//$(".tasti_da_nascondere").show(1000);
			document.querySelectorAll(".item").forEach(element => element.className = "item  col-md-6 col-sm-12 col-lg-6  col-xl-4 col-xxl-4  mx-auto m-1 pb-1");
		} else {
			// $(".tasti_da_nascondere").show(1000);
			if (lastViewPressed === "grid")
				document.querySelectorAll(".item").forEach(element => element.className = "item col-4 col-md-6 col-lg-4  col-xl-4 col-xxl-4 mx-auto m-1 pb-1");
		}
	}
});

//Vista griglia
$("#btn_grid").click(function() {
	var larghezza= $(window).width();
	if (larghezza <= 991) {
		return;
	}
	else {
		if ((larghezza > 991 && larghezza <= 1199) && lastViewPressed=== "grid" ){
			document.querySelectorAll(".item").forEach(element => element.className="item  col-md-6 col-sm-12 col-lg-6  col-xl-4 col-xxl-4  mx-auto m-1 pb-1");
		} 
		else if(lastViewPressed === "list"){
			document.querySelectorAll(".item").forEach(element => element.className = "item col-4 col-md-6 col-lg-4  col-xl-4 col-xxl-4 mx-auto m-1 pb-1");
          }
		lastViewPressed="grid";
	}
});

