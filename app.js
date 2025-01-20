let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
  return;
}

function verificarIntento() {
  let valorUsuario = document.getElementById("valorUsuario").value;

  // Validar si el usuario ingreso o no un valor
  if (valorUsuario.trim() === "") {
    asignarTextoElemento("p", "Debes de ingresar un número para adivinar");
    return;
  }
  // Si el usuario ingreso un valor, convertir el valor en un numero valido
  let numeroDeUsuario = parseInt(valorUsuario);

  if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento("p", `¡Felicitaciones 🎉 adivinaste el número !`);
    asignarTextoElemento("span", `Intentos realizados: ${intentos}`);

    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    //El usuario no acertó.
    if (numeroDeUsuario > numeroSecreto) {
      asignarTextoElemento("p", `Pista 💡: es menor que ${numeroDeUsuario}`);
    } else {
      asignarTextoElemento("p", `Pista 💡: es mayor que ${numeroDeUsuario}`);
    }
    intentos++;
    limpiarCaja();
  }
  return;
}

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
  //limpiar caja
  limpiarCaja();
  //Indicar mensaje de intervalo de números
  //Generar el número aleatorio
  //Inicializar el número intentos
  condicionesIniciales();
  //Deshabilitar el botón de nuevo juego
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
  asignarTextoElemento("p", "");
  asignarTextoElemento("span", "");
}

condicionesIniciales();
