const tablero = document.getElementById('tablero');
const tiempoSpan = document.getElementById('tiempo');
const intentosSpan = document.getElementById('intentos');
const botonReiniciar = document.getElementById('reiniciar');

// --- Configuración del Juego ---
const numeroCartasPorFila = 4; // Cambia esto si quieres un tablero diferente (ej. 5)
const iconosOriginales = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍍', '🍍', '🍉', '🍉', '🍊', '🍊', '🍋', '🍋']; // Más iconos para un tablero más grande

// Ajustamos la lista de iconos según el tamaño del tablero
const iconos = iconosOriginales.slice(0, numeroCartasPorFila * numeroCartasPorFila);

let seleccionadas = [];
let paresEncontrados = 0;
let tiempoTranscurrido = 0;
let intervaloTiempo = null; // Para controlar el temporizador
let juegoActivo = false; // Para saber si el juego está en curso

// --- Funciones del Juego ---

function barajar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambio
    }
    return array;
}

function iniciarTemporizador() {
    tiempoTranscurrido = 0;
    tiempoSpan.innerText = tiempoTranscurrido;
    intervaloTiempo = setInterval(() => {
        tiempoTranscurrido++;
        tiempoSpan.innerText = tiempoTranscurrido;
    }, 1000); // Incrementa cada segundo
}

function detenerTemporizador() {
    clearInterval(intervaloTiempo);
}

function actualizarIntentos() {
    intentosSpan.innerText = parseInt(intentosSpan.innerText) + 1;
}

function crearTablero() {
    tablero.innerHTML = ''; // Limpia el tablero anterior
    seleccionadas = [];
    paresEncontrados = 0;
    intentosSpan.innerText = 0;
    juegoActivo = true; // El juego comienza

    const iconosBarajados = barajar([...iconos]); // Copia y baraja

    // Ajusta el grid-template-columns basado en numeroCartasPorFila
    tablero.style.gridTemplateColumns = `repeat(\({numeroCartasPorFila}, 100px)`;

    iconosBarajados.forEach((icono, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.valor = icono; // Guarda el valor del icono
        carta.dataset.id = index; // Identificador único para la carta
        carta.addEventListener('click', voltearCarta);
        tablero.appendChild(carta);
    });
}

function voltearCarta() {
    // Solo permite voltear si el juego está activo, no hay 2 cartas seleccionadas,
    // y la carta clicada no está ya volteada o encontrada.
    if (!juegoActivo || seleccionadas.length >= 2 || this.classList.contains('volteada') || this.classList.contains('encontrada')) {
        return;
    }

    this.classList.add('volteada');
    this.innerText = this.dataset.valor; // Muestra el icono
    seleccionadas.push(this);

    if (seleccionadas.length === 2) {
        actualizarIntentos(); // Incrementa intentos solo cuando se selecciona la segunda carta
        setTimeout(compararPares, 700); // Espera un poco antes de comparar
    }
}

function compararPares() {
    const [carta1, carta2] = seleccionadas;

    if (carta1.dataset.valor === carta2.dataset.valor) {
        // ¡Son un par!
        carta1.classList.add('encontrada');
        carta2.classList.add('encontrada');
        carta1.removeEventListener('click', voltearCarta); // Deshabilita el clic
        carta2.removeEventListener('click', voltearCarta); // Deshabilita el clic
        paresEncontrados++;

        if (paresEncontrados === iconos.length / 2) {
            // ¡Juego completado!
            detenerTemporizador();
            juegoActivo = false;
            alert(`¡Felicidades! ¡Has completado el memorama en \){tiempoTranscurrido} segundos y ${intentosSpan.innerText} intentos!`);
        }
    } else {
        // No son un par, ocúltalas de nuevo
        carta1.classList.remove('volteada');
        carta1.innerText = '';
        carta2.classList.remove('volteada');
        carta2.innerText = '';
    }
    seleccionadas = []; // Limpia las selecciones para el próximo turno
}

function reiniciarJuego() {
    detenerTemporizador();
    crearTablero();
    iniciarTemporizador();
}

// --- Inicialización ---
botonReiniciar.addEventListener('click', reiniciarJuego);
crearTablero(); // Crea el tablero inicial al cargar la página
iniciarTemporizador(); // Inicia el temporizador al cargar la página
