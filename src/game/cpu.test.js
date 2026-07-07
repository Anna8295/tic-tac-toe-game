import { describe, expect, it } from 'vitest'
import { cpuMove } from './cpu'
import { emptyCells, getResult, otherSign } from './logic'

const board = (str) => str.split('').map((c) => (c === '.' ? null : c))

const randomEmptyIndex = (cells) => {
  const empty = cells.map((c, i) => (c ? null : i)).filter((i) => i !== null)
  return empty[Math.floor(Math.random() * empty.length)]
}

describe('cpuMove medium', () => {
  it('takes a winning move when available', () => {
    expect(cpuMove(board('OO..X.X..'), 'O', 'medium')).toBe(2)
  })

  it('blocks the opponent from winning', () => {
    expect(cpuMove(board('XX....O..'), 'O', 'medium')).toBe(2)
  })

  it('prefers the center when there is no immediate threat', () => {
    expect(cpuMove(board('X........'), 'O', 'medium')).toBe(4)
  })
})

describe('cpuMove hard', () => {
  it('takes a winning move over a blocking move', () => {
    // O can win at 2; X threatens at 5 — winning ends the game first
    expect(cpuMove(board('OO.XX....'), 'O', 'hard')).toBe(2)
  })

  it('never loses against a random opponent', () => {
    for (let game = 0; game < 60; game++) {
      const cpuSign = game % 2 === 0 ? 'X' : 'O'
      const cells = emptyCells()
      let turn = 'X'
      let result = null
      while (!result) {
        const index =
          turn === cpuSign ? cpuMove(cells, cpuSign, 'hard') : randomEmptyIndex(cells)
        cells[index] = turn
        result = getResult(cells)
        turn = otherSign(turn)
      }
      expect(result.winner).not.toBe(otherSign(cpuSign))
    }
  })
})

describe('cpuMove easy', () => {
  it('plays a legal move on a partly full board', () => {
    const cells = board('XOXO.....')
    const index = cpuMove(cells, 'X', 'easy')
    expect(cells[index]).toBeNull()
  })

  it('returns null on a full board', () => {
    expect(cpuMove(board('XOXXOOOXX'), 'X', 'easy')).toBeNull()
  })
})
