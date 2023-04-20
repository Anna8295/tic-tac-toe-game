import React from 'react'
import { styles } from '../styles'
import {logo, restart} from '../assets/index'
import {Cell, WinningModal }  from './parts/index';



const GameStart = ({restartbtn, quitbtn, setCells, player1, setPlayer1, cells, player1mark, xScore, oScore, tieScore, winningCombo, winner, gameIsOver, showWinningModal}) => {
  return (
    <div className={styles.fullScreen}>
        <div className={`${styles.centering} gap-6`}>
        <div className='w-[328px] sm:w-[457px] flex justify-between px-2'>
            <img className='object-none' src={logo} alt="logo" />
            <div className='w-[96px] sm:w-[140px] h-[40px] sm:h-[52px] bg-semiDarkNavy mr-8 sm:mr-4 flex items-center justify-center rounded-xl shadow-darkSmall text-silver text-[20px]'>
                <p className='text-[16px] sm:text-[20px]'>{player1}&nbsp; <span className='text-[14px] sm:text-[16px] inline-block align-text-bottom'>turn</span></p>
            </div>
            <button 
                className='w-[40px] sm:w-[52px] h-[40px] sm:h-[52px] flex items-center justify-center bg-silver rounded-xl shadow-greySmall hover:bg-silverHover'
                onClick={restartbtn}
            >
                <img src={restart} alt="restart" />
            </button>
        </div>
        <div className='grid grid-cols-3 gap-4'>
            {cells.map((cell, index) => 
            <Cell 
                key={index} 
                id={index} 
                cell={cell} 
                setCells={setCells}
                player1={player1}
                setPlayer1={setPlayer1}
                cells = {cells}
                gameIsOver={gameIsOver}
                winningCombo={winningCombo}
            />
            )}
        </div>
        <div className='flex items-center justify-between gap-4 text-darkNavy'>
            <div className={`${styles.scorediv} bg-lightBlue`}>
                <p className={styles.scoreText}>X {player1mark.sign === 'X' ? '(P1)' : '(P2)'}</p>
                <p className={styles.scoreNumber}>{xScore}</p>
            </div>
            <div className={`${styles.scorediv} bg-silver`}>
                <p className={styles.scoreText}>ties</p>
                <p className={styles.scoreNumber}>{tieScore}</p>
            </div>
            <div className={`${styles.scorediv} bg-lightYellow`}>
                <p className={styles.scoreText}>O {player1mark.sign === 'O' ? '(P1)' : '(P2)'}</p>
                <p className={styles.scoreNumber}>{oScore}</p>
            </div>
        </div>
        </div>
        {showWinningModal && <WinningModal restartbtn={restartbtn} quitbtn={quitbtn} player1mark={player1mark} winner={winner}/>}
    </div>
  )
}

export default GameStart
