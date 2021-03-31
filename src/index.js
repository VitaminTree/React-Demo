import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = this.props.rowCount; 
    const columns = this.props.colCount;
    var i, j;
    var container = [];
    for (i=0; i < rows; i++) {
      var squares = [];
      for (j=0; j < columns; j++) {
        squares.push(this.renderSquare(columns*i+j));
      }
      container.push(<div className="board-row">{squares}</div>);
    }
    return <div>{container}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 2,
      columns: 12,
      history: [{
        squares: Array(100).fill(null), /* Code appears to work despite this array initalizing incorrect # of slots */
        prevRow: -1,
        prevCol: -1,
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
 
    this.setState({
      history: history.concat([{
        squares: squares,
        prevRow: (i%(this.state.columns))+1,
        prevCol: (Math.floor(i/(this.state.columns)))+1,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext, /* Effectively flipping the value of this boolean*/
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        "Move #" + move + ": " + (move%2 === 1? "X" : "O") + " => (" + step.prevRow + ", " + step.prevCol +")":
        "Go to game start";
      return (
        <li key ={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            rowCount={this.state.rows}
            colCount={this.state.columns}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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