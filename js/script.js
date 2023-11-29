//busca o canvas e declara o conrtexto como 2d
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

var menu = document.getElementById('menuScreen')
var buttonPlay = document.getElementById("buttonPlay")


//tamanho padrao da cobra e comida
const size = 32;
//objeto da cobra
var snake = [
    { x: 0, y: 0 },
    { x: 32, y: 0 }
]

//função pra gerar uma coordenada aleatoria para a comida
function randomNumber() {
    let random = Math.round(Math.random() * 480);
    return Math.round(random / 32) * 32
}
//objeto da comida
const food = {
    x: randomNumber(),
    y: randomNumber(),
    color: "green"
}

//funcao para "desenhar" a comida
function criarComida() {
    //pra nao precisar ficar colocando food.x etc
    const { x, y, color } = food


    context.shadowColor = color
    context.shadowBlur = 10
    context.fillStyle = color;
    context.fillRect(x, y, size, size)
    context.shadowBlur = 0

}

//declaração da direção e id do loop sem atribuição de valor
let direction, loopId

//função para "desenhar" a cobra
function criarCobrinha() {
    context.fillStyle = "red";

    //for each pra percorrer cada item do array
    snake.forEach((position, index) => {
        context.fillRect(position.x, position.y, size, size) //fillReact(coordenadaX, coordenadaY, altura, largura)
    })
}
//função para mover a cobra
function moveSnake() {

    if (!direction) return; // condicional para sair da função caso a variavel direção nao tenha sido atribuida

    const head = snake[snake.length - 1] // variavel pra armazenar a cabeça da cobra

    //adiciona um bloco a frente da cabeça
    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y });
    }
    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y });
    }
    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size });
    }
    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size });
    }
    //remove um bloco da cauda
    snake.shift()
}
//checa se a cobra comeu a comida
function checkFood() {
    const head = snake[snake.length - 1]

    if (head.x == food.x && head.y == food.y) {
        snake.push(head)
        //cria novos valores pra as coordenadas da comida
        food.x = randomNumber()
        food.y = randomNumber()
    }
}

function checkColision() {
    const head = snake[snake.length - 1]

    const neckIndex = snake.length - 2
    const selfColision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })
    if (head.x < 0 || head.x > 480 || head.y < 0 || head.y > 480) {
        if (direction == "right") head.x = 0;
        if (direction == "left") head.x = 480;
        if (direction == "down") head.y = 0;
        if (direction == "up") head.y = 480;
    }

    if (selfColision) {
        gameOver()
    }
}

function gameOver() {
    direction = undefined
    menu.style.display = "flex"

}

function applySpeed(){
    const speedInput = document.getElementById("speed");
    var speed = (Number.parseInt(speedInput.max) + Number.parseInt(speedInput.min)) - Number.parseInt(speedInput.value);
    return speed;
}
//loop para redesenhar o tabuleiro a cada x milissegundos
function gameLoop() {
    clearInterval(loopId) //limpa o set interval para n ter o risco de ficarem varios rodando ao mesmo tempo
    context.clearRect(0, 0, 600, 600) //limpa o tabuleiro

    criarComida()
    moveSnake()
    criarCobrinha()
    checkFood()
    checkColision()




    loopId = setTimeout(() => { gameLoop() } //setTimeout chama a game loop para manter o loop ativo
        , applySpeed()) // quanto menor intervalo maior velocidade da cobra
}


gameLoop()

//atribui o valor à variavel direção ao pressionar as setas

document.addEventListener("keydown", ({ key }) => {
    handleKeyPress(key);
});

// Event listeners for swipe gestures
canvas.addEventListener("touchstart", startTouch);
canvas.addEventListener("touchmove", moveTouch);

// ...

function handleKeyPress(key) {
    document.addEventListener("keydown", ({ key }) => {
        if (key == "ArrowRight" && direction != "left") {
            direction = "right"
        }
        if (key == "ArrowLeft" && direction != "right") {
            direction = "left"
        }
        if (key == "ArrowUp" && direction != "down") {
            direction = "up"
        }
        if (key == "ArrowDown" && direction != "up") {
            direction = "down"
        }
    })
}

// Swipe handling functions
function startTouch(e) {
    swipeInitialX = e.touches[0].clientX;
    swipeInitialY = e.touches[0].clientY;
}

function moveTouch(e) {
    if (isSnakeOffScreen()) return;

    if (swipeInitialX === null) {
        return;
    }

    if (swipeInitialY === null) {
        return;
    }

    let currentX = e.touches[0].clientX;
    let currentY = e.touches[0].clientY;

    let diffX = swipeInitialX - currentX;
    let diffY = swipeInitialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        // sliding horizontally
        if (diffX > 0) {
            // swiped left
            handleSwipe("left");
        } else {
            // swiped right
            handleSwipe("right");
        }
    } else {
        // sliding vertically
        if (diffY > 0) {
            // swiped up
            handleSwipe("up");
        } else {
            // swiped down
            handleSwipe("down");
        }
    }

    swipeInitialX = null;
    swipeInitialY = null;

    e.preventDefault();
}

function handleSwipe(swipeDirection) {
    // Update the direction based on the swipe gesture
    direction = swipeDirection;
}

buttonPlay.addEventListener('click', function () {
    menu.style.display = "none"
    snake = [{ x: 0, y: 0 },
    { x: 32, y: 0 }]
    gameLoop()
})