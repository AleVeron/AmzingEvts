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


function getDataCard() {//la funcion getData es la encargada de recolectar el dato de nuestro archivo json, esta declarada asincrona (async), para poder determinarle el metodo await
    var idEvent = 1
    dataInfo.map(e =>e.id = idEvent++)
    var id = location.search.split("?id=").filter(Number)
    console.log(location)
    console.log(location.search)
    console.log(id)
    var selectedId = Number(id[0])
    console.log(selectedId)
    var event = dataInfo.find((e) =>{
        return e.id == selectedId       
    })
    console.log(event)
    var templateHtml = `    
    <div class="card justify-content-center align-items-center cardUno">
    <div class="row g-0 ">
      <div class="col-md-6 p-2 d-flex justify-content-center">
        <img src="${event.image}" class="img-fluid imgCard p-1" alt="img">
      </div>
      <div class="col-md-6 p-2 d-flex align-items-center justify-content-center">
        <div class="card-body cardDos d-flex justify-content-center align-items-center flex-column">
          <h5 class="card-title">${event.name}</h5>
          <p class="card-text d-flex text-center">Description: ${event.description}</p>
          <p class="card-text">Capacity: ${event.capacity}</p>
          <p class="card-text">Place: ${event.place}</p>
          <p class="card-text">Price: U$D ${event.price}</p>
        </div>
      </div>
    </div>
  </div>
    `
    document.querySelector('#bigCard').innerHTML = templateHtml
}

getDataCard()//Inicializo getData