var origBoard;

var winCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
];
var winner = '';
const cells = document.querySelectorAll(".cell");
startGame();

function startGame() {
    resetStyles();
    //document.querySelector('.end-game').style.display = 'none';
    document.querySelector('.restart').style.display = 'none';
    document.querySelector(".winLabel").innerText = ''; 
    origBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        console.log(cells[i]);
        cells[i].addEventListener('click', turnClick);
    }
}

function aiTurn() { 
    let moveMade = false;
    if (checkIfAllCellsFilled()) {
        document.querySelector(".winLabel").innerText = 'Match Drawn';
        document.querySelector('.restart').style.display = 'inline-block';
        return;
    }
    while (moveMade === false) {
        //let index = getRandomInt(9);
        let index = getRightMoveIndex();
        if (index && cells[index].innerText !== 'X' && cells[index].innerText !== 'O') {
            cells[index].innerText = 'O';
            moveMade = true;
        }
    }
    if (checkForWinner()) {
        document.querySelector(".winLabel").innerText = 'AI Won';
        //document.querySelector('.end-game').style.display = 'inline-block';
        //document.querySelector('.end-game').innerText = ' AI Won!';
        document.querySelector('.restart').style.display = 'inline-block';
    }
}

function reset() {
    winner = '';
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRightMoveIndex() {
    let partnerWinningComb = getPartnerWinningComb();
    if (partnerWinningComb.length > 0) {
        let index = partnerWinningComb.filter(i => {
            if (cells[i].innerText === '') {
                return true;
            }
        });
        return index;
    }
    let index;
    winCombs.forEach((comb) => {
        comb.forEach((i) => {
            if (cells[i].innerText !== 'X' && cells[i].innerText !== 'O') {
                index = i;
            }
        })
    });
    return index;
}

function getPartnerWinningComb() {
    let arr = [];
    outerLoop:
    for (const comb of winCombs) {
        innerLoop:
        for (let i = 0; i < comb.length - 1; i++) {
            if (comb.filter(value => cells[value].innerText === 'X').length === 2) {
                if (comb.some(i => cells[i].innerText === '')) {
                    arr = comb;
                    break outerLoop;
                }
            }
        }
    }
    return arr;
}

function turnClick($event) {
    if (winner !== '') {
        //reset();
        return;
    }
    console.log($event);
    console.log('clicked');
    if ($event.target.innerText !== 'X' && $event.target.innerText !== 'O') {
        $event.target.innerText = 'X';
        if (checkForWinner()) {
            document.querySelector(".winLabel").innerText = 'You Won';
            //document.querySelector('.end-game').style.display = 'inline-block';
            document.querySelector('.restart').style.display = 'inline-block';
        } else if (checkIfAllCellsFilled()) {
            document.querySelector(".winLabel").innerText = 'Match Drawn';
            document.querySelector('.restart').style.display = 'inline-block';
        } else { 
            aiTurn();
        }
    } 
}  

function checkIfAllCellsFilled() {
    if (winCombs.every(comb => comb.every(value => cells[value].innerText === 'X' || cells[value].innerText === 'O'))) {
        return true;
    }
}

function resetStyles() {
    winner = '';
    winCombs.forEach((comb) => {
        comb.forEach(index => cells[index].style.backgroundColor = 'transparent');
    });
}

function checkForWinner() {
    console.log('checking for Winner');
    winnerFound = false;

    for (const comb of winCombs) {
        if (comb.every((index) => cells[index].innerText === 'X')) {
            winnerFound = true;
            comb.forEach(index => cells[index].style.backgroundColor = '#ADFF2F');
            winner = 'X';
            break;
        } else if (comb.every((index) => cells[index].innerText === 'O')) {
            winnerFound = true;
            comb.forEach(index => cells[index].style.backgroundColor = '#FF0000');
            winner = 'O';
            break;
        }
    }

    if (winnerFound) {
        console.log('Winner found')
    }
    return winnerFound;
}


