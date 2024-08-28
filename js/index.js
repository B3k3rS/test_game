const gameField = document.querySelector('#game_field');
const mixButton = document.querySelector('button.mix_game')
// let gameArray = [
//     [[1],[2],[3],[4]],
//     [[5],[6],[7],[8]],
//     [[9],[10],[11],[12]],
//     [[13],[14],[15],[16]]
// ];

let gameArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

mixButton.addEventListener('click', () => {
    mixGame()
})

function mixGame() {
    // for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         let rand1 = Math.floor(Math.random()*4);
    //         let rand2 = Math.floor(Math.random()*4);

    //         if(rand1 == rand2 & rand1 == 3 || i == j & i == 3) continue            
    //         swapElement(i,j,rand1,rand2);
    //     }
    // }

    for (let i = 0; i < 15; i++) {
        let randIndex = Math.floor(Math.random()*15);

        swapElement(i, randIndex)
    }

    drawGame()
}

// function swapElement(y_element1,x_element1,y_element2,x_element2) {
//     let tmpElement = gameArray[y_element1][x_element1];
//     gameArray[y_element1][x_element1] = gameArray[y_element2][x_element2];
//     gameArray[y_element2][x_element2] = tmpElement;
// }

function swapElement(index1,index2) {
    let tmpElement = gameArray[index1];
    gameArray[index1] = gameArray[index2]
    gameArray[index2] = tmpElement; 
}

function drawGame() {
    let tmpHTML = ""
    // for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         tmpHTML += gameArray[i][j] == 16 ? `<div style="visibility:hidden;">${gameArray[i][j]}</div>` : `<div>${gameArray[i][j]}</div>`;
    //     }
    // }

    for (let i = 0; i < 16; i++) {
        tmpHTML += gameArray[i] == 16 ? `<div style="visibility:hidden;" data-value-type="zero">${gameArray[i]}</div>` : `<div>${gameArray[i]}</div>`;
    }
    gameField.innerHTML = tmpHTML;

    let gamePlate = document.querySelectorAll('#game_field > div')
    gamePlate.forEach((plate)=>{
        plate.addEventListener('click',() => {
            movePlate(plate.textContent);
        })
    })
}
// ------------------------------------------------------
function movePlate(plateNumber) {
    let numberCords = getCords(plateNumber);
    // let zeroCords = getCords(16);

    // if (!clickValidate(numberCords,zeroCords)) return 0;
    if (!clickValidate(numberCords)) return 0;

    swapElement(numberCords,zeroCords);
    drawGame();
    setTimeout(()=>{checkWin()},100)
}

function getCords(number) {
    // for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         if (gameArray[i][j] == number) return {i,j};
    //     }
    // }

    for (let i = 0; i < 16; i++) {
        if (gameArray[i] == number) return i;
    }
}

// function clickValidate(numberCords,zeroCords) {
//     if (
//         // Math.max(y_element1,y_element2) - Math.min(y_element1,y_element2) > 1 ||
//         // Math.max(x_element1,x_element2) - Math.min(x_element1,x_element2) > 1 ||
//         // x_element1 - x_element2 != 0 && y_element1 - y_element2 != 0

//         Math.max(numberCords,zeroCords) - Math.min(numberCords,zeroCords) == 1 ||
//         Math.max(numberCords,zeroCords) - Math.min(numberCords,zeroCords) == 4
//     ) {
//         return true;
//     }
//     return false;
// }

function clickValidate(clickedPlate) { 
    let gamePlate = document.querySelectorAll('#game_field > div')

    let rightPlate = gamePlate[clickedPlate].nextElementSibling || null;
    let leftPlate = gamePlate[clickedPlate].previousElementSibling || null;
    let bottomPlate = gamePlate[clickedPlate+4] || null;
    let upPlate = gamePlate[clickedPlate-4] || null;

    

    if (
        rightPlate && rightPlate.hasAttribute("data-value-type") ||
        leftPlate && leftPlate.hasAttribute("data-value-type") ||
        bottomPlate && bottomPlate.hasAttribute("data-value-type") ||
        upPlate && upPlate.hasAttribute("data-value-type")
    ) {
        return true
    }

    return false

}


function checkWin() {
    let wrongPossition = 0;
    // for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 4; j++) {
    //         if (gameArray[i][j] != i*4+j+1) wrongPossition++;
    //     }
    // }

    for (let i = 0; i < 16; i++) {
        if (gameArray[i] != i+1) wrongPossition++;
    }

    if (wrongPossition == 0) alert('Победа')
}

drawGame();