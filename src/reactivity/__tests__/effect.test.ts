import { describe, expect, it, vi } from 'vitest'
import { effect } from '../src/effect'
import { reactive } from '../src/reactive'
describe('effect', () => {
  it('should run the passed function once (wrapped by a effect)', () => {
    const viFn = vi.fn(() => {})
    effect(viFn)
    expect(viFn).toHaveBeenCalledTimes(1)
  })

  it('should observe basic properties', () => {
    let dummy
    const counter = reactive({ num: 0 })
    effect(() => {
      dummy = counter.num
    })
    expect(dummy).toBe(0)
    counter.num = 1
    expect(dummy).toBe(1)
  })
})
