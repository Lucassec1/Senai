const img = document.getElementById( 'img' );
const buttons = document.getElementById( 'buttons' );
let setInitialColor = 0;
let intervalId = null;

const ChangeColor = ( event ) => {
    stopAutomatic();
    turnOn[event.target.id]();
}

const nextColor = () => setInitialColor = setInitialColor < 2 ? ++setInitialColor : 0;

const changeColor = () => {
    const colors = ['red_color','yellow_color','green_color']
    const color = colors[ setInitialColor ];
    turnOn[color]();
    nextColor();
}

const stopAutomatic = () => {
    clearInterval ( intervalId );
}

const turnOn = {
    'red_color':() => img.src = 'assets/redcolor.png',
    'yellow_color':() => img.src = 'assets/yellowcolor.png',
    'green_color':() => img.src = 'assets/greencolor.png',
    'automatic': () => intervalId = setInterval( changeColor, 1200 )
}

buttons.addEventListener('click', ChangeColor );