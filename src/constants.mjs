import deepfreeze from 'deep-freeze'
import constants from '../constants.json'

export default deepfreeze(constants)

/*
import setGetter from 'set-getter'

const createPureGetters = (obj, parentKey, result = {}) => {
  const isRoot = !parentKey

  Object.entries(obj).forEach(([ subKey, value ]) => {
    const key = isRoot
    ? subKey
    : `${parentKey}.${subKey}`

    return (Array.isArray(value) || typeof value !== 'object')
    ? setGetter(result, key, () => value)
    : createPureGetters(value, key, result)
  })

  return isRoot && result
}

export default createPureGetters(constants)
*/