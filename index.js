import { prices, tempzone } from './information.json'

/* month */
export const monthEntry = () => prices.month_entry
export const monthSundry = () => prices.month_sundry
export const monthSpecialTime = () => prices.month_special_time
export const monthCare = (age, day, time) =>
  prices.month_init[age] +
  prices.month_charge * day +
  prices.month_charge * time

/* temp */
export const nappy = () => prices.nappy
export const milk = () => prices.milk
export const food = () => prices.food
export const allday = age => prices.temp_allday[age]

export class TempCare {
  constructor(from, to) {
    this.morning = substractOrZero({
      from: from,
      to: toOrLimit(to, tempzone.day_start)
    })

    this.day = substractOrZero({
      from: fromOrStart(from, tempzone.day_start),
      to: toOrLimit(to, tempzone.evening_start)
    })

    this.evening = substractOrZero({
      from: fromOrStart(from, tempzone.evening_start),
      to: toOrLimit(to, tempzone.night_start)
    })

    this.night = substractOrZero({
      from: fromOrStart(from, tempzone.night_start),
      to: toOrLimit(to, tempzone.limit)
    })
  }

  price(age) {
    return (
      prices.temp_morning * this.morning +
      prices.temp_day[age] * this.day +
      prices.temp_evening * this.evening +
      prices.temp_night * this.night
    )
  }

  priceByTime(age) {
    return {
      morning: prices.temp_morning * this.morning,
      day: prices.temp_day[age] * this.day,
      evening: prices.temp_evening * this.evening,
      night: prices.temp_night * this.night
    }
  }

  timeByTime() {
    return {
      morning: this.morning,
      day: this.day,
      evening: this.evening,
      night: this.night
    }
  }
}

const substractOrZero = ({ from, to }) => (to - from > 0 ? to - from : 0)
const fromOrStart = (from, start) => (from > start ? from : start)
const toOrLimit = (to, limit) => (to < limit ? to : limit)
