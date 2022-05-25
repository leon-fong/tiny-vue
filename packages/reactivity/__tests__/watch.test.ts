import { describe, expect, it, vi } from 'vitest'
import { reactive } from '../src/reactive'
import { watch } from '../src/watch'

describe('watch', () => {
  it('cb will be called', () => {
    const obj = reactive({
      foo: 1,
    })
    const viFn = vi.fn(() => { console.log('change------') })
    watch(obj, viFn)
    obj.foo = 2
    expect(viFn).toHaveBeenCalled()
  })

  it('first param is getter', () => {
    const obj = reactive({
      foo: 1,
    })
    const viFn = vi.fn(() => { console.log('change------') })
    watch(() => obj.foo, viFn)
    obj.foo = 2
    expect(viFn).toHaveBeenCalled()
  })

  it.todo('cb has two params', () => {
    // Todo
  })
})
