const gameField = document.querySelector('#game_field');
const mixButton = document.querySelector('button.mix_game')

// let gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
let gameArray = [1, 3, 6, 13, 5, 2, 7];

mixButton.addEventListener('click', () => {
    mixGame()
})

function mixGame() {
    for (let i = 0; i < gameArray.length; i++) {
        let randIndex = Math.floor(Math.random()*(gameArray.length));
        gameField.insertBefore(gameField.children[i],gameField.children[randIndex])
    }
}

function startGame() {
    let tmpHTML = ""
    for (let i = 0; i < gameArray.length+1; i++) {
        tmpHTML += i == gameArray.length ? `<div data-value-index="${gameArray[i]}" data-value-type="empty"></div>` : `<div data-value-index="${gameArray[i]}">${gameArray[i]}</div>`;

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

    let plateId = Array.from(gameField.children).indexOf(plate);
    let bottomPlate = gameField.children[plateId+4];
    let upPlate = gameField.children[plateId-4];
    
    switch (true) {
        case rightPlate && rightPlate.hasAttribute("data-value-type"):
            gameField.insertBefore(rightPlate, plate)
            break;
        case leftPlate && leftPlate.hasAttribute("data-value-type"):
            gameField.insertBefore(plate, leftPlate)        
            break;
        case bottomPlate && bottomPlate.hasAttribute("data-value-type"):
            gameField.insertBefore(plate,bottomPlate)
            gameField.insertBefore(bottomPlate,gameField.children[plateId])
            break;
        case upPlate && upPlate.hasAttribute("data-value-type"):
            gameField.insertBefore(upPlate,plate)
            gameField.insertBefore(plate,gameField.children[plateId-4])
            break;
    }

    setTimeout(() => checkWin(), 100);
    // checkWin()
}

function checkWin() {
    let wrongPossition = 0;
    
    for (let i = 0; i < gameArray.length; i++) {
        if (gameArray[i] != gameField.children[i].dataset.valueIndex) wrongPossition++;
    }

    if (wrongPossition == 0) alert('Победа')
}

startGame();
