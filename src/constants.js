import setGetter from 'set-getter'
import constants from '../constants.json'

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