// Elements
const button = document.querySelector('#btn-submit')
const inputNumber = document.querySelector('#number-input')
const resultContainer = document.querySelector('#result-container')
const resultSpan = document.querySelector('#result-container span')
const resultSpanWrong = document.querySelector('#result-container span')
const clearBtn = document.querySelector('#clear-btn')
const errorMsg = document.querySelector('#container span')

// Functions

const randomNumber = () => {
    const randomN = Math.floor((Math.random() * 10) + 0)
    return randomN
}

const trysCount = (number, randomValue, trys) => {
    const randomNumber = randomValue
    const numberValue = number
    if (numberValue != randomNumber) {
        resultSpan.innerText = `Você errou o número era ${randomNumber}, Tentantiva número ${trys}`
        resultContainer.appendChild(resultSpan)
        resultContainer.classList.remove('hide')
        resultSpan.classList.add('errado')
    }else if (numberValue === randomNumber) {
        resultSpan.innerText = `Você acertou o número era ${randomNumber}`
        resultContainer.appendChild(resultSpan)
        resultContainer.classList.remove('hide')
        resultSpan.classList.add('certo')
        button.disabled = true
    }
    return
}

const debounce = (func, wait) => {
    let timeout;

    return function(...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait); 
    };
}

// Events

let trys = 0

button.addEventListener('click', debounce(() => {
    resultContainer.innerText = ''

    const inputNumberValue = +inputNumber.value
    console.log(inputNumberValue)

    if (!inputNumberValue) {
        errorMsg.innerText = 'Digite um numero acima...'
        errorMsg.classList.add('errado')
        return
    } 
    else if (inputNumberValue > 10) {
        errorMsg.innerText = 'O numero não pode ser maior que 10...'
        errorMsg.classList.add('errado')
        return
    }else if (inputNumberValue < 0){
        errorMsg.innerText = 'O numero não pode ser menor que 0...'
        errorMsg.classList.add('errado')    
        return
    }



    const numberRandom = randomNumber(inputNumberValue)

    trys = trys + 1;
    
    trysCount(inputNumberValue, numberRandom, trys)

    errorMsg.innerHTML = ''

    if (inputNumberValue === numberRandom) {
        trys = 0    
    }

}, 150))

clearBtn.addEventListener('click', (e) => {
    e.preventDefault()
    resultContainer.classList.add('hide')
    button.disabled = false
    resultSpan.classList.remove('certo')
    resultSpan.classList.remove('errado')
    errorMsg.innerHTML = ""
    inputNumber.value = ""
    trys = 0
})