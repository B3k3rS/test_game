const gameField = document.querySelector('#game_field');
const mixButton = document.querySelector('button.mix_game')

let gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

mixButton.addEventListener('click', () => {
    mixGame()
})

function mixGame() {
    for (let i = 0; i < 15; i++) {
        let randIndex = Math.floor(Math.random()*15);

        let tmpElement = gameArray[i];
        gameArray[i] = gameArray[randIndex]
        gameArray[randIndex] = tmpElement; 
    }

    drawGame()
}

function drawGame() {
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

function movePlate(plate) {
    let rightPlate = plate.nextElementSibling;
    let leftPlate = plate.previousElementSibling;
    let bottomPlate = document.querySelector(`div[data-value-index="${Number(plate.dataset.valueIndex)+4}"]`);
    let upPlate = document.querySelector(`div[data-value-index="${Number(plate.dataset.valueIndex)-4}"]`);
    
    switch (true) {
        case rightPlate && rightPlate.hasAttribute("data-value-type"):
            swapElement(plate,rightPlate,'right');
            break;
        case leftPlate && leftPlate.hasAttribute("data-value-type"):
            swapElement(plate,leftPlate,'left');            
            break;
        case bottomPlate && bottomPlate.hasAttribute("data-value-type"):
            swapElement(plate, bottomPlate, 'bottom');
            break;
        case upPlate && upPlate.hasAttribute("data-value-type"):
            swapElement(plate, upPlate, 'top');
            break;
    }

    setTimeout(() => checkWin(), 100);
}

function swapElement(plate1,plate2,side) { 
    switch (side) {
        case 'right':
            gameField.insertBefore(plate2, plate1)
            break;
        case 'left':
            gameField.insertBefore(plate1, plate2)
            break;
        case 'top':
            gameField.insertBefore(plate2,plate1)
            gameField.insertBefore(plate1,gameField.children[plate2.dataset.valueIndex])
            break;
        case 'bottom':
            gameField.insertBefore(plate1,plate2)
            gameField.insertBefore(plate2,gameField.children[plate1.dataset.valueIndex])
            break;
    }

    let tmpIndex = plate1.dataset.valueIndex;
    plate1.dataset.valueIndex = plate2.dataset.valueIndex;
    plate2.dataset.valueIndex = tmpIndex;
}

function checkWin() {
    let wrongPossition = 0;

    for (let i = 0; i < 15; i++) {
        let plate = gameField.children[i]
        if (plate.dataset.valueIndex != Number(plate.textContent)-1) wrongPossition++;
    }

    if (wrongPossition == 0) alert('Победа')
}

drawGame();
