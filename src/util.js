export const throws = (message) => { throw new Error(message) }

export const asserts = (condition, message) => !condition && throws(message)

export const assign = (objects) => Object.assign({}, ...objects)

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
    age < 3  ? 0 :
    age < 7  ? 1 :
    age < 10 ? 2 :
    3
  ]
  :
  types.find(type => type === age) ||
  throws(`age is required but ${age} is invalid`)

export const validations = {
  time: (start_time, end_time) => {
    asserts(start_time, `start_time is required`)
    asserts(end_time, `end_time is required`)
    asserts(start_time < end_time, `end_time - start_time = ${end_time - start_time}`)
  }
}