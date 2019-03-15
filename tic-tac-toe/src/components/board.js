import React from 'react';
import Square from './square';

export default class Board extends React.Component {
    renderSquare(i) {
      const { squares, onClick } = this.props;
  
      return <Square key={i} value={squares[i]} onClick={() => onClick(i)}/>;
    }
  
    render() {
      let squares = [];
      let num = 0;
      let row = [];
  
      for (let i = 1; i <= 3; i++) {
        row = [];
        for (let j = 1; j <= 3; j++) {
  
          row.push(this.renderSquare(num));
          num++;
        }
        squares.push(<div key={num} className="board-row">{row}</div>);
      }
  
      return <div>{squares}</div>;
    }
  }