// Definición de dos arreglos vacíos para almacenar iconos y selecciones
let iconos = []
let selecciones = []
let parejasEncontradas = 0; // 🔥 Nuevo contador

// Función para generar el tablero del juego
function generarTablero() {
  cargarIconos()
  selecciones = []
  parejasEncontradas = 0 // 🔥 Reiniciar al comenzar nuevo juego

  let tablero = document.getElementById("tablero")
  let tarjetas = []

  for (let i = 0; i < 24; i++) {
    tarjetas.push(`
      <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
        <div class="tarjeta" id="tarjeta${i}">
          <div class="cara trasera" id="trasera${i}">
            ${iconos[0]}
          </div>
          <div class="cara superior">
            <i class="far fa-question-circle"></i>
          </div>
        </div>
      </div>
    `)

    if (i % 2 == 1) {
      iconos.splice(0, 1)
    }
  }

  tarjetas.sort(() => Math.random() - 0.5)
  tablero.innerHTML = tarjetas.join(" ")
}

// Función para cargar iconos
function cargarIconos() {
  iconos = [
    '<i class="fas fa-star"></i>',
    '<i class="far fa-star"></i>',
    '<i class="fas fa-star-of-life"></i>',
    '<i class="fas fa-star-and-crescent"></i>',
    '<i class="fab fa-old-republic"></i>',
    '<i class="fab fa-galactic-republic"></i>',
    '<i class="fas fa-sun"></i>',
    '<i class="fas fa-stroopwafel"></i>',
    '<i class="fas fa-dice"></i>',
    '<i class="fas fa-chess-knight"></i>',
    '<i class="fas fa-chess"></i>',
    '<i class="fas fa-dice-d20"></i>',
  ]
}

// Manejo de selección
function seleccionarTarjeta(i) {
  let tarjeta = document.getElementById("tarjeta" + i)

  if (tarjeta.style.transform != "rotateY(180deg)") {
    tarjeta.style.transform = "rotateY(180deg)"
    selecciones.push(i)
  }

  if (selecciones.length == 2) {
    deseleccionar(selecciones)
    selecciones = []
  }
}

// Comparación de tarjetas
function deseleccionar(selecciones) {
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0])
    let trasera2 = document.getElementById("trasera" + selecciones[1])

    if (trasera1.innerHTML != trasera2.innerHTML) {
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
      tarjeta1.style.transform = "rotateY(0deg)"
      tarjeta2.style.transform = "rotateY(0deg)"
    } else {
      // Pareja encontrada
      trasera1.style.background = "plum"
      trasera2.style.background = "plum"

      parejasEncontradas++ // 🔥 Aumentar contador

      verificarVictoria() // 🔥 Comprobar si se ganó
    }
  }, 1000);
}

// 🔥 NUEVA FUNCIÓN: Detecta si ya se ganó el juego
function verificarVictoria() {
  // Total de parejas = 24 tarjetas / 2
  if (parejasEncontradas === 12) {
    mostrarMensajeVictoria()
  }
}

// 🔥 Mensaje visual de victoria (sin alert)
function mostrarMensajeVictoria() {
  const mensaje = document.createElement("div")
  mensaje.className = "mensaje-victoria"
  mensaje.textContent = "🎉 ¡Ganaste! Todas las parejas coinciden 🎉"

  document.body.appendChild(mensaje)

  // Quitar mensaje después de 4 segundos
  setTimeout(() => {
    mensaje.remove()
  }, 4000)
}
