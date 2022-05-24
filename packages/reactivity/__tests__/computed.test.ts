import { describe, expect, it } from 'vitest'
import { reactive } from '../src/reactive'
import { computed } from '../src/computed'

describe('computed', () => {
  it('should be get a value', () => {
    const counter = reactive({ num1: 1, num2: 2 })
    const sumRes = computed(() => counter.num1 + counter.num2)
    expect(sumRes.value).toBe(3)
  })

  it('counter has been change , sumRes.value will be change', () => {
    const counter = reactive({ num1: 1, num2: 2 })
    const sumRes = computed(() => counter.num1 + counter.num2)
    console.log(sumRes.value)
    counter.num1++
    expect(sumRes.value).toBe(4)
  })
})
