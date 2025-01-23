let numeroSecreto = 0, intentos = 0, listaNumerosSorteados = [], numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento() {
  let valorUsuario = document.getElementById("valorUsuario").value;
  // Validar si el usuario ingresó o no un valor
  if (valorUsuario.trim() === "") {
    asignarTextoElemento("p", "Debes ingresar un número válido entre 1 y 10");
    return;
  }
  // Si el usuario ingreso un valor, convertir el valor en un número válido
  let numeroDeUsuario = parseInt(valorUsuario);

  // Validar si el valor ingresado es un número y está en el rango de 1 a 10
  if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > 10) {
    asignarTextoElemento("p", "Debes ingresar un número válido entre 1 y 10");
    return;
  }

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento("p", `🎉 ¡Felicitaciones! Adivinaste el número 🎉`);
    asignarTextoElemento("span", `Intentos realizados: ${intentos}`);
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("intentar").setAttribute("disabled", "true");
    document.getElementById("valorUsuario").setAttribute("disabled", "true");
  } else {
    //El usuario no acertó.
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", `💡: El número es menor que ${numeroDeUsuario}`);
    } else {
      asignarTextoElemento("p", `💡: El númnero es mayor que ${numeroDeUsuario}`);
    }
    intentos++;
    limpiarCaja();
  }
  return;
}

document.getElementById('valorUsuario').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      verificarIntento();
  }
});

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  //Si ya sorteamos todos los números
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
  } else {
    //Si el numero generado está incluido en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
      return generarNumeroSecreto();
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function condicionesIniciales() {
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

function reiniciarJuego() {
  limpiarCaja();
  condicionesIniciales();
  document.getElementById("valorUsuario").removeAttribute("disabled");
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  document.getElementById("intentar").removeAttribute("disabled");
  asignarTextoElemento("p", "");
  asignarTextoElemento("span", "");
}

condicionesIniciales();