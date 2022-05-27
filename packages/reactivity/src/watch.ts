import { effect } from './effect'

interface WatchOptions {
  immediate?: boolean
}

export function watch(source: any, cb: any, options: WatchOptions = {}) {
  const getter = typeof source === 'function' ? source : () => traverse(source)

  let oldValue: any, newValue

  const job = () => {
    newValue = effectFn()
    cb(oldValue, newValue)
    oldValue = newValue
  }

  const effectFn = effect(
    () => getter(),
    {
      lazy: true,
      scheduler: job,
    })

  if (options.immediate)
    job()
  else
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
