import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  
  renderSquare(num, row, col) {
    const coords = { row, col }
    const { squares, onClick, winner } = this.props;
    const winSquare = winner ? winner[3].includes(num): false;

    return (
      <Square
        key={num}
        win={winSquare}
        value={squares[num]}
        onClick={() => onClick(num, coords)}
      />
    );
  }

  render() {

    let squares = [];
    let num = 0;
    let row = [];

    for (let i = 0; i < 3; i++) {
      row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(num, i, j));
        num++;
      }
      squares.push(<div key={num} className="board-row">{row}</div>);
    }

    return <div>{squares}</div>;
  }
}
