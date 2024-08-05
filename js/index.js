const gameField = document.querySelector('#game_field');
const mixButton = document.querySelector('button.mix_game')
let gameArray = [
    [[1],[2],[3],[4]],
    [[5],[6],[7],[8]],
    [[9],[10],[11],[12]],
    [[13],[14],[15],[16]]
];

mixButton.addEventListener('click', () => {
    mixGame()
})

function mixGame() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let rand1 = Math.floor(Math.random()*4);
            let rand2 = Math.floor(Math.random()*4);

            if(rand1 == rand2 & rand1 == 3 || i == j & i == 3) continue            
            swapElement(i,j,rand1,rand2);
        }
    }

    drawGame()
}

function swapElement(y_element1,x_element1,y_element2,x_element2) {
    let tmpElement = gameArray[y_element1][x_element1];
    gameArray[y_element1][x_element1] = gameArray[y_element2][x_element2];
    gameArray[y_element2][x_element2] = tmpElement;
}

function drawGame() {
    let tmpHTML = ""
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            tmpHTML += gameArray[i][j] == 16 ? `<div style="visibility:hidden;">${gameArray[i][j]}</div>` : `<div>${gameArray[i][j]}</div>`;
        }
    }
    gameField.innerHTML = tmpHTML;

    let gamePlate = document.querySelectorAll('#game_field > div')
    gamePlate.forEach((plate)=>{
        plate.addEventListener('click',() => {
            movePlate(plate.textContent);
        })
    })
}

function movePlate(plateNumber) {
    let numberCords = getCords(plateNumber);
    let zeroCords = getCords(16);

    if (!clickValidate(numberCords.i,numberCords.j,zeroCords.i,zeroCords.j)) return 0;
    swapElement(numberCords.i,numberCords.j,zeroCords.i,zeroCords.j);
    drawGame();
    setTimeout(()=>{checkWin()},100)
}

function getCords(number) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameArray[i][j] == number) return {i,j};
        }
    }
}

function clickValidate(y_element1,x_element1,y_element2,x_element2) {
    if (
        Math.max(y_element1,y_element2) - Math.min(y_element1,y_element2) > 1 ||
        Math.max(x_element1,x_element2) - Math.min(x_element1,x_element2) > 1 ||
        x_element1 - x_element2 != 0 && y_element1 - y_element2 != 0
    ) {
        return false;
    }
    return true;
}

function checkWin() {
    let wrongPossition = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameArray[i][j] != i*4+j+1) wrongPossition++;
        }
    }

    if (wrongPossition == 0) alert('Победа')
}

drawGame();