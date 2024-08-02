const gameField = document.querySelector('#game_field');
let gameSize = 4;
let gameArray = [];

function startGame() {
    // fill matrix
    for (let i = 0; i < gameSize; i++) {
        let tmpArr = [];
        for (let j = 0; j < gameSize; j++) {
            tmpArr.push(j+i*4);
        }
        gameArray.push(tmpArr);
    }

    // mix matrix
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            let rand1 = Math.floor(Math.random()*4);
            let rand2 = Math.floor(Math.random()*4);

            let tmpNumber = gameArray[i][j];
            gameArray[i][j] = gameArray[rand2][rand1];
            gameArray[rand2][rand1] = tmpNumber;
        }
    }

    drawGame()
}

function movePlate(numberOnPlate) {

    // number cords
    let number_x,number_y;
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            if (gameArray[i][j] == numberOnPlate) {
                number_y = i;
                number_x = j;
            }
        }
    }

    // zero cords
    let zero_x, zero_y;
    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            if (gameArray[i][j] == 0) {
                zero_y = i;
                zero_x = j;
            }
        }
    }

    if ( 
        zero_x - number_x < -1 || 
        number_x - zero_x < -1 ||
        zero_y - number_y < -1 || 
        number_y - zero_y < -1 ||
        number_x - zero_x != 0 && number_y - zero_y != 0
    ) { 
        console.log(`wrong click`)
        return 0
    }

    let tmpNumber = gameArray[number_y][number_x];
    gameArray[number_y][number_x] = 0;
    gameArray[zero_y][zero_x] = tmpNumber;
    
    drawGame()
}

let plateList = [];
function drawGame() {
    let strHTML = ``;

    for (let i = 0; i < gameSize; i++) {
        for (let j = 0; j < gameSize; j++) {
            if (gameArray[i][j] == 0) {
                strHTML += `<div style="visibility:hidden;">${gameArray[i][j]}</div>`
            } 
            else {
                strHTML += `<div>${gameArray[i][j]}</div>`
            }
        }
    }

    gameField.innerHTML = strHTML;

    plateList = document.querySelectorAll('#game_field > div')
    plateList.forEach((plate) => {
    plate.addEventListener('click', () => {
        movePlate(plate.textContent)
    })
})
}

startGame();
