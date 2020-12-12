function myFunction1() {

    var x = document.getElementById("theOne");
    var y = document.getElementById("theTwo");
    var z = document.getElementById("theThree");
 
    if (y.style.display === "none"){
 
     x.style.display = "block";
     z.style.display = "none"
 
    } else {
 
     x.style.display = "block";
     z.style.display = "none";
     y.style.display = "none";   
 
    }
 
 
 }



function myFunction2() {

   var x = document.getElementById("theOne");
   var y = document.getElementById("theTwo");
   var z = document.getElementById("theThree");

   if (x.style.display === "none"){

    y.style.display = "block";
    z.style.display = "none"

   } else {

    x.style.display = "none";
    z.style.display = "none";
    y.style.display = "block";

   }


}


function myFunction3() {

    var x = document.getElementById("theOne");
    var y = document.getElementById("theTwo");
    var z = document.getElementById("theThree");
 
    if (y.style.display === "none"){
 
     z.style.display = "block";
     x.style.display = "none"

 
    } else {
 
     x.style.display = "none";
     z.style.display = "block";
     y.style.display = "none";
 
    }
 
 
 }