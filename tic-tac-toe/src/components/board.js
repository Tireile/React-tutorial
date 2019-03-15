import React from 'react';
import Square from './square';

export default class Board extends React.Component {
  renderSquare(num, i, j) {
    const { squares, onClick } = this.props;

    return (
      <Square
        key={num}
        value={squares[num]}
        onClick={() => onClick(num, i, j)}
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
