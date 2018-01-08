'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.TempCare = exports.allday = exports.food = exports.milk = exports.nappy = exports.monthCare = exports.monthSpecialTime = exports.monthSundry = exports.monthEntry = undefined

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

var _information = require('./information.json')

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

/* month */
var monthEntry = (exports.monthEntry = function monthEntry() {
  return _information.prices.month_entry
})
var monthSundry = (exports.monthSundry = function monthSundry() {
  return _information.prices.month_sundry
})
var monthSpecialTime = (exports.monthSpecialTime = function monthSpecialTime() {
  return _information.prices.month_special_time
})
var monthCare = (exports.monthCare = function monthCare(age, day, time) {
  return (
    _information.prices.month_init[age] +
    _information.prices.month_charge * day +
    _information.prices.month_charge * time
  )
})

/* temp */
var nappy = (exports.nappy = function nappy() {
  return _information.prices.nappy
})
var milk = (exports.milk = function milk() {
  return _information.prices.milk
})
var food = (exports.food = function food() {
  return _information.prices.food
})
var allday = (exports.allday = function allday(age) {
  return _information.prices.temp_allday[age]
})

var TempCare = (exports.TempCare = (function() {
  function TempCare(from, to) {
    _classCallCheck(this, TempCare)

    this.morning = substractOrZero({
      from: from,
      to: toOrLimit(to, _information.tempzone.day_start)
    })

    this.day = substractOrZero({
      from: fromOrStart(from, _information.tempzone.day_start),
      to: toOrLimit(to, _information.tempzone.evening_start)
    })

    this.evening = substractOrZero({
      from: fromOrStart(from, _information.tempzone.evening_start),
      to: toOrLimit(to, _information.tempzone.night_start)
    })

    this.night = substractOrZero({
      from: fromOrStart(from, _information.tempzone.night_start),
      to: toOrLimit(to, _information.tempzone.limit)
    })
  }

  _createClass(TempCare, [
    {
      key: 'price',
      value: function price(age) {
        return (
          _information.prices.temp_morning * this.morning +
          _information.prices.temp_day[age] * this.day +
          _information.prices.temp_evening * this.evening +
          _information.prices.temp_night * this.night
        )
      }
    },
    {
      key: 'priceByTime',
      value: function priceByTime(age) {
        return {
          morning: _information.prices.temp_morning * this.morning,
          day: _information.prices.temp_day[age] * this.day,
          evening: _information.prices.temp_evening * this.evening,
          night: _information.prices.temp_night * this.night
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
})())

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
