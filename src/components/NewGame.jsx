import React from 'react'
import { styles } from '../styles'
import {logo} from '../assets/index'
import { useNavigate } from "react-router-dom";

const NewGame = ({setPlayer1mark}) => {
    const navigate = useNavigate();
    
    const handleValueChange = (e) => {
        setPlayer1mark(prevState => ({
        ...prevState,
        sign: e.target.value
      }));
    };

  return (
    <div className={styles.fullScreen}>
        <div className={`${styles.centering} w-[327px] sm:w-[460px] gap-6`}>
            <img src={logo} alt="logo" />
            <div className='w-full bg-semiDarkNavy p-4 text-silver rounded-xl shadow-dark'>
                <p className='mb-2 text-[16px]'>pick player 1's mark</p>
                <div
                    className="grid grid-cols-2 space-x-2 rounded-xl bg-darkNavy p-2"
                    x-data="app"
                >
                    <div>
                    <input type="radio" name="option" id="X" className="peer hidden" value='X' defaultChecked onChange={handleValueChange} />
                    <label
                        htmlFor="X"
                        className={styles.radiobtnSign}
                    > X </label> 
                    </div>

                    <div>
                    <input type="radio" name="option" id="O" className="peer hidden" value='O' onChange={handleValueChange}/>
                    <label
                        htmlFor="O"
                        className={styles.radiobtnSign}
                    > O </label>
                    </div>
                </div>
                <p className='mt-2 text-[14px] text-opacity-50'>remember: X goes first</p>
            </div>
            
            <button 
                className={`${styles.newGamebtn} bg-lightBlue shadow-blue hover:bg-lightBlueHover`}
                onClick={() => navigate('/game-start')}
            >New game (vs player)</button>
        </div>
    </div>
  )
}

export default NewGame
