import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { styles } from '../styles'
import { useGame } from '../game/useGame'
import { cpuMove } from '../game/cpu'
import { otherSign } from '../game/logic'
import { Board, GameHeader, ScoreBoard, WinningModal } from './parts'

const Game = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const mode = params.get('mode') === 'cpu' ? 'cpu' : 'local'
  const difficulty = params.get('difficulty') ?? 'medium'
  const p1Sign = params.get('p1') === 'O' ? 'O' : 'X'
  const cpuSign = otherSign(p1Sign)

  const [state, dispatch] = useGame()
  const { cells, turn, result, scores } = state
  const isCpuTurn = mode === 'cpu' && !result && turn === cpuSign

  useEffect(() => {
    if (!isCpuTurn) return
    // small delay so the CPU move reads as a "turn" instead of an instant flash
    const timer = setTimeout(() => {
      const index = cpuMove(cells, cpuSign, difficulty)
      if (index !== null) dispatch({ type: 'move', index })
    }, 450)
    return () => clearTimeout(timer)
  }, [isCpuTurn, cells, cpuSign, difficulty, dispatch])

  const handleCellClick = (index) => {
    if (isCpuTurn) return
    dispatch({ type: 'move', index })
  }

  const label = (sign) => {
    if (mode === 'cpu') return sign === p1Sign ? '(you)' : '(cpu)'
    return sign === p1Sign ? '(P1)' : '(P2)'
  }

  const headline =
    result && result.winner !== 'tie'
      ? mode === 'cpu'
        ? result.winner === p1Sign
          ? 'You win!'
          : 'CPU wins!'
        : `Player ${result.winner === p1Sign ? '1' : '2'} wins!`
      : ''

  return (
    <div className={styles.fullScreen}>
      <div className={`${styles.centering} gap-6`}>
        <GameHeader
          turnLabel={`${turn} turn`}
          onRestart={() => dispatch({ type: 'nextRound' })}
        />
        <Board
          cells={cells}
          winningCombo={result?.combo ?? []}
          hoverSign={isCpuTurn || result ? null : turn}
          onCellClick={handleCellClick}
        />
        <ScoreBoard scores={scores} xLabel={label('X')} oLabel={label('O')} />
      </div>
      {result && (
        <WinningModal
          winner={result.winner}
          headline={headline}
          onQuit={() => navigate('/')}
          onNextRound={() => dispatch({ type: 'nextRound' })}
        />
      )}
    </div>
  )
}

export default Game
