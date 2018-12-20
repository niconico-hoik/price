import constants from './constants.js'
import { asserts, assign, age2type, validations } from './util'

const { daily_care } = constants

const times = {
  ['morning']: {
    min: false,
    max: daily_care.milestones['morning2day'],
  },
  ['day']: {
    min: daily_care.milestones['morning2day'],
    max: daily_care.milestones['day2evening'],
  },
  ['evening']: {
    min: daily_care.milestones['day2evening'],
    max: daily_care.milestones['evening2night'],
  },
  ['night']: {
    min: daily_care.milestones['evening2night'],
    max: false,
  },
}

export default class DailyCare {
  constructor({ start_time, end_time } = {}) {
    validations.time(start_time, end_time)
    this.start_time = start_time
    this.end_time = end_time
    this.isPack = start_time >= 9 && end_time <= 17
    this.times = createTimes(start_time, end_time, times)
  }

  price(options) {
    return Math.floor(
      Object
      .values(this.prices(options))
      .reduce((a, c) => a + c, 0)
    )
  }

  prices({ age, nappy, milk, food } = {}) {
    const type = age2type(age)

    const prices = {
      morning: daily_care.prices['morning'] * this.times['morning'],

      day: this.isPack
      ? daily_care.prices.pack[type]
      : daily_care.prices['day'][type] * this.times['day'],

      evening: daily_care.prices['evening'] * this.times['evening'],
      night: daily_care.prices['night'] * this.times['night'],

      nappy: nappy
      ? daily_care.prices.options['nappy']
      : 0,

      milk: milk
      ? daily_care.prices.options['milk']
      : 0,
      
      food: food
      ? daily_care.prices.options['food']
      : 0,
    }

    return assign(
      Object
      .entries(prices)
      .map(([ key, price ]) => ({
        [key]: Math.floor(price)
      }))
    )
  }
}

const createTimes = (start_time, end_time, times) =>
  assign(Object.entries(times).map(([ time, { min, max } ]) => {
    if (typeof max === 'number' && start_time >= max) {
      return { [time]: 0 }
    } else {
      const startTime = (typeof min === 'number' && start_time < min) ? min : start_time
      const endTime = (typeof max === 'number' && end_time > max) ? max : end_time
      const diff = endTime - startTime
      return { [time]: diff > 0 ? diff : 0 }
    }
  }))