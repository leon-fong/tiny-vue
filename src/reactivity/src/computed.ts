import { effect } from './effect'

export function computed(getter: any) {
  let value: any
  let dirty = true
  const effectFn = effect(getter, {
    lazy: true,
  })

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn()
        dirty = false
      }
      return value
    },
  }
  return obj
}
