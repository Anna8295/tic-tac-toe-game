import React from 'react'
import { useNavigate } from "react-router-dom";
import {iconO, iconX} from '../../assets/index'
import { styles } from '../../styles';


const WinningModal = ({restartbtn, quitbtn, player1mark, winner}) => {
  const navigate = useNavigate();
  return (
    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-70'>
      <div className={`${styles.centering} w-full bg-semiDarkNavy py-8 gap-4`}>
        { winner ?
          <p className='text-silver'>Player {winner === 'X' && player1mark.sign === 'X' ? '1' : winner === 'O' && player1mark.sign === 'O' ? '1' : '2'} wins!</p>
        : ' '  } 
        <div>
          {winner ? 
          <div className='flex justify-center items-center gap-4'>
            <img src={winner === 'X' ? iconX : iconO} alt='iconX-O'/>
            <h1 
              className='text-[24px] sm:text-[40px]'
              style={{color: winner === 'X' ? '#31C3BD' : '#F2B137'}}  
            >Takes the round</h1>
          </div> 
          : <h1 className='text-[24px] sm:text-[40px] text-silver'>Round Tied</h1> }
        </div> 
        <div >
          <button 
            className='bg-silver text-darkNavy rounded-xl py-2 px-4 mr-4 shadow-greySmall hover:bg-silverHover'
            onClick={(e ) => {quitbtn(); navigate('/')}}  
          >Quit</button>
          <button 
            className='bg-lightYellow text-darkNavy rounded-xl py-2 px-4 shadow-yellowSmall hover:bg-lightYellowHover'
            onClick={restartbtn}
          >Next Round</button>
        </div>
      </div>
    </div>
  )
}

export default WinningModal
