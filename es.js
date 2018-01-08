var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

import { prices, tempzone } from './information.json'

/* month */
export var monthEntry = function monthEntry() {
  return prices.month_entry
}
export var monthSundry = function monthSundry() {
  return prices.month_sundry
}
export var monthSpecialTime = function monthSpecialTime() {
  return prices.month_special_time
}
export var monthCare = function monthCare(age, day, time) {
  return (
    prices.month_init[age] +
    prices.month_charge * day +
    prices.month_charge * time
  )
}

/* temp */
export var nappy = function nappy() {
  return prices.nappy
}
export var milk = function milk() {
  return prices.milk
}
export var food = function food() {
  return prices.food
}
export var tempAllday = function tempAllday(age) {
  return prices.temp_allday[age]
}

export var TempCare = (function() {
  function TempCare(from, to) {
    _classCallCheck(this, TempCare)

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

  _createClass(TempCare, [
    {
      key: 'price',
      value: function price(age) {
        return (
          prices.temp_morning * this.morning +
          prices.temp_day[age] * this.day +
          prices.temp_evening * this.evening +
          prices.temp_night * this.night
        )
      }
    },
    {
      key: 'priceByTime',
      value: function priceByTime(age) {
        return {
          morning: prices.temp_morning * this.morning,
          day: prices.temp_day[age] * this.day,
          evening: prices.temp_evening * this.evening,
          night: prices.temp_night * this.night
        }
      }
    },
    {
      key: 'timeByTime',
      value: function timeByTime() {
        return {
          morning: this.morning,
          day: this.day,
          evening: this.evening,
          night: this.night
        }
      }
    }
  ])

  return TempCare
})()

var substractOrZero = function substractOrZero(_ref) {
  var from = _ref.from,
    to = _ref.to
  return to - from > 0 ? to - from : 0
}
var fromOrStart = function fromOrStart(from, start) {
  return from > start ? from : start
}
var toOrLimit = function toOrLimit(to, limit) {
  return to < limit ? to : limit
}
