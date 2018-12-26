import deepfreeze from 'deep-freeze'
import constants from '../constants.json'

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }

  return obj
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  )
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  )
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i]

    return arr2
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === '[object Arguments]'
  )
    return Array.from(iter)
}

function _iterableToArrayLimit(arr, i) {
  var _arr = []
  var _n = true
  var _d = false
  var _e = undefined

  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value)

      if (i && _arr.length === i) break
    }
  } catch (err) {
    _d = true
    _e = err
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']()
    } finally {
      if (_d) throw _e
    }
  }

  return _arr
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance')
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance')
}

var constants$1 = deepfreeze(constants)

var throws = function throws(message) {
  throw new Error(message)
}
var asserts = function asserts(condition, message) {
  return !condition && throws(message)
}
var assign = function assign(objects) {
  return Object.assign.apply(Object, [{}].concat(_toConsumableArray(objects)))
}
var validations = {
  time: function time(start_time, end_time) {
    asserts(start_time, 'start_time is required')
    asserts(end_time, 'end_time is required')
    asserts(
      start_time < end_time,
      'end_time - start_time = '.concat(end_time - start_time)
    )
  }
}
var types = ['infant', 'toddler', 'lower', 'higher']
var age2type = function age2type(age) {
  return typeof age === 'number'
    ? types[age <= 2 ? 0 : age <= 6 ? 1 : age <= 9 ? 2 : 3]
    : types.find(function(type) {
        return type === age
      }) || throws('age is required but '.concat(age, ' is invalid'))
}
var timeWithPrefix = function timeWithPrefix(time) {
  return ''.concat(time < 10 ? '0' : '').concat(time)
}
var time2string = function time2string(time) {
  var hours = Math.floor(time)
  var minutes = Math.round((time - hours) * 60)
  return ''.concat(hours, ':').concat(timeWithPrefix(minutes))
}
var string2time = function string2time(string) {
  var _string$split$map = string.split(':').map(Number),
    _string$split$map2 = _slicedToArray(_string$split$map, 2),
    hours = _string$split$map2[0],
    minutes = _string$split$map2[1]
  var flooredMinutes = Math.floor((minutes / 60) * 100) / 100
  return hours + flooredMinutes
}
var normalizeStartTime = function normalizeStartTime(time) {
  var hours = Math.floor(time)
  var minutes = Math.round((time - hours) * 60)
  return hours + (minutes >= 50 ? 1 : minutes >= 20 ? 0.5 : 0)
}
var normalizeEndTime = function normalizeEndTime(time) {
  var hours = Math.floor(time)
  var minutes = Math.round((time - hours) * 60)
  return hours + (minutes <= 10 ? 0 : minutes <= 40 ? 0.5 : 1)
}

var _times
var daily_care = constants$1.daily_care
var times = ((_times = {}),
_defineProperty(_times, 'morning', {
  min: false,
  max: daily_care.milestones['morning2day']
}),
_defineProperty(_times, 'day', {
  min: daily_care.milestones['morning2day'],
  max: daily_care.milestones['day2evening']
}),
_defineProperty(_times, 'evening', {
  min: daily_care.milestones['day2evening'],
  max: daily_care.milestones['evening2night']
}),
_defineProperty(_times, 'night', {
  min: daily_care.milestones['evening2night'],
  max: false
}),
_times)
var createTimes = function createTimes(start_time, end_time, times) {
  return assign(
    Object.entries(times).map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        time = _ref2[0],
        _ref2$ = _ref2[1],
        min = _ref2$.min,
        max = _ref2$.max
      if (typeof max === 'number' && start_time >= max) {
        return _defineProperty({}, time, 0)
      } else {
        var startTime =
          typeof min === 'number' && start_time < min ? min : start_time
        var endTime = typeof max === 'number' && end_time > max ? max : end_time
        var diff = endTime - startTime
        return _defineProperty({}, time, diff > 0 ? diff : 0)
      }
    })
  )
}
var DailyCare = (function() {
  function DailyCare() {
    var _ref5 =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      start_time = _ref5.start_time,
      end_time = _ref5.end_time
    _classCallCheck(this, DailyCare)
    validations.time(start_time, end_time)
    this.raw_start_time = start_time
    this.start_time = normalizeStartTime(start_time)
    this.raw_start_time_string = time2string(start_time)
    this.start_time_string = time2string(this.start_time)
    this.raw_end_time = end_time
    this.end_time = normalizeEndTime(end_time)
    this.raw_end_time_string = time2string(end_time)
    this.end_time_string = time2string(this.end_time)
    this.isPack = this.start_time >= 9 && this.end_time <= 17
    this.times = createTimes(this.start_time, this.end_time, times)
    Object.freeze(this)
  }
  _createClass(DailyCare, [
    {
      key: 'price',
      value: function price() {
        return Object.values(this.prices.apply(this, arguments)).reduce(
          function(a, c) {
            return a + c
          },
          0
        )
      }
    },
    {
      key: 'prices',
      value: function prices(age) {
        var _ref6 =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {},
          nappy = _ref6.nappy,
          milk = _ref6.milk,
          food = _ref6.food
        var type = age2type(age)
        var prices = {
          care_of_morning: daily_care.prices['morning'] * this.times['morning'],
          care_of_day: this.isPack
            ? daily_care.prices.pack[type]
            : daily_care.prices['day'][type] * this.times['day'],
          care_of_evening: daily_care.prices['evening'] * this.times['evening'],
          care_of_night: daily_care.prices['night'] * this.times['night'],
          nappy: nappy ? daily_care.prices.options['nappy'] : 0,
          milk: milk ? daily_care.prices.options['milk'] : 0,
          food: food ? daily_care.prices.options['food'] : 0
        }
        return assign(
          Object.entries(prices).map(function(_ref7) {
            var _ref8 = _slicedToArray(_ref7, 2),
              key = _ref8[0],
              price = _ref8[1]
            return _defineProperty({}, key, Math.floor(price))
          })
        )
      }
    }
  ])
  return DailyCare
})()

var monthly_care = constants$1.monthly_care,
  daily_care$1 = constants$1.daily_care
var MonthlyCare = (function() {
  function MonthlyCare() {
    var _ref =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      week = _ref.week,
      start_time = _ref.start_time,
      end_time = _ref.end_time
    _classCallCheck(this, MonthlyCare)
    asserts(Array.isArray(week) && week.length === 7, 'week is required')
    validations.time(start_time, end_time)
    this.raw_start_time = start_time
    this.start_time = normalizeStartTime(start_time)
    this.raw_start_time_string = time2string(start_time)
    this.start_time_string = time2string(this.start_time)
    this.raw_end_time = end_time
    this.end_time = normalizeEndTime(end_time)
    this.raw_end_time_string = time2string(end_time)
    this.end_time_string = time2string(this.end_time)
    this.week = week
    Object.freeze(this)
  }
  _createClass(MonthlyCare, [
    {
      key: 'price',
      value: function price() {
        return Object.values(this.prices.apply(this, arguments)).reduce(
          function(a, c) {
            return a + c
          },
          0
        )
      }
    },
    {
      key: 'prices',
      value: function prices(age) {
        var _ref2 =
            arguments.length > 1 && arguments[1] !== undefined
              ? arguments[1]
              : {},
          entry = _ref2.entry,
          elder = _ref2.elder,
          food = _ref2.food
        var type = age2type(age)
        var daysByWeek = this.week.filter(function(num) {
          return num === 1
        }).length
        var timeByDate = this.end_time - this.start_time
        var prices = {
          care_of_init: monthly_care.prices.init[type],
          care_of_days: monthly_care.prices['charge'] * daysByWeek,
          care_of_time: monthly_care.prices['charge'] * timeByDate,
          sundry: monthly_care.prices['sundry'],
          entry: entry ? monthly_care.prices['entry'] / (elder ? 2 : 1) : 0,
          food: food
            ? daily_care$1.prices.options['food'] * (daysByWeek * 4 + 1)
            : 0,
          special_of_sunday:
            this.week[0] === 1 ? monthly_care.prices.special : 0,
          special_of_morning:
            this.start_time < 8 ? monthly_care.prices.special : 0,
          special_of_night: this.end_time > 18 ? monthly_care.prices.special : 0
        }
        return assign(
          Object.entries(prices).map(function(_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              price = _ref4[1]
            return _defineProperty({}, key, Math.floor(price))
          })
        )
      }
    }
  ])
  return MonthlyCare
})()

export {
  DailyCare,
  MonthlyCare,
  constants$1 as constants,
  throws,
  asserts,
  assign,
  validations,
  types,
  age2type,
  time2string,
  string2time,
  normalizeStartTime,
  normalizeEndTime
}
