import { useReducer } from 'react'
import { emptyCells, getResult, otherSign } from './logic'

const initialState = {
  cells: emptyCells(),
  turn: 'X',
  result: null,
  scores: { X: 0, O: 0, ties: 0 },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'move': {
      const { index } = action
      if (state.result || state.cells[index]) return state
      const cells = state.cells.slice()
      cells[index] = state.turn
      const result = getResult(cells)
      const scores = result
        ? {
            ...state.scores,
            ...(result.winner === 'tie'
              ? { ties: state.scores.ties + 1 }
              : { [result.winner]: state.scores[result.winner] + 1 }),
          }
        : state.scores
      return { cells, turn: otherSign(state.turn), result, scores }
    }
    case 'nextRound':
      return { ...state, cells: emptyCells(), turn: 'X', result: null }
    case 'reset':
      return initialState
    default:
      return state
  }
}

export const useGame = () => useReducer(reducer, initialState)
