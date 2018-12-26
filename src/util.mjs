export const throws = (message) => { throw new Error(message) }

export const asserts = (condition, message) => !condition && throws(message)

export const assign = (objects) => Object.assign({}, ...objects)

export const validations = {
  time: (start_time, end_time) => {
    asserts(start_time, `start_time is required`)
    asserts(end_time, `end_time is required`)
    asserts(start_time < end_time, `end_time - start_time = ${end_time - start_time}`)
  }
}

export const types = [
  'infant',
  'toddler',
  'lower',
  'higher',
]

export const age2type = (age) =>
  typeof age === 'number'
  ?
  types[
    age <= 2  ? 0 :
    age <= 6  ? 1 :
    age <= 9 ? 2 :
    3
  ]
  :
  types.find(type => type === age) ||
  throws(`age is required but ${age} is invalid`)

const timeWithPrefix = (time) =>
  `${time < 10 ? '0' : ''}${time}`

export const time2string = (time) => {
  const hours = Math.floor(time)
  const minutes = Math.round((time - hours) * 60)
  return `${hours}:${timeWithPrefix(minutes)}`
}

export const string2time = (string) => {
  const [hours, minutes] = string.split(':').map(Number)
  const flooredMinutes = Math.floor((minutes / 60) * 100) / 100
  return hours + flooredMinutes
}

export const normalizeStartTime = (time) => {
  const hours = Math.floor(time)
  const minutes = Math.round((time - hours) * 60)
  return hours + (
    minutes >= 50 ? 1 :
    minutes >= 20 ? 0.5 :
    0
  )
}

export const normalizeEndTime = (time) => {
  const hours = Math.floor(time)
  const minutes = Math.round((time - hours) * 60)
  return hours + (
    minutes <= 10 ? 0 :
    minutes <= 40 ? 0.5 :
    1
  )
}