import * as React from "react";
import {Game} from "./Game"
class Item {
    squares:string[]
}
interface SquareProps {value:string, onClick?:any, game:Game, index:number }

/* stateless functional component */
export class Square extends React.Component<SquareProps,{}> {
  render() {
    return (
      <button className="square" onClick={() => this.props.game.handleClick(this.props.index) }>
        {this.props.value}
      </button>
    );
  }
}
