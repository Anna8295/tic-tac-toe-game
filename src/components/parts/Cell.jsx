import { useState } from 'react'
import { iconO, iconX, iconXoutline, iconOoutline } from '../../assets'

const icons = {
  X: { filled: iconX, outline: iconXoutline },
  O: { filled: iconO, outline: iconOoutline },
}

const Cell = ({ value, hoverSign, isWinning, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className="bg-semiDarkNavy w-[96px] sm:w-[140px] h-[96px] sm:h-[140px] flex items-center justify-center rounded-xl shadow-dark"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {!value && isHovered && hoverSign && (
        <img
          className="pointer-events-none"
          src={icons[hoverSign].outline}
          alt={hoverSign}
        />
      )}
      {value && (
        <img
          className="pointer-events-none"
          src={isWinning ? icons[value].outline : icons[value].filled}
          alt={value}
        />
      )}
    </button>
  )
}

export default Cell
