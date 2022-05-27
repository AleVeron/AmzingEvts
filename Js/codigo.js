//Tomo control del div contenedor de cards
let index = document.getElementById("articlesIndex");

//Declaro una variable con la informacion de data.eventos
let dataInfo = data.eventos;

/* ------------------------------------------------------------------------------------------------------------------------------------------ */

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

  finalCheckbox.forEach(categorias => {
    let checkbox = document.createElement('div');
    checkbox.innerHTML = `
  <input type="checkbox" id="${categorias}" value="${categorias}" name="schl">
  <label for="${categorias}">${categorias}</label>
  `
    //Imprimo los checkbox en categories
    categories.appendChild(checkbox)
  })
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
  } else {
    clickCheckbox = clickCheckbox.filter(uncheck => uncheck !== event.target.value) //Quito el array sin tildar
    filterArray() //ejecuto filterArray

  }
}))

let search = document.getElementById("search")
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

function showCards(data) {

  var templateHtml = ""

  for (var i = 0; i < data.length; i++) {
    var id = 1
    dataInfo.map(e => e.id = id++)
    console.log(dataInfo)
    let e = data[i];
    templateHtml += `
      <div class="col d-flex justify-content-center">
      <div class="card">
      <img src=${e.image} class="card-img-top" alt="img" style="height: 215px;">
      <div class="card-body ">
        <h5 class="card-title d-flex justify-content-center">${e.name}</h5>
        <p class="card-text d-flex justify-content-center">${e.description}</p>
        <p class="card-text d-flex justify-content-center">${e.date}</p>
      </div>
      <ul class="list-group list-group-flush ">
        <li class="list-group-item d-flex justify-content-center">Price: U$D ${e.price}</li>
      </ul>
      <div class="card-body">
        <a href="./Html/card.html?id=${e.id}" class="card-link d-flex justify-content-center">See more</a>
      </div>
    </div>
    </div>    
      `
  }
  document.querySelector('#articlesIndex').innerHTML = templateHtml;
}