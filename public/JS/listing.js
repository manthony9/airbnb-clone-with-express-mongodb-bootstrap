

const cards = [
{
    name: 'Entire Apartment * Lisbon',
    ppN: "$15 CAD/Per Night",
    desc: "Chiado Loft 7 with Patio!",
    image: "",
    id:"one"
},

{
    name: 'Entire Apartment * Lisboa',
    ppN: "$15 CAD/Per Night",
    desc: "Chiado Loft 7 with Patio!",
    image: "./images/Logo.png",
    id:"two"
},

{
    name: 'Entire Apartment * Lisbon',
    ppN: "$15 CAD/Per Night",
    desc: "Chiado Loft 7 with Patio!",
    image: "./images/Logo.png",
    id:"three"
},


{
    name: 'Entire Apartment * New York',
    ppN: "$15 CAD/Per Night",
    desc: "Chiado Loft 7 with Patio!",
    image: "./images/Logo.png",
    id:"four"
},


{
    name: 'Entire Apartment * London',
    ppN: "$15 CAD/Per Night",
    desc: "Chiado Loft 7 with Patio!",
    image: "./images/Logo.png",
    id:"five"
},

{
    name: 'Entire Apartment * Toronto',
    ppN: "$15 CAD/Per Night",
    desc: "Chiado Loft 7 with Patio!",
    image: "./images/Logo.png",
    id:"six"
}

]




var a = document.querySelector('#section2');
var b = document.createElement('div');
b.id = 'wrapper';




// b.innerHTML = cards.map(el =>
    
   
//     `<div id = ${el.id}><h1>${el.name}</h1><img width="100" height="200" src="/public/images/Logo.png"><h1>${el.ppN}</h1></div>`
    
// ).join(' ') ;

b.innerHTML = cards.map(function(el){

    if(el.id === "one"){

        return  `<div id = ${el.id}><img id="room1" width="500" height="300" src="images/room1.jpg"><h3>${el.name}</h3><h1>${el.desc}</h1><h3>${el.ppN}</h3><button id="book">Book</button></div>`;

    } else if (el.id === "two") {

        return `<div id = ${el.id}><img id="room1" width="500" height="300" src="images/room2.jpg"><h3>${el.name}</h3><h1>${el.desc}</h1><h3>${el.ppN}</h3><button id="book">Book</button></div>`;

    } else if (el.id === "three") {
        
        return `<div id = ${el.id}><img id="room1" width="500" height="300" src="images/room3.jpg"><h3>${el.name}</h3><h1>${el.desc}</h1><h3>${el.ppN}</h3><button id="book">Book</button></div>`;    

    } else if (el.id === "four") {

        return `<div id = ${el.id}><img id="room1" width="500" height="300" src="images/room4.jpg"><h3>${el.name}</h3><h1>${el.desc}</h1><h3>${el.ppN}</h3><button id="book">Book</button></div>`;

    } else if (el.id === "five") {

        return `<div id = ${el.id}><img id="room1" width="500" height="300" src="images/room5.jpg"><h3>${el.name}</h3><h1>${el.desc}</h1><h3>${el.ppN}</h3><button id="book">Book</button></div>`;

    } else if (el.id === "six") {

        return `<div id = ${el.id}><img id="room1" width="500" height="300" src="images/room6.webp"><h3>${el.name}</h3><h1>${el.desc}</h1><h3>${el.ppN}</h3><button id="book">Book</button></div>`;
    }


}).join(' ');

a.appendChild(b);





