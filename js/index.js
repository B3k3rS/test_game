const gameField = document.querySelector('#game_field');
const gamePlate = document.querySelectorAll('#game_field > div')
const zeroPlate = document.querySelector('#game_field .zero_plate')
const mixButton = document.querySelector('button.mix_game')

gamePlate.forEach((plate) => {
    plate.addEventListener('click', () => {
        if (clickValidate(plate.style.order,zeroPlate.style.order)) {
            movePlate(plate,zeroPlate);
        }
    })
})

mixButton.addEventListener('click', () => {
    mixGame();
})

function mixGame() {
    gamePlate.forEach((plate) => {
        if (plate.style.order == 16) return 0;
        let random = Math.floor(Math.random() * 15)
        movePlate(plate,gamePlate[random])
    })
}

function clickValidate(plateOrder, zeroOrder) {
    if (
        Math.max(plateOrder,zeroOrder) - Math.min(plateOrder,zeroOrder) == 1 ||
        Math.max(plateOrder,zeroOrder) - Math.min(plateOrder,zeroOrder) == 4
    ) {
        return true;
    } 
    return false;
}

function movePlate(plate1, plate2) {
    let tmpOrder = plate1.style.order;
    plate1.style.order = plate2.style.order;
    plate2.style.order = tmpOrder;

    checkWin()
}

function checkWin() {
    let wrongPosition = 0;
    gamePlate.forEach((plate, id) => {
        console.log(plate.style.order,id+1)
        if (plate.style.order != id+1) {
            wrongPosition++;
        }
    })

    if (!wrongPosition) setTimeout(()=> {alert('Победа')},100)
}
