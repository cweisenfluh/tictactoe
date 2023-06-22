import { Component } from '@angular/core';
import { GamePlay } from '../game-play';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [GamePlay]
})
export class GameComponent {

  constructor(public game: GamePlay) {

  }

  startGame(): void {
    this.game.gameStart();
    const status = this.game.currentTurn == 1 ? 'Human\'s turn' : 'Computer\'s turn';
    this.displayStatus(status);

      // slow it down a bit
    if (this.game.currentTurn == 2) {
      this.delay(1000).then(() => this.executeComputerTurn());
    }
  }

    // user has clicked on the board
  clickSquare(square: any) {

      // is the game live?
    if (this.game.gameStatus === 1) {
      const position = square.currentTarget.getAttribute('position');

        // did they click on a legal square?
      if (this.game.board[position] == 0) {

        // show the move
        this.updateSelection(position, square.currentTarget);

        // still playing
        if (this.game.gameStatus === 1) {
          // computers move
          this.delay(1000).then(() => this.executeComputerTurn());
        }
      }
    }
  }

    // the status text
  displayStatus(status: string): void {
    const statusMessage = document.querySelector('.current-status');
    if (statusMessage != null) statusMessage.innerHTML = status;
  }

  updateSelection(position: number, square: any) {
    this.game.setSquare(position, this.game.currentTurn);

      // seq squre to players color
    const color = this.game.getPlayerColorClass();
    square.classList.add(color);

      // determine game state
    const status = this.game.checkGameStatus();
    console.log("display status: " + status);

      // show it
    this.displayStatus(status);
  }

  executeComputerTurn(): void {
      // next move
    const position = this.getSelection();

      // emulate click
    const square = this.findByAttributeValue('position', position.toString(), 'div');

      // update
    this.updateSelection(position, square);
  }

  getSelection(): number {

      // player has made a selection
    if (this.game.board.includes(1) ) {
        // grab the middle if possible
      if (this.game.board[4] == 0) {
        return 4;
      }
    }

    let ct = 0;

      // a few tries
    while (ct++ < 4) {
      let selection = Math.floor(Math.random() * 9) + 1;
      if (this.game.board[selection] == 0) {
        return selection;
      }
    }

      // just pick a slot
    for (let i = 0; i < 9; ++i) {
      if (this.game.board[i] == 0) {
        return i;
      }
    }

    return 0;
  }

    // find an element by attribute
  findByAttributeValue(attribute: string, value: string, element_type: string): any {
    element_type = element_type || "*";
    var elements = document.getElementsByTagName(element_type);
    for (var i = 0; i < elements.length; i++) {
      if (elements[i].getAttribute(attribute) == value) { return elements[i]; }
    }
  }

  delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
