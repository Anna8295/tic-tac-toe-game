import { getResult, otherSign } from './logic'

const emptyIndexes = (cells) =>
  cells.reduce((list, cell, index) => (cell ? list : [...list, index]), [])

const randomFrom = (list) => list[Math.floor(Math.random() * list.length)]

const findWinningMove = (cells, sign) => {
  for (const index of emptyIndexes(cells)) {
    const next = cells.slice()
    next[index] = sign
    if (getResult(next)?.winner === sign) return index
  }
  return null
}

// Classic minimax: `sign` is the CPU, `current` is whoever moves next.
// Depth is subtracted from wins so the CPU prefers faster wins and slower losses.
const minimax = (cells, sign, current, depth = 0) => {
  const result = getResult(cells)
  if (result) {
    if (result.winner === 'tie') return { score: 0 }
    return { score: result.winner === sign ? 10 - depth : depth - 10 }
  }
  let best = null
  for (const index of emptyIndexes(cells)) {
    const next = cells.slice()
    next[index] = current
    const { score } = minimax(next, sign, otherSign(current), depth + 1)
    const isBetter =
      best === null || (current === sign ? score > best.score : score < best.score)
    if (isBetter) best = { score, index }
  }
  return best
}

// Returns the index the CPU plays, or null if the board is full.
export const cpuMove = (cells, sign, difficulty) => {
  const empty = emptyIndexes(cells)
  if (!empty.length) return null

  if (difficulty === 'easy') return randomFrom(empty)

  if (difficulty === 'medium') {
    const win = findWinningMove(cells, sign)
    if (win !== null) return win
    const block = findWinningMove(cells, otherSign(sign))
    if (block !== null) return block
    if (cells[4] === null) return 4
    const corners = [0, 2, 6, 8].filter((index) => cells[index] === null)
    if (corners.length) return randomFrom(corners)
    return randomFrom(empty)
  }

  // hard: opening move is a free choice (center/corner are all safe),
  // which keeps it instant and adds variety; minimax after that.
  if (empty.length === 9) return randomFrom([0, 2, 4, 6, 8])
  return minimax(cells, sign, sign).index
}
