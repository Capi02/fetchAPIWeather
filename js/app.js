const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado")
const form = document.querySelector("#formulario")

window.addEventListener("load", () => {
  form.addEventListener("submit", consultarClima)
})

function consultarClima(e) {
  e.preventDefault()
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    alerta("Todos los campos son oblitatorios")
    return
  }
  consultarAPI(ciudad, pais)
}

function alerta(mensaje) {
  const alerta = document.querySelector(".bg-red-100")

  if (!alerta) {
    const alerta = document.createElement('DIV')
    alerta.classList.add("bg-red-100", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "max-w-md", "mx-auto", "mt-6", "text-center")

    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</span>
    `
    container.append(alerta)

    setTimeout(() => {
      alerta.remove()
    }, 3000);
  }
}

function consultarAPI(ciudad, pais) {
  const appId = "130213d9feb1930087adcc7296057366"
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  spinner(); // Spinner de carga

  fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {

      limpiarHTML() // Limpiar html

      if (datos.cod === "404") {
        alerta("Ciudad o pais no encontrado...")
        return;
      }
      mostrarClima(datos)
    })

}

function mostrarClima(datos) {
  // Extraemos los datos del resultado ( Solo los necesarios )
  const { name, main: { temp, temp_max, temp_min } } = datos;

  const gradosCentigrados = kelvinAGrados(temp)
  const max = kelvinAGrados(temp_max)
  const min = kelvinAGrados(temp_min)

  // Nombre ciudad
  const ciudad = document.createElement("P")
  ciudad.textContent = `Clima en  ${name}`;
  ciudad.classList.add("font-bold", "text-2xl")

  // Creamos un parrafo donde se agregara la temperatura
  const tempActual = document.createElement("P");
  tempActual.innerHTML = `${gradosCentigrados} &#8451;`
  tempActual.classList.add("font-bold", "text-6xl")

  // Temp max
  const tempMax = document.createElement("p");
  tempMax.innerHTML = `Max:  ${max} &#8451`
  tempMax.classList.add("text-xl")

  // Temp min
  const tempMin = document.createElement("p");
  tempMin.innerHTML = `Min:  ${min} &#8451`
  tempMin.classList.add("text-xl")


  // Creamos un div
  const resultadoDiv = document.createElement("div")
  resultadoDiv.classList.add("text-center", "text-white")
  resultadoDiv.append(ciudad)
  resultadoDiv.append(tempActual)
  resultadoDiv.append(tempMax)
  resultadoDiv.append(tempMin)


  resultado.appendChild(resultadoDiv)

}

const kelvinAGrados = grados => parseInt(grados - 273.15)

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  }
}

function spinner() {

  limpiarHTML() // asegurarnos que no haya elementos 

  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle")
  divSpinner.innerHTML = `
  

  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `
  resultado.appendChild(divSpinner)
}