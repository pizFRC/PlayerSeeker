/**
 * $(document).ready(function(){
  $("#btn_registrati").click(function(){
    $("#btn_accedi").hide(1000);
     addSelectAccountType();
  });
});
 */

let lastViewPressed="list";


$(document).ready(function(){   $(document).on('click','#btn_list',function(e){
	e.preventDefault();
if(	 lastViewPressed==="list")
       return;
   lastViewPressed="list";
 document.querySelectorAll(".item").forEach(element => element.className="item col-12 col-xxl-12  col-md-12 col-sm-12 col-lg-12 col-xl-12 mx-auto m-1 pb-1");
});
});

   
   $(document).ready(function(){  

window.addEventListener("resize", function(){
	var  larghezza=  $(window).width();


if(larghezza<=991 ){
    $(".tasti_da_nascondere").hide(1000);
if(lastViewPressed==="grid")
lastViewPressed="list";

 document.querySelectorAll(".item").forEach(element => console.log(element.className="col-sm-12 col-md-12 col-lg-12 col-xl-12  mx-auto m-1 pb-1"));

}else if( larghezza >991){
 $(".tasti_da_nascondere").show(1000);
      
	

	       if(larghezza>991 && larghezza <=1199 ){
		     
		  //$(".tasti_da_nascondere").show(1000);
                  document.querySelectorAll(".item").forEach(element => console.log(element.className="item  col-md-6 col-sm-12 col-lg-6  col-xl-4 col-xxl-4  mx-auto m-1 pb-1"));
	if(lastViewPressed==="list")
lastViewPressed="grid";
           }else{
	 // $(".tasti_da_nascondere").show(1000);

	      document.querySelectorAll(".item").forEach(element =>element.className="item col-4 col-md-6 col-lg-4  col-xl-4 col-xxl-4 mx-auto m-1 pb-1");
if(lastViewPressed==="list")
lastViewPressed="grid";
           }



}

});

});












 $(document).ready(function(){  



//cambio le classi dei div che contengono le card
$("#btn_grid").click(function(){
alert("pressed");
var lar=  $(window).width();

console.log(lar + lastViewPressed);
if(lar <=991 && lastViewPressed==="list" ){
	
	return;
  }else {
	
		 lastViewPressed="grid";
 document.querySelectorAll(".item").forEach(element => console.log(element.className="item col-md-6 col-sm-12 col-xxl-4 col-xl-4 col-lg-4 mx-auto m-1 pb-1"));
	
}

});

});
