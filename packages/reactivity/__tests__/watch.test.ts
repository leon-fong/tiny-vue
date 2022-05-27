import { describe, expect, it, vi } from 'vitest'
import { reactive } from '../src/reactive'
import { watch } from '../src/watch'

describe('watch', () => {
  it('cb will be called', () => {
    const obj = reactive({
      foo: 1,
    })
    const viFn = vi.fn(() => { })
    watch(obj, viFn)
    obj.foo = 2
    expect(viFn).toHaveBeenCalled()
  })

  it('first param is getter', () => {
    const obj = reactive({
      foo: 1,
    })
    const viFn = vi.fn(() => { })
    watch(() => obj.foo, viFn)
    obj.foo = 2
    expect(viFn).toHaveBeenCalled()
  })

  it('cb has two params', () => {
    const obj = reactive({
      num: 1,
    })
    const viFn = vi.fn((oldValue, newValue) => { return { oldValue, newValue } })
    watch(() => obj.num, viFn)
    obj.num++
    expect(viFn).toHaveBeenCalledWith(1, 2)
  })

  it('immediate', () => {
    const obj = reactive({
      num: 1,
    })
    const viFn = vi.fn((oldValue, newValue) => { return { oldValue, newValue } })
    watch(() => obj.num, viFn, { immediate: true })
    expect(viFn).toHaveBeenCalled()
    expect(viFn).toHaveBeenCalledWith(undefined, 1)
  })
})
