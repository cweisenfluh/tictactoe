import { Status } from "./game-status"

export class GamePlay {

    board: Array<number> = [];

    currentTurn: number;

    gameStatus: Status;

    winMatrixOne: Array<Array<number>> = [
        [1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 0, 1, 0, 0]
    ];

    winMatrixTwo: Array<Array<number>> = [
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],
        [0, 0, 2, 0, 2, 0, 2, 0, 0]
    ];

    public constructor() {
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.gameStatus = Status.STOP;
        this.currentTurn = 0;
    }

    public gameStart() {
        this.gameStatus = Status.START;
        this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentTurn = Math.floor(Math.random() * 2) + 1;

        var squares = document.getElementsByClassName('square');

        for (var square = 0; square < squares.length; square++) {
            if (squares[square].classList.contains('player-one')) {
                squares[square].classList.remove('player-one');
            }

            if (squares[square].classList.contains('player-two')) {
                squares[square].classList.remove('player-two');
            }
        }
    }

    setSquare(position: number, value: number): void {
        this.board[position] = value;
    }

    getPlayerColorClass(): string {
        const colorClass = (this.currentTurn == 2) ? 'player-two' : 'player-one';
        return colorClass;
    }

    changePlayer(): void {
        this.currentTurn = (this.currentTurn == 2) ? 1 : 2;
    }

    checkGameStatus(): string {

            // check to see if current player has won
        const controlMatrix = this.currentTurn == 1 ? this.winMatrixOne : this.winMatrixTwo;

        let ct = 0;
        controlMatrix.every((a) => {
            ct = 0;
            console.log('a: ' + a);
            a.forEach((b, idx) => {
                console.log('b: ' + b + ' idx: ' + idx + ' square: ' + this.board[idx]);

                if (b == this.board[idx] && b == this.currentTurn) {
                    console.log('match');
                    ++ct;
                }
            });

                // essentially a break
            if (ct == 3) {
                return false;
            }

            return true;
        });

            // we have a winner?
        if (ct == 3) {
            this.gameStatus = Status.STOP;
            return this.currentTurn == 1 ? 'Human Wins!' : 'Computer Wins!';
        }

            // game over?
        if (!this.board.includes(0)) {
            this.gameStatus = Status.STOP;
            return "Game Over";
        }

            // next player
        this.changePlayer();

        console.log("next player: " + this.currentTurn);
       
        return this.currentTurn == 1 ? 'Human\'s turn' : 'Computer\'s turn';
    }
}

