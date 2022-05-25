interface EffectOptions {
  scheduler?: () => void
  lazy?: boolean
}

// 全局依赖收集对象
const bucket = new WeakMap()

// 当前激活的 effect 函数
let activeEffect: any

// 副作用函数栈
const effectStack = <any>[]

// 在 get 拦截函数内调用 track 函数追踪变化
export function track(target: object, key: unknown) {
  if (!activeEffect)
    return

  let depsMap = bucket.get(target)
  if (!depsMap)
    bucket.set(target, (depsMap = new Map()))

  let deps = depsMap.get(key)
  if (!deps)
    depsMap.set(key, (deps = new Set()))

  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

// 在 set 拦截函数内调用 trigger 函数触发变化
export function trigger(target: object, key: unknown) {
  const depsMap = bucket.get(target)
  if (!depsMap)
    return
  const effects = depsMap.get(key)

  const effectToRun = new Set()
  effects && effects.forEach((effectFn: any) => {
    // 如果 trigger 触发执行的 effect 与当前正在执行的 activeEffect 相同，则不再执行
    if (effectFn !== activeEffect)
      effectToRun.add(effectFn)
  })
  effectToRun.forEach((fn: any) => {
    if (fn.options.scheduler)
      fn.options.scheduler(fn)
    else
      fn()
  })
}

export function cleanup(effectFn: any) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

export function effect(fn: () => void, options: EffectOptions = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    // 在调用 effect 注册副作用函数时， 将副作用函数赋值给 activeEffect
    activeEffect = effectFn
    // 在调用副作用函数之前将当前副作用函数压入栈
    effectStack.push(effectFn)
    const res = fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数从栈中弹出，并把 activeEffect 还原为之前的值
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  effectFn.options = options
  effectFn.deps = <any>[]
  if (!options.lazy)
    effectFn()
  return effectFn
}
