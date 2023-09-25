/* Fiz todo o HTML e CSS, mas na parte do JS tive uma grande dificuldade,
peguei toda logica do jogo e fui mudando algumas partes para encaixar no meu trabalho,
além disso tive que usar uma funçãozinha que ajuda a mostrar e esconder o display*/ 

let jogador1 = 'um';
let jogador2 = 'dois';

function jogar(){
    var x = document.getElementById("hide");
    if (x.style.display === "none") {
    x.style.display = "block";
    } else {
    x.style.display = "none";
    }
    jogador1 = document.getElementById("j1").value;
    jogador2 = document.getElementById("j2").value;
    document.querySelector('.mostrarjogador').innerHTML = jogador1;
    document.getElementById("hidejogo").style.display = 'block';
}

window.addEventListener('DOMContentLoaded', () => {
    const quadrados = Array.from(document.querySelectorAll('.quadrado'));
    const playerDisplay = document.querySelector('.mostrarjogador');
    const resetButton = document.querySelector('.reiniciar');
    const anunciador = document.querySelector('.anunciador');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'um';
    const PLAYERO_WON = 'dois';
    const VEIA = 'VEIA';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            anunciar(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        anunciar(VEIA);
    }

    const anunciar = (type) => {
        switch(type){
            case PLAYERO_WON:
                anunciador.innerHTML = '<div class="nome"><br>Jogador <span class="jogadorO">' + jogador2 + '</span> ganhou !</div>';
                break;
            case PLAYERX_WON:
                anunciador.innerHTML = '<div class="nome"><br>Jogador <span class="jogadorX">' + jogador1 + '</span> ganhou !</div>';
                break;
            case VEIA:
                anunciador.innerHTML = '<div class="nome"><br>Veia!</div>';
        }
        anunciador.classList.remove('esconder');
    };

    const isValidAction = (quadrado) => {
        if (quadrado.innerText === 'X' || quadrado.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer === 'X' ? jogador1 : jogador2;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (quadrado, index) => {
        if(isValidAction(quadrado) && isGameActive) {
            quadrado.innerText = currentPlayer;
            quadrado.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        anunciador.classList.add('esconder');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        quadrados.forEach(quadrado => {
            quadrado.innerText = '';
            quadrado.classList.remove('playerX');
            quadrado.classList.remove('playerO');
        });
    }

    quadrados.forEach( (quadrado, index) => {
        quadrado.addEventListener('click', () => userAction(quadrado, index));
    });

    resetButton.addEventListener('click', resetBoard);
});