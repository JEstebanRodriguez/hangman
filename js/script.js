// Array de palabras que contendra el juego
const words = [
    'abeja',
    'atardecer',
    'sol',
    'casa',
    'perro',
    'sofa',
    'programando',
    'paraguay',
    'editor',
    'html',
    'css',
    'javascript',
    'itapua',
    'ahorcado',
    'codigo',
    'mentores',
    'funciones',
    'variables',
    'objetos',
    'notebook',
    'bootcamp',
    'github',
    'datos',
    'algoritmo',
    'clases',
    'leon',
    'mochila',
    'persona',
    'celular'
];


// funcion que contiene todos los elementos llamados por su id
const getById = (element) => document.getElementById(element);

// declaracion de los elementos del dom
const quoteContainer = getById('quote-container');
const wrongLetterContainer = getById('wrong-letter-container');
const letterInput = getById('input');
const startBtn = getById('start-btn');
const gameOver = getById('game-over');
const youWin = getById('you-win');
const playAgainWin = getById('play-again-win');
const playAgainGameOver = getById('play-again-game-over');
const remainingAttemptsEl = getById('remaining-attempts')
const startScreen = getById('start-screen');
const selectedWordEl = document.querySelectorAll('.selected-word')

// arrays en donde se almacenaran las letras correctas y las letras incorrectas
let correctLetters = [];
let incorrectLetters = [];
// variable en forma de contadores que contendra el numero de errores del jugador por cada palabra incorrecta
let errors = 0;

// Obtencion de una palabra random del array de palabras.
const selectedWord = words[Math.floor(Math.random() * words.length)];

// Se recorre todos los elementos con la clase compartida selected word en el dom para mostrarla dentro del modal al finalizar el juego
selectedWordEl.forEach(el => el.innerText = `La palabra seleccionada era: ${selectedWord}`);

// declaracion de intentos restantes
let remainingAttempts = selectedWord.length + 5;
remainingAttemptsEl.innerText = remainingAttempts;

// funcion para mostrar las letras en el dom
const displayWords = () => {
    // de la palabra seleccionada creamos un array con cada letra
    const letters = selectedWord.split('');
    // se comprueba el array de letras correctas y si coinciden con la de la palabra correcta se agregan dentro de un span en el dom de caso contrario se crea un span vacio.
    const letterEl = letters.map(letter => {
        return `<span class="quote-container__letter ${correctLetters.includes(letter) ? 'correct' : ''
            }">${correctLetters.includes(letter) ? letter : ''}</span>`
    }).join('');
    // se agregan los span dentro del dom
    quoteContainer.innerHTML = letterEl;

    // reemplazamos las strings vacias por el texto de los span dentro del contenedor
    const innerEl = quoteContainer.innerText.replace(/\n/g, '');

    // Si la palabra tipeada coincide con la palabra seleccionada para el juego se despliega un modal de victoria y se impide seguir escribiendo
    if (innerEl === selectedWord) {
        youWin.classList.add('active')
        input.disabled = true;
    }
}

// funcion para desplegar en el dom las palabras incorrectas
const displayIncorrectLetters = (letter) => {
    incorrectLetters.push(letter);
    const lettersEl = incorrectLetters.map(letterValue => `<span class="wrong-letter-container__letter">${letterValue}</span>`).join('');
    wrongLetterContainer.innerHTML = lettersEl
}


const compareLetters = (typedLetter) => {
    if (selectedWord.includes(typedLetter)) {
        // por cada acierto de una letra que coincida con la palabra seleccionada se agregara la letra al modal de letras correctas y se desplegaran las letras en el dom.
        correctLetters.push(typedLetter);
        displayWords();
    } else {
        // Por cada letra que no coincida con la palabra seleccionada se insertara esa letra en el array de letras incorrectas y el valor del error se sumara en 1
        displayIncorrectLetters(typedLetter)
        errors++;

        remainingAttempts--;
        remainingAttemptsEl.innerText = remainingAttempts;

        // Si el numero de errores supera el maximo de 5 sobre la cantidad de letras de la palabra seleccionada se despliega un modal de juego terminado y se impide seguir escribiendo.
        if (errors >= (selectedWord.length + 5)) {
            gameOver.classList.add('active');
            input.disabled = true;
        }
    }
}

// Cuando se dispara el evento al escribir en el input, se obtiene el valor y se pasa como parametro a la function de comparacion de letras con la palabra seleccionada, luego se borra el valor escrito para que solo permita el ingreso de letra por letra
letterInput.addEventListener('input', ({target}) => {
    let inputValue = target.value.toLowerCase();
    compareLetters(inputValue);
    target.value = '';
})

// Click en el boton de volver a jugar dentro del modal de victoria, cuando se haga click oculta el modal y recarga la pagina
playAgainWin.addEventListener('click', () => {
    youWin.classList.remove('active');
    startScreen.style.transform = 'translateY(0%)';
    location.reload();
})

// Click en el boton de volver a jugar dentro del modal de derrota, cuando se haga click oculta el modal y recarga la pagina
playAgainGameOver.addEventListener('click', () => {
    gameOver.classList.remove('active');
    startScreen.style.transform = 'translateY(0%)';
    location.reload();
})
// Api de audio de Javascript
let audio = new Audio('assets/arcade-music.wav');

document.addEventListener('DOMContentLoaded', () => {
    // llamada de la funcion para obtener una palabra
    displayWords();
    input.focus();
    audio.play();
    audio.loop;
    audio.volume = 0.3;
});

startBtn.addEventListener('click', () => {
    startScreen.style.transform = 'translateY(-100%)';
    letterInput.focus();
    audio.pause();
})