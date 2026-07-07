export const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

export const emptyCells = () => Array(9).fill(null)

export const otherSign = (sign) => (sign === 'X' ? 'O' : 'X')

// Returns { winner: 'X' | 'O', combo } for a win, { winner: 'tie', combo: [] }
// for a full board, or null while the round is still running.
export const getResult = (cells) => {
  for (const combo of WINNING_COMBOS) {
    const [a, b, c] = combo
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], combo }
    }
  }
  if (cells.every(Boolean)) return { winner: 'tie', combo: [] }
  return null
}
