const tablero = document.getElementById('tablero');
const iconos = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓'];
let seleccionadas = [];

// Barajar iconos
iconos.sort(() => Math.random() - 0.5);

// Crear cartas
iconos.forEach((icono, index) => {
    const carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.valor = icono;
    carta.addEventListener('click', voltear);
    tablero.appendChild(carta);
});

function voltear() {
    if (seleccionadas.length < 2 && !this.classList.contains('volteada')) {
        this.classList.add('volteada');
        this.innerText = this.dataset.valor;
        seleccionadas.push(this);

        if (seleccionadas.length === 2) {
            setTimeout(comparar, 500);
        }
    }
}

function comparar() {
    const [c1, c2] = seleccionadas;
    if (c1.dataset.valor !== c2.dataset.valor) {
        c1.classList.remove('volteada');
        c1.innerText = '';
        c2.classList.remove('volteada');
        c2.innerText = '';
    }
    seleccionadas = [];
}
