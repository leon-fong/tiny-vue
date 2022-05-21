import { describe, expect, it } from 'vitest'
import { reactive } from '../src/reactive'
describe('reactive', () => {
  it('should works success', () => {
    const original = {
      foo: 1,
    }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(observed.foo).toBe(1)
  })
})
