//Declaro las variables con la informacion de data.eventos
let dataInfo;
let getData;
let dataInfoPast;
let dataInfoUpcoming;

/* ------------------------------------------------------------------------------------------------------------------------------------------ */

async function getDataInfo() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(json => getData = json)

  dataInfo = getData.events; //Eventos
  console.log(getData)


  let dataInfoPast = dataInfo.filter(e => e.assistance) //Info past obtengo los eventos pasados
  dataInfoPast.map(e => { //Mediante el map le agrego la categoria percentage
    var percentage = ((e.assistance / e.capacity) * 100).toFixed(2);
    e.percentage = percentage;
    console.log(e.percentage);
  })

  let dataInfoUpcoming = dataInfo.filter(e => e.estimate) //Filtro los eventos futuros
  console.log(dataInfoUpcoming);

  console.log(dataInfoPast);

  return [dataInfoPast, dataInfoUpcoming] //Retorno con la funcion 2 arrays, uno de eventos pasados y otro futuros
}

getData = await getDataInfo()

dataInfoPast = getData[0]; //Declaro a infoPast con la posicion 0 del array getData
dataInfoUpcoming = getData[1]; //Declaro a infoUpcoming con la posicion 1 del array getData
console.log(dataInfoUpcoming);
console.log(getData);
console.log(dataInfoPast);


//UPCOMING EVENTS

/* Ordeno de mayor a menor array de upcomingEvents segun porcentaje */

let eSortPercentage = dataInfoPast.sort((a, b) => b.percentage - a.percentage)
console.log(eSortPercentage);

/* Ordeno de mayor a menor eventos pasados segun su capacidad */

let eSortCapacity = dataInfoPast.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)
//Filtro solo las capacidades y a esas las ordeno de mayor a menor
console.log(eSortCapacity);

//Imprimo tablas

function getTablesOne(per, cap) {

  var templateHtml = `    
  <table class="table">
  <thead>
    <tr>
      <th colspan="4">Event Statistics</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Events with the highest percentage of attendance:</td>
      <td>Events with the lowest percentage of attendance:</td>
      <td>Event with larger capacity:</td>
    </tr>
    <tr>
      <td>${per[0].name}: ${per[0].percentage}100%</td>
      <td>${per[per.length - 1].name}: ${per[per.length - 1].percentage}</td>                  
      <td>${cap[0].name}: ${cap[0].capacity}</td>
    </tr>
  </tbody>
</table>
  `
  document.querySelector('#tablas').innerHTML = templateHtml
}

getTablesOne(eSortPercentage, eSortCapacity)


//EVENTOS FUTUROS

const categoryAssistFuture = dataInfoUpcoming.map(eventos => eventos.category)
const categorySetFuture = new Set(categoryAssistFuture)
const categorysFuture = [...categorySetFuture]
console.log(categorysFuture)

const categoryValueFuture = [] //Creamos un Array que contiene 1 objeto con 2 propiedades
categorysFuture.map(category =>
  categoryValueFuture.push({
    category: category,
    evento: dataInfoUpcoming.filter(evento => evento.category === category), //Ahora tenemos las categorias que tienen adentro todos los eventos pasados
  }))
console.log(categoryValueFuture)

let estimateAndCapacityFuture = [] // De la varible anterior mapeamos en un nuevo array,
categoryValueFuture.map(datos => {
  estimateAndCapacityFuture.push({
    category: datos.category,
    estimate: datos.evento.map(item => item.estimate),
    capacity: datos.evento.map(item => item.capacity),
    estimateRevenue: datos.evento.map(item => item.estimate * item.price)
  })
})
console.log(estimateAndCapacityFuture)

estimateAndCapacityFuture.forEach(category => {
  let totalEstimate = 0
  category.estimate.forEach(estimate => totalEstimate += Number(estimate)) //suma de assistencia
  category.estimate = totalEstimate

  let totalCapacityFut = 0
  category.capacity.forEach(capacity => totalCapacityFut += Number(capacity)) //suma de capacity
  category.capacity = totalCapacityFut

  let totalEstimateRevenue = 0
  category.estimateRevenue.forEach(estimateRevenue => totalEstimateRevenue += Number(estimateRevenue)) //suma de revenue
  category.estimateRevenue = totalEstimateRevenue

  category.porcentajeAttendace = ((totalEstimate * 100) / totalCapacityFut).toFixed(2) //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
})
console.log(estimateAndCapacityFuture)


function getTablesTwo() {

  var templateHtml = `<tr>
  <td>
    Categories
  </td>
  <td>Estimated</td>
  <td>Percentage of estimated attendance</td>
</tr>`
  estimateAndCapacityFuture.forEach(e => {
    e.estimateAndCapacityFuture
    templateHtml += `<tr>
   <td >${e.category}</td>
   <td >U$D: ${e.estimateRevenue}</td>
   <td >${e.porcentajeAttendace} %</td>
 </tr>`
  })
  document.querySelector('#tablasDos').innerHTML = templateHtml
}


getTablesTwo()


//PAST EVENTS

const categoryAssit = dataInfoPast.map(eventos => eventos.category) // Extrajimos las categorias del array del evento pasado
const categorySet = new Set(categoryAssit) //Aplicamos el sett para eliminar las categorias duplicadas
const categorys = [...categorySet] //Ahora en categorys tenemos un array de 7 categorias
console.log(categorys)

const categoryValue = [] //Creamos un Array que contiene 1 objeto con 2 propiedades
categorys.map(category =>
  categoryValue.push({
    category: category,
    evento: dataInfoPast.filter(evento => evento.category === category), //Ahora tenemos las categorias que tienen adentro todos los eventos pasados
  })
)
console.log(categoryValue)


let assistAndCapacityPast = [] // De la varible anterior mapeamos en un nuevo array,
categoryValue.map(datos => {
  assistAndCapacityPast.push({
    category: datos.category,
    assistance: datos.evento.map(item => item.assistance),
    capacity: datos.evento.map(item => item.capacity),
    revenue: datos.evento.map(item => item.assistance * item.price)
  })
})
console.log(assistAndCapacityPast)
//Ahora sumamos todos los elementos de cada propiedad entre si (assistance, capacity, revenue)

assistAndCapacityPast.forEach(category => {
  let totalAssit = 0
  category.assistance.forEach(assistance => totalAssit += Number(assistance)) //suma de assistencia
  category.assistance = totalAssit

  let totalCapacity = 0
  category.capacity.forEach(capacity => totalCapacity += Number(capacity)) //suma de capacity
  category.capacity = totalCapacity

  let totalRevenue = 0
  category.revenue.forEach(revenue => totalRevenue += Number(revenue)) //suma de revenue
  category.revenue = totalRevenue

  category.porcentaje = ((totalAssit * 100) / totalCapacity).toFixed(2) //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
})
console.log(assistAndCapacityPast)
console.log(categoryValue)



function getTablesThree() {

  var templateHtml = `<tr>
  <td scope="row"">
    Categories
  </td>
  <td>Estimated</td>
  <td>Percentage of estimated attendance</td>
</tr>`
  assistAndCapacityPast.forEach(e => {
    e.assistAndCapacityPast
    templateHtml += `<tr>
   <td >${e.category}</td>
   <td >U$D: ${e.revenue}</td>
   <td >${e.porcentaje} %</td>
 </tr>`
  })
  document.querySelector('#tablasTres').innerHTML = templateHtml
}

getTablesThree()