import React, {useState} from 'react'
import {iconO, iconX, iconXoutline, iconOoutline} from '../../assets/index'

const Cell = ({id, cell, setCells, player1, setPlayer1, cells, winningCombo, gameIsOver}) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleCellClick = (e) => {
        if (gameIsOver) {
          return;
        }

        const id = parseInt(e.target.id); 
        const value = player1 === 'X' ? 'X' : 'O'
        
        if (cells[id] === '') {
          const nextCells = [...cells];
          nextCells[id] = { value, isEmpty: false };
          setCells(nextCells);
          setPlayer1(player1 === 'O' ? 'X' : 'O');
        }
    }

    return(
        <div 
            className="bg-semiDarkNavy w-[96px] sm:w-[140px] h-[96px] sm:h-[140px] flex items-center justify-center rounded-xl shadow-dark" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            id={id} 
            onClick={handleCellClick}
        >
            {isHovered && !cell &&  (
                <img className="pointer-events-none" src={player1 === 'X' ? iconXoutline : iconOoutline} alt='X' />
            )}
            {cell.value === 'O' && (!winningCombo || winningCombo.includes(id) ? <img src={iconOoutline} alt="O" /> : <img src={iconO} alt="O" />)}
            {cell.value === 'X' && (!winningCombo || winningCombo.includes(id) ? <img src={iconXoutline} alt="X" /> : <img src={iconX} alt="X" />)}
        </div>
    )
}

export default Cell