<html>
<head>
       <link rel="stylesheet" type="text/css" href="blog.css">

</head>



<body>

                                 <!--HEADER-->
<div class="header"> 
      <img src="logo.jpeg" alt="logo goes here">
</div>


                                 <!--NAVIGATION BAR-->
<div class="navBar">
     
<ul>
     <li> <a href="home.php">Home</a> </li>
     <li> <a href="articles.php">Contact Us</a> </li>
     <li class="dropdown"> <a href="javascript:void(0)">Dropdown</a>
                           <div class="dropContent">  <a href="">Link 1</a>
                                  <a href="">Link 2</a>
                           </div>     </li>
     <li class="subscriptionTab">
            <button id="subBtn" class="subPop">Subsribe</button>
     </li>
</ul>

</div>


                                 <!--MAIN SECTION-->
<div class="leftPanel">
     <p> blank </p>
</div>

<div class="main">
     <p> articles </p>
</div>

<div class="rightPanel">
     <p> ? </p>
</div>


<div id="subBox" class="subscriptionBox">

  <div class="subscriptionForm">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>


                                  <!--JAVASCRIPT POP UP-->
<script>

   var subBox = document.getElementById('subBox');
   var btn = document.getElementById("subBtn");
   var span = document.getElementsByClassName("close")[0];

   subBox.style.display = "none";

   btn.onclick = function() {
         subBox.style.display = "block";
   }
   span.onclick = function() {
         subBox.style.display = "none";
   }
   window.onclick = function(event) {
         if (event.target == subBox) {
                subBox.style.display = "none";
         }
   }

</script>

</body>
</html>