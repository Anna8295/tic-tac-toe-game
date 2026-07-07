import Cell from './Cell'

const Board = ({ cells, winningCombo, hoverSign, onCellClick }) => (
  <div className="grid grid-cols-3 gap-4">
    {cells.map((value, index) => (
      <div
        key={index}
        className="animate-riseIn"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <Cell
          value={value}
          hoverSign={hoverSign}
          isWinning={winningCombo.includes(index)}
          onClick={() => onCellClick(index)}
        />
      </div>
    ))}
  </div>
)

export default Board
