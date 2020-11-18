var a = document.querySelector('#section1');
var b = a.querySelector('#book');
var c = a.querySelector('#booking');

b.onclick = function(){

    if (c.style.display !== 'none') {

        c.style.display = 'none';

    } else {
        
        c.style.display = 'block';
    }
  

}

