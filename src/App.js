import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NewGame, GameStart } from './components/index';

const App = () => {
  const [cells, setCells] = useState(Array(9).fill(''))
  const [player1mark, setPlayer1mark] = useState({number: 1, sign:'X'})
  const [player1, setPlayer1] = useState('X')
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [winningCombo, setWinningCombo] = useState([]);
  const [winner, setWinner] = useState('')
  const [gameIsOver, setGameIsOver] = useState(false);
  const [showWinningModal, setWinningModal] = useState(false)

  const checkScore = () => {
    const winnigCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6] 
    ]

    for (const combo of winnigCombos) {
      if (combo.every(cell => cells[cell].value === 'O')) {
        setOScore(oScore + 1);
        setGameIsOver(true);
        setWinningCombo(combo);
        setWinner('O')
        return
      }
  
      if (combo.every(cell => cells[cell].value === 'X')) {
        setXScore(xScore + 1)
        setGameIsOver(true);
        setWinningCombo(combo);
        setWinner('X')
        return
      }
    }

    if (cells.every(cell => cell !== '')) {
      setTieScore(tieScore + 1);
      setGameIsOver(true);
      setWinner('')
      return
    }
  }

  const restartbtn = () => {
    setCells(Array(9).fill(''))
    setPlayer1('X')
    setGameIsOver(false)
    setWinningCombo([])
    setWinningModal(false)
  }

  const quitbtn = () => {
    setCells(Array(9).fill(''))
    setPlayer1mark({number: 1, sign:'X'})
    setPlayer1('X')
    setGameIsOver(false)
    setWinningCombo([])
    setWinningModal(false)
    setXScore(0)
    setOScore(0)
    setTieScore(0)
  }

  useEffect(() => {
    checkScore()
    setPlayer1mark(player1mark)
    // eslint-disable-next-line
  }, [cells, player1mark])

  useEffect(() => {
    if (gameIsOver) {
      setWinningModal(true);
    }
  }, [gameIsOver])

  return (
    <BrowserRouter basename={window.location.pathname || ''} >
      <Routes>
        <Route exact path="/" element={<NewGame 
          setPlayer1mark={setPlayer1mark}
        />} />
        <Route exact path="/game-start" element={<GameStart 
            setCells={setCells}
            gameIsOver={gameIsOver}
            restartbtn={restartbtn}
            quitbtn={quitbtn}
            player1mark={player1mark}
            player1={player1}
            setPlayer1={setPlayer1}
            cells = {cells}
            xScore={xScore}
            oScore={oScore}
            tieScore={tieScore}
            winningCombo={winningCombo}
            winner={winner}
            showWinningModal={showWinningModal}
        />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
