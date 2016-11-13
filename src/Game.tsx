import * as React from "react";
import {Board} from "./Board"
import {Square} from "./Square"

class Item {
    squares:string[]
}
interface GameProps { }
interface GameState {
  status?: string, 
  stepNumber?:number,
  squares?: string[],  
  xIsNext?:any,
  history?:Array<Item> 
}

export class Game extends React.Component <GameProps,GameState>{

  status:string;

  constructor() {
    super()
    this.state = {
      status: "Next Player is X",
      squares: this.initSquares(null),
      history: [{
        squares:  this.initSquares(null)
      }],
      stepNumber:0,
      xIsNext:true,
    }; 
  }

  initSquares(value:string) {
    let squares = new Array(9)
    for( let i =0; i<squares.length; i++) {
      squares[i] = value
    }
    return squares; 
  }
  
  handleClick(i:any) {
    console.log('handleClick:',i,this.state.stepNumber)
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    console.log('squares',squares)

    if (this.calculateWinner(squares) || this.state.stepNumber > 9) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
   // console.log('s', this.state.history)
    
    history.concat(history)
    this.setState({
      history:history.concat([{
                squares: squares
      }]),
      stepNumber:this.state.stepNumber+1,
      xIsNext: !this.state.xIsNext, //toggle xIsNext
    });

  }

  calculateWinner(squares:string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(move:number) {
    console.log('move',move)
    this.setState({
      stepNumber: move,
      xIsNext: (move % 2) ? false : true,
    });
  }

  render() {
    //console.log('s: ',if(this.state.current)
    const history = this.state.history;
    const current = history[this.state.stepNumber];//this.state.stepNumber
    let winner = this.calculateWinner( this.state.squares );

    let status:string;
        status = "Next Player is " + (this.state.xIsNext ? 'O' : 'X');  
    if (winner) {
      this.setState({
        status: 'Winner: ' + winner,
        squares: this.initSquares(''),
        history: this.initSquares(''),
      });
    }
    
    const moves = this.state.history.map( (step:Item, move:number) => {
      const desc = move ? 'Move #' + move : 'Game start';
      return (
        <li key={move}>
          <a href="#"  onClick={ () => this.jumpTo(move) } >{move}-{desc}</a>
        </li>
      );
    });
    


    return (
      <div className="game">
        <div className="game-board">
         <Board squares={current.squares} handleClick={this.handleClick} game={this}/>
        </div>
        <div className="game-info">
          <div>{current.squares}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}