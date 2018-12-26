import constants from './constants'
import {
  normalizeStartTime,
  normalizeEndTime,
  time2string,
  asserts,
  assign,
  age2type,
  validations,
} from './util'

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

export default class DailyCare {
  constructor({ start_time, end_time } = {}) {
    validations.time(start_time, end_time)

    this.raw_start_time = start_time
    this.start_time = normalizeStartTime(start_time)
    this.raw_start_time_string = time2string(start_time)
    this.start_time_string = time2string(this.start_time)

    this.raw_end_time = end_time
    this.end_time = normalizeEndTime(end_time)
    this.raw_end_time_string = time2string(end_time)
    this.end_time_string = time2string(this.end_time)

    this.isPack = this.start_time >= 9 && this.end_time <= 17 // which????
    this.times = createTimes(this.start_time, this.end_time, times)

    Object.freeze(this)
  }

  price(...arg) {
    return Object.values(this.prices(...arg)).reduce((a, c) => a + c, 0)
  }

  prices(age, { nappy, milk, food } = {}) {
    const type = age2type(age)

    const prices = {
      care_of_morning: daily_care.prices['morning'] * this.times['morning'],

      care_of_day: this.isPack
      ? daily_care.prices.pack[type]
      : daily_care.prices['day'][type] * this.times['day'],

      care_of_evening: daily_care.prices['evening'] * this.times['evening'],

      care_of_night: daily_care.prices['night'] * this.times['night'],

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