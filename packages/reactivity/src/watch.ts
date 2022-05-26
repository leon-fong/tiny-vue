import { effect } from './effect'

export function watch(source: any, cb: any) {
  const getter = typeof source === 'function' ? source : () => traverse(source)

  let oldValue: any, newValue
  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler() {
        newValue = effectFn()
        cb(oldValue, newValue)
        oldValue = newValue
      },
    })
  oldValue = effectFn()
}

function traverse(value: any, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value))
    return
  seen.add(value)
  for (const k in value)
    traverse(value[k], seen)
  return value
}
