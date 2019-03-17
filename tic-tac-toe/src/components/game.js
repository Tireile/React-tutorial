import React from "react";
import Board from "./board";

import { lastElement } from "../utils";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      reverted: false
    };
  }

  handleClick(num, row, col) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = lastElement(history);

    // const squares = current.squares.slice();
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[num]) {
      return;
    }

    squares[num] = this.state.xIsNext ? "X" : "O";

    this.setState({
      // history: history.concat([
      //   {
      //     squares
      //   }
      // ]),
      history: [
        ...history,
        {
          squares,
          coords: { row, col }
        }
      ],
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  revert = () =>
    this.setState({
      reverted: !this.state.reverted
    });

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const { coords } = step;
      // const desc = move ? "Go to move #" + move : "Go to game start";
      const desc = move
        ? `Go to move #${move} [row: ${coords.row + 1}, col: ${coords.col + 1}]`
        : "Go to game start";

      const liClass = '';

      return (
        <li key={move}>
          <button 
            onClick={() => this.jumpTo(move)}
            className={(this.state.stepNumber === move) ? 'red': ''}
          >
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      current.squares.winSquares = winner[3];
      status = "Winner: " + winner[0];
    } else if (history.length === 10) {
      status = "draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(num, i, j) => this.handleClick(num, i, j)}
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <button className="btn-revert" onClick={this.revert}>
            Revert
          </button>
          <ol className="moves">
            {this.state.reverted ? moves.slice().reverse() : moves}
          </ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], squares[b], squares[c], lines[i]];
    }
  }
  return null;
}
