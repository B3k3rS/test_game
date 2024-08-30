const gameField = document.querySelector('#game_field');
const mixButton = document.querySelector('button.mix_game')

let gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

mixButton.addEventListener('click', () => {
    mixGame()
})

function mixGame() {
    for (let i = 0; i < 15; i++) {
        let randIndex = Math.floor(Math.random()*15);
        movePlate(gameField.children[i],gameField.children[randIndex])
    }
}

function startGame() {
    let tmpHTML = ""
    for (let i = 0; i < 16; i++) {
        tmpHTML += gameArray[i] == 16 ? `<div data-value-index="${i}" data-value-type="empty"></div>` : `<div data-value-index="${i}">${gameArray[i]}</div>`;
    }
    gameField.innerHTML = tmpHTML;

    let gamePlate = document.querySelectorAll('#game_field > div')
    gamePlate.forEach((plate)=>{
        plate.addEventListener('click',(e) => {
            movePlate(e.currentTarget);
        })
    })
}

function movePlate(plate,plate2) {
    let rightPlate = plate.nextElementSibling;
    let leftPlate = plate.previousElementSibling;
    let bottomPlate = document.querySelector(`div[data-value-index="${Number(plate.dataset.valueIndex)+4}"]`);
    let upPlate = document.querySelector(`div[data-value-index="${Number(plate.dataset.valueIndex)-4}"]`);
    
    switch (true) {
        case !!plate2:
            gameField.insertBefore(plate,plate2);
            swapIndex(plate,plate2)
            break;
        case rightPlate && rightPlate.hasAttribute("data-value-type"):
            gameField.insertBefore(rightPlate, plate)
            swapIndex(plate,rightPlate);
            break;
        case leftPlate && leftPlate.hasAttribute("data-value-type"):
            gameField.insertBefore(plate, leftPlate)
            swapIndex(plate,leftPlate);            
            break;
        case bottomPlate && bottomPlate.hasAttribute("data-value-type"):
            gameField.insertBefore(plate,bottomPlate)
            gameField.insertBefore(bottomPlate,gameField.children[plate.dataset.valueIndex])
            swapIndex(plate, bottomPlate);
            break;
        case upPlate && upPlate.hasAttribute("data-value-type"):
            gameField.insertBefore(upPlate,plate)
            gameField.insertBefore(plate,gameField.children[upPlate.dataset.valueIndex])
            swapIndex(plate, upPlate);
            break;
    }

    setTimeout(() => checkWin(), 100);
}

function swapIndex(plate1,plate2) { 
    let tmpIndex = plate1.dataset.valueIndex;
    plate1.dataset.valueIndex = plate2.dataset.valueIndex;
    plate2.dataset.valueIndex = tmpIndex;

    let tmpElement = gameArray[plate1.dataset.valueIndex];
    gameArray[plate1.dataset.valueIndex] = gameArray[plate2.dataset.valueIndex]
    gameArray[plate2.dataset.valueIndex] = tmpElement; 
}

function checkWin() {
    let wrongPossition = 0;
    
    for (let i = 0; i < 15; i++) {
        if (i+1 != gameArray[i]) wrongPossition++;
    }

    if (wrongPossition == 0) alert('Победа')
}

startGame();
