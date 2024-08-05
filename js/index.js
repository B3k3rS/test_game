const gameField = document.querySelector('#game_field');
const gamePlate = document.querySelectorAll('#game_field > div')
const zeroPlate = document.querySelector('#game_field .zero_plate')
const mixButton = document.querySelector('button.mix_game')
const gameSize = Math.floor(Math.sqrt(gamePlate.length))

gamePlate.forEach((plate) => {
    plate.addEventListener('click', () => {
        if (!clickValidate(plate,zeroPlate)) return 0;
        movePlate(plate,zeroPlate);
        setTimeout(()=>{checkWin()},300)
    })
})

mixButton.addEventListener('click', () => {
    mixGame();
})

function mixGame() {
    gamePlate.forEach((plate,id) => {
        if (id == gamePlate.length-1) return 0;
        let random = Math.floor(Math.random() * (gamePlate.length-1))
        movePlate(plate,gamePlate[random])
    })
}

function clickValidate(plate, zero) {
    let plateTop = parseInt(plate.style.top.replace(/\D/g,''))
    let plateLeft = parseInt(plate.style.left.replace(/\D/g,''))
    let zeroTop = parseInt(zero.style.top.replace(/\D/g,''))
    let zeroLeft = parseInt(zero.style.left.replace(/\D/g,''))

    if (
        Math.max(plateLeft,zeroLeft) - Math.min(plateLeft,zeroLeft) > 55 ||
        Math.max(plateTop,zeroTop) - Math.min(plateTop,zeroTop) > 55 ||
        plateTop - zeroTop != 0 & plateLeft - zeroLeft != 0
    ) {
        return false;
    } 
    return true;
}

function movePlate(plate1, plate2) {
    let tmpTop = plate1.style.top;
    let tmpLeft = plate1.style.left;
    plate1.style.top = plate2.style.top;
    plate1.style.left = plate2.style.left;
    plate2.style.top = tmpTop;
    plate2.style.left = tmpLeft;
}

function checkWin() {
    let wrongPosition = 0;
    gamePlate.forEach((plate, id) => {
        if (
            plate.style.top != `${Math.floor(id/gameSize) * 55+20}px` ||
            plate.style.left != `${id%gameSize * 55+20}px`
        ) {
            wrongPosition++;
        }
    })

    if (!wrongPosition) alert('Победа')
}

startGame()

function startGame() {
    gameField.style.width = `${gameSize * 50 + 55}px`;
    gameField.style.height = `${gameSize * 50 + 55}px`;

    gamePlate.forEach((plate,id)=> {
        plate.style.top = `${Math.floor(id/gameSize) * 55+20}px`;
        plate.style.left = `${id%gameSize * 55+20}px`;
    })
}