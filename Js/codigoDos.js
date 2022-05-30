//Tomo control del div contenedor de cards
let pastEvents = document.getElementById("articlesPast");

//Declaro una variable con la informacion de data.eventos
let dataInfo;
let fechaActual;
let getData;

/* ------------------------------------------------------------------------------------------------------------------------------------------ */

async function getDataInfo(){
  await fetch("https://amazing-events.herokuapp.com/api/events")
  .then(response => response.json())
  .then(json => getData = json)


  fechaActual = getData.currentDate;
  dataInfo = getData.events;


  return[fechaActual, dataInfo]
}
getData = await getDataInfo()


fechaActual = getData[0]
dataInfo = getData[1]



//MOSTRAR CHECKBOX

function showCheckbox() {
  //Guardo en variable el contenedor de categorias
  let categories = document.getElementById("categories");
  //Guardo en variable el array mapeado de dataInfo por categorias
  let checkboxContainer = dataInfo.map(e => e.category);
  //Con el metodo set quito los indices con categorias iguales
  let checkbox = new Set(checkboxContainer);
  //Declaro mediante variable al set como un ARRAY
  let finalCheckbox = Array.from(checkbox)
  console.log(finalCheckbox)

  for (let i = 0; i < finalCheckbox.length; i++) {

    let category = finalCheckbox[i]; //almaceno el evento
    let checkbox = document.createElement('div');
    checkbox.innerHTML = `
  <input type="checkbox" id="${category}" value="${category}" name="schl">
  <label for="${category}" >${category}</label>
  `
    //Imprimo los checkbox en categories
    categories.appendChild(checkbox)
  }
}

showCheckbox();

var clickCheckbox = []
var textSearch = ""

//Escucho cada uno de los checkbox creados
var checkbox = document.querySelectorAll('input[type=checkbox]') //los almaceno en una variable "checkbox"

checkbox.forEach(check => check.addEventListener("click", (event) => {
  var checked = event.target.checked

  if (checked) { //Verifico si el checkbox se encuentra tildado o no
    clickCheckbox.push(event.target.value) //Si esta tildado lo pusheo al array vacio "clickCeckbox"
    filterArray() //ejecuto filterArray con los valores tomados
    console.log(clickCheckbox);
  } else {
    clickCheckbox = clickCheckbox.filter(uncheck => uncheck !== event.target.value) //Quito el array sin tildar
    filterArray() //ejecuto filterArray
  }
}))

let search = document.getElementById("searchPast")
search.addEventListener("keyup", (event) => {
  textSearch = event.target.value
  filterArray()
})

function filterArray() {
  let data = []
  if (clickCheckbox.length > 0 && textSearch !== "") {
    clickCheckbox.map(category => {
      data.push(...dataInfo.filter(e => e.name.toLowerCase().includes(textSearch.trim().toLowerCase()) &&
        e.category == category))
    })
  } else if (clickCheckbox.length > 0 && textSearch === "") {
    clickCheckbox.map(category => data.push(...dataInfo.filter(e => e.category == category)))
  } else if (clickCheckbox.length == 0 && textSearch !== "") {
    data.push(...dataInfo.filter(e => e.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
  } else {
    data.push(...dataInfo)
  }
  showCards(data)
}
filterArray()


//MOSTRAR CARTAS

function showCards(data) {
  //Vacio el contenedor padre
  pastEvents.innerHTML="";
  if(data.length !== 0){

    data.forEach(e => {
      console.log(e.date);
      if (fechaActual > e.date) //Comparo la fecha actual con la fecha y si es mayor a la del envento imprimo
      {
        var id = 1
        dataInfo.map(e => e.id = id++)
        console.log(dataInfo)
        let cardsEventos = document.createElement('div');
         //creo el div todas las veces que el loop funcione (.lenght)
        cardsEventos.classList.add("col", "d-flex", "justify-content-center"); //A mi div creado le agrego las clases de bootstrap
    
        cardsEventos.innerHTML = `
      
      <div class="card" >
        <img src=${e.image} style="height: 215px;" class="card-img-top" alt="img">
        <div class="card-body ">
          <h5 class="card-title d-flex justify-content-center">${e.name}</h5>
          <p class="card-text d-flex justify-content-center">${e.description}</p>
          <p class="card-text d-flex justify-content-center">${e.date}</p>
        </div>
        <ul class="list-group list-group-flush ">
          <li class="list-group-item d-flex justify-content-center">Price: U$D ${e.price}</li>
        </ul>
        <div class="card-body">
          <a href="./card.html?id=${e.id}" class="card-link d-flex justify-content-center">See more</a>
        </div>
      </div>
    
      `  
        //Imprimo en articlesPast el cardsEventos
        pastEvents.appendChild(cardsEventos)
  
      }
      
    })
  } else {
    let cardsEventos = document.createElement('div');
    cardsEventos.classList.add("col", "d-flex", "justify-content-center");
    cardsEventos.innerHTML = `<img class="container" style="width:55%" src="https://cdn-icons-png.flaticon.com/512/6178/6178994.png"/>`
    pastEvents.appendChild(cardsEventos)
  }
}
