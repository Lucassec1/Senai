const display = document.getElementById('display')
const displayText = document.getElementById('display').textContent
const mais_menos = document.getElementById('mais_menos')
const porcentagem = document.getElementById('porcentagem')
const btn_igual = document.getElementById('btn_igual')
const btn_apagar = document.getElementById('btn_apagar')
const apagar_tudo = document.getElementById('apagar_tudo')

const numeros = document.querySelectorAll("[id*=numero]")
const operadores = document.querySelectorAll("[id*=sinal]")

let primeiroNumero = true
let operador 
let numeroAnterior
let numeroAtual
let apagarIgual

const ajustaPontoVirgula = () => display.textContent = display.textContent.replace('.', ',')

// -=-=-=-=-=-=-=-=-=-=-=-= Habilita Click dos Números =-=-=-=-=-=-=-=-=-=-=-=-

const inserirDisplay = text => {
    if (primeiroNumero) {
        display.textContent = text
        primeiroNumero = false
    } else {
        display.textContent += text
    }
    display.textContent = display.textContent.substring(0, 10)
    numeroAtual = display.textContent
    apagarIgual = true
}

const inserir = e => inserirDisplay(e.target.textContent)
numeros.forEach(e => e.addEventListener("click", inserir))

// -=-=-=-=-=-=-=-=-=-=-=-= Habilita Click das Operações =-=-=-=-=-=-=-=-=-=-=-=-

const inserirOperador = e => {
    primeiroNumero = true
    operador = e.target.textContent
    if (operador == 'x') {
        operador = '*'
    } else if (operador == '÷') {
        operador = '/'
    }   
    numeroAnterior = display.textContent
}

operadores.forEach(e => e.addEventListener("click", inserirOperador))

// -=-=-=-=-=-=-=-=-=-=-=-= Habilita Click do Botão de Igual =-=-=-=-=-=-=-=-=-=-=-=-

const calcular = () => {
    if (numeroAnterior && operador) {
        let resultado = numeroAnterior + operador
        
        if (numeroAtual) {
            resultado += numeroAtual
        } else {
            resultado += numeroAnterior
        }
        display.textContent = eval(resultado.replace(',', '.'))
        ajustaPontoVirgula()

        if (display.textContent == 'NaN') {
            display.textContent = '0'
        }
        numeroAnterior = display.textContent
        primeiroNumero = true
        apagarIgual = false
    }
}

btn_igual.addEventListener('click', calcular)

// -=-=-=-=-=-=-=-=-=-=-=-= Habilita Click do Botão de Apagar =-=-=-=-=-=-=-=-=-=-=-=-

const apagar = () => {
    if (apagarIgual) {
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1)
        } else {
            display.textContent = 0
        }
        primeiroNumero = true
    }    
}

btn_apagar.addEventListener('click', apagar)

// -=-=-=-=-=-=-=-=-=-=-=-= Habilita Click do Botão Mais/Menos =-=-=-=-=-=-=-=-=-=-=-=-

const inverterSinal = () => {
    display.textContent = parseFloat(display.textContent.replace(',', '.')) * -1
    ajustaPontoVirgula()
  }

mais_menos.addEventListener('click', inverterSinal)

// -=-=-=-=-=-=-=-=-=-=-=-= Habilita Click do Botão de Apagar Tudo =-=-=-=-=-=-=-=-=-=-=-=-

const apagarTudo = () => {
    display.textContent = '0'
    numeroAnterior = '0'
    numeroAtual = '0'
    primeiroNumero = true
}

apagar_tudo.addEventListener('click', apagarTudo)

// -=-=-=-=-=-=-=-=-=-=-=-= Habilita Click do Botão de Porcentagem =-=-=-=-=-=-=-=-=-=-=-=-

const calcularPorcentagem = () => {
    display.textContent = parseFloat(display.textContent.replace(',', '.')) / 100
    ajustaPontoVirgula()
    numeroAtual = display.textContent
    primeiroNumero = true
}

porcentagem.addEventListener('click', calcularPorcentagem)