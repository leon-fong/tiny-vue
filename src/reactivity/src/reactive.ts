import { isObject } from '../../shared/src'
import { track, trigger } from './effect'
export function reactive(raw: any) {
  if (!isObject(raw))
    return raw

  return new Proxy(raw, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)
      trigger(target, key)
      return true
    },
  },
  )
}
