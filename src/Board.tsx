import * as React from "react"
import {Square} from "./Square"
import {Game} from "./Game"
class Item {
    squares:string[]
}
interface BoardProps {  handleClick:any, squares: string[] , game:Game}

export class Board extends React.Component<BoardProps,any> {

  renderSquare(i:any) {
    //console.log('render board')
    //console.log(' this.props.squares[i]: ', this.props.squares[i])
    //return <Square value={ this.props.squares[i] } onClick={  this.props.handleClick } game={this.props.game} />
    return <Square value={ this.props.squares[i] } index={i} game={this.props.game} />
  }

  render() {

    return (
      <div>
        <div className="status">Status:{this.props.game.state.xIsNext}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
