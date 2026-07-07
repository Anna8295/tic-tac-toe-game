import Cell from './Cell'

const Board = ({ cells, winningCombo, hoverSign, onCellClick }) => (
  <div className="grid grid-cols-3 gap-4">
    {cells.map((value, index) => (
      <Cell
        key={index}
        value={value}
        hoverSign={hoverSign}
        isWinning={winningCombo.includes(index)}
        onClick={() => onCellClick(index)}
      />
    ))}
  </div>
)

export default Board
