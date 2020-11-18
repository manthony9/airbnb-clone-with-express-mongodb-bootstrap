function validateForm() {
    var x = document.forms["myForm"]["uname"].value;
    if (x == "") {
      alert("Username must be filled out");
      return false;
    }

    var y = document.forms["myForm"]["psw"].value;
    if (y == "") {
        alert("Password must be filled out");
        return false;
    }

     
  }
