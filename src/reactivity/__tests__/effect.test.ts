import { describe, expect, it } from 'vitest'
import { sum } from '../src/effect'
describe('Hi', () => {
  it('should works', () => {
    expect(1 + 1).toEqual(2)
  })
})

describe('sum', () => {
  it('should equal', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
