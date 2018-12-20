import constants from './constants.js'
import { asserts, age2type, validations } from './util'

const { monthly_care, daily_care } = constants

export default class MonthlyCare {
  constructor({ week, start_time, end_time } = {}) {
    asserts(Array.isArray(week), `week is required`)
    validations.time(start_time, end_time)
    this.week = week
    this.start_time = start_time
    this.end_time = end_time
  }

  price({ age, entry, elder, food } = {}) {
    const type = age2type(age)
    const daysByWeek = this.week.filter(num => num === 1).length
    const timeByDate = this.end_time - this.start_time
    return {
      sundry: monthly_care.prices['sundry'],
      
      entry: entry
      ? monthly_care.prices['entry'] / (elder ? 2 : 1)
      : 0,

      food: food
      ? daily_care.prices.options['food'] * ((daysByWeek * 4) + 1)
      : 0,

      care: (
        monthly_care.prices.init[type] +
        monthly_care.prices['charge'] * daysByWeek +
        monthly_care.prices['charge'] * timeByDate
      )
    }
  }
}