import cloneDeep from 'lodash.clonedeep'

export function objectKeys(obj: object) {
  return Object.keys(obj) as (keyof typeof obj)[]
}

type Strategy = 'pass_nullish' | 'pass_undefined' | 'pass_null' | 'replace_all'

export function recursiveMerge<T extends object>(
  _mergee: T,
  merger: Partial<T>,
  strategy: Strategy = 'replace_all',
): T {
  const mergee = cloneDeep(_mergee)

  objectKeys(merger).forEach((key) => {
    if (merger[key] === undefined) {
      if (['pass_undefined', 'pass_nullish'].includes(strategy)) {
        return
      }

      mergee[key] = merger[key]
      return
    }

    if (merger[key] === null) {
      if (['pass_null', 'pass_nullish'].includes(strategy)) {
        return
      }

      mergee[key] = merger[key]
      return
    }

    if (['number', 'bigint', 'string', 'boolean', 'symbol'].includes(typeof merger[key])) {
      mergee[key] = merger[key]
      return
    }

    if (Array.isArray(typeof merger[key])) {
      mergee[key] = merger[key]
      return
    }

    if (typeof merger[key] === 'object') {
      mergee[key] = recursiveMerge(merger[key], mergee[key])
      return
    }

    throw new Error(`typeof ${typeof merger[key]} is not supported`)
  })

  return mergee
}
