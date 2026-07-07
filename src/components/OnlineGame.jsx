import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { styles } from '../styles'
import { useGame } from '../game/useGame'
import { otherSign } from '../game/logic'
import { usePeerGame } from '../online/usePeerGame'
import { Board, GameHeader, ScoreBoard, WinningModal } from './parts'

const ERROR_MESSAGES = {
  'peer-unavailable': 'Room not found — check the code and try again.',
  'unavailable-id': 'This room code is already in use — create a new room.',
}

const OnlineGame = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [search] = useSearchParams()
  const role = params.role === 'host' ? 'host' : 'guest'
  const code = params.code?.toUpperCase() ?? ''
  const hostSign = search.get('p1') === 'O' ? 'O' : 'X'

  const [mySign, setMySign] = useState(role === 'host' ? hostSign : null)
  const [opponentLeft, setOpponentLeft] = useState(false)
  const [state, dispatch] = useGame()
  const { cells, turn, result, scores } = state

  const { status, errorType, send } = usePeerGame({
    role,
    code,
    onMessage: (message) => {
      switch (message?.type) {
        case 'config':
          setMySign(otherSign(message.hostSign))
          break
        case 'move':
          dispatch({ type: 'move', index: message.index })
          break
        case 'nextRound':
          dispatch({ type: 'nextRound' })
          break
        case 'quit':
          setOpponentLeft(true)
          break
        default:
          break
      }
    },
  })

  // the guest learns which mark is theirs from the host's config message
  useEffect(() => {
    if (status === 'connected' && role === 'host') {
      send({ type: 'config', hostSign })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, role, hostSign])

  const myTurn = mySign !== null && turn === mySign && !result

  const handleCellClick = (index) => {
    if (!myTurn || cells[index]) return
    dispatch({ type: 'move', index })
    send({ type: 'move', index })
  }

  const nextRound = () => {
    dispatch({ type: 'nextRound' })
    send({ type: 'nextRound' })
  }

  const quit = () => {
    send({ type: 'quit' })
    navigate('/')
  }

  if (opponentLeft || (status === 'closed' && !result)) {
    return (
      <Screen>
        <p>Your opponent left the game.</p>
        <BackButton onClick={() => navigate('/online')} label="back to lobby" />
      </Screen>
    )
  }

  if (status !== 'connected' || !mySign) {
    return (
      <Screen>
        {status === 'waiting' ? (
          <>
            <p>share this room code with your friend</p>
            <p className="text-[40px] tracking-[0.3em] text-lightYellow">{code}</p>
            <p className="text-[14px] animate-pulse">waiting for them to join…</p>
          </>
        ) : status === 'error' ? (
          <p>{ERROR_MESSAGES[errorType] ?? 'Connection failed. Please try again.'}</p>
        ) : status === 'closed' ? (
          <p>The connection was closed.</p>
        ) : (
          <p className="animate-pulse">connecting…</p>
        )}
        <BackButton onClick={() => navigate('/online')} label="back to lobby" />
      </Screen>
    )
  }

  const label = (sign) => (sign === mySign ? '(you)' : '(friend)')
  const headline =
    result && result.winner !== 'tie'
      ? result.winner === mySign
        ? 'You win!'
        : 'Your friend wins!'
      : ''

  return (
    <div className={styles.fullScreen}>
      <div className={`${styles.centering} gap-6`}>
        <GameHeader
          turnLabel={myTurn ? 'your turn' : "friend's turn"}
          onRestart={nextRound}
        />
        <Board
          cells={cells}
          winningCombo={result?.combo ?? []}
          hoverSign={myTurn ? mySign : null}
          onCellClick={handleCellClick}
        />
        <ScoreBoard scores={scores} xLabel={label('X')} oLabel={label('O')} />
      </div>
      {result && (
        <WinningModal
          winner={result.winner}
          headline={headline}
          onQuit={quit}
          onNextRound={nextRound}
        />
      )}
    </div>
  )
}

const Screen = ({ children }) => (
  <div className={styles.fullScreen}>
    <div className={`${styles.centering} w-[327px] sm:w-[460px] gap-6 text-silver animate-riseIn`}>
      {children}
    </div>
  </div>
)

const BackButton = ({ onClick, label }) => (
  <button
    className={`${styles.newGamebtn} bg-silver text-darkNavy shadow-grey hover:bg-silverHover`}
    onClick={onClick}
  >
    {label}
  </button>
)

export default OnlineGame
