import { describe, expect, it } from 'vitest'
import { emptyCells, getResult, otherSign } from './logic'

const board = (str) => str.split('').map((c) => (c === '.' ? null : c))

describe('getResult', () => {
  it('returns null for an empty board', () => {
    expect(getResult(emptyCells())).toBeNull()
  })

  it('returns null for a running game', () => {
    expect(getResult(board('XO.X.O...'))).toBeNull()
  })

  it('detects a row win', () => {
    expect(getResult(board('XXXOO....'))).toEqual({ winner: 'X', combo: [0, 1, 2] })
  })

  it('detects a column win', () => {
    expect(getResult(board('OX.OX.O..'))).toEqual({ winner: 'O', combo: [0, 3, 6] })
  })

  it('detects a diagonal win', () => {
    expect(getResult(board('XOO.X...X'))).toEqual({ winner: 'X', combo: [0, 4, 8] })
  })

  it('detects a tie on a full board with no winner', () => {
    expect(getResult(board('XOXXOOOXX'))).toEqual({ winner: 'tie', combo: [] })
  })

  it('reports a win even when the board is full', () => {
    expect(getResult(board('XXXOOXXOO'))).toEqual({ winner: 'X', combo: [0, 1, 2] })
  })
})

describe('otherSign', () => {
  it('flips between X and O', () => {
    expect(otherSign('X')).toBe('O')
    expect(otherSign('O')).toBe('X')
  })
})
