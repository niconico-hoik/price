import constants from './constants.js'
import { asserts, age2type, validations } from './util'

const { monthly_care, daily_care } = constants

export default class MonthlyCare {
  constructor({ week, start_time, end_time } = {}) {
    asserts(Array.isArray(week) && week.length === 7, `week is required`)
    validations.time(start_time, end_time)
    this.week = week
    this.start_time = start_time
    this.end_time = end_time
  }

  price(...arg) {
    return Object.values(this.prices(...arg)).reduce((a, c) => a + c, 0)
  }

  prices(age, { entry, elder, food } = {}) {
    const type = age2type(age)
    const daysByWeek = this.week.filter(num => num === 1).length
    const timeByDate = this.end_time - this.start_time
    return {
      care_of_init: monthly_care.prices.init[type],
      care_of_days: monthly_care.prices['charge'] * daysByWeek,
      care_of_time: monthly_care.prices['charge'] * timeByDate,

      sundry: monthly_care.prices['sundry'],
      entry: entry
      ? monthly_care.prices['entry'] / (elder ? 2 : 1)
      : 0,
      food: food
      ? daily_care.prices.options['food'] * ((daysByWeek * 4) + 1)
      : 0,

      special_of_sunday: this.week[0] === 1
      ? monthly_care.prices.special_time
      : 0,
      special_of_morning: this.start_time < 8
      ? monthly_care.prices.special_time
      : 0,
      special_of_night: this.end_time > 18
      ? monthly_care.prices.special_time
      : 0,
    }
  }
}