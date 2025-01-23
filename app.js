let numeroSecreto = 0, intentos = 0, listaNumerosSorteados = [], numeroMaximo = 10, numerosIngresados = [];

function asignarTextoElemento(elemento, texto) {
  document.querySelector(elemento).innerHTML = texto;
}

function verificarIntento() {
  let valorUsuario = document.getElementById("valorUsuario").value.trim();
  if (valorUsuario === "") {
    asignarTextoElemento("p", "Debes ingresar un número válido entre 1 y 10");
    return;
  }

  let numeroDeUsuario = parseInt(valorUsuario);
  if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > 10) {
    asignarTextoElemento("p", "Debes ingresar un número válido entre 1 y 10");
    return;
  }

  if (numerosIngresados.includes(numeroDeUsuario)) {
    asignarTextoElemento("p", "Ya ingresaste este número");
    return;
  } else {
    numerosIngresados.push(numeroDeUsuario);
  }

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento("p", `🎉 ¡Felicitaciones! Adivinaste el número 🎉`);
    asignarTextoElemento("span", `Intentos realizados: ${intentos}`);
    document.getElementById("reiniciar").removeAttribute("disabled");
    document.getElementById("intentar").setAttribute("disabled", "true");
    document.getElementById("valorUsuario").setAttribute("disabled", "true");
  } else {
    asignarTextoElemento("p", `💡: El número es ${numeroDeUsuario > numeroSecreto ? 'menor' : 'mayor'} que ${numeroDeUsuario}`);
    intentos++;
    limpiarCaja();
  }
}

document.getElementById('valorUsuario').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    verificarIntento();
  }
});

document.getElementById("valorUsuario").style.textAlign = "center";

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
  if (listaNumerosSorteados.length == numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los números posibles");
    return;
  }

  let numeroGenerado;
  do {
    numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  } while (listaNumerosSorteados.includes(numeroGenerado));

  listaNumerosSorteados.push(numeroGenerado);
  return numeroGenerado;
}

function condicionesIniciales() {
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

function reiniciarJuego() {
  limpiarCaja();
  condicionesIniciales();
  numerosIngresados = [];
  document.getElementById("valorUsuario").removeAttribute("disabled");
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  document.getElementById("intentar").removeAttribute("disabled");
  asignarTextoElemento("p", "");
  asignarTextoElemento("span", "");
}

condicionesIniciales();