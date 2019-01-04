import assert from 'assert'
import * as modules from '../src'

it('DailyCare', () => {
  const { DailyCare } = modules
  const dailyCare = new DailyCare({
    start_time: 10.23,
    end_time: 22.78,
  })

  assert.ok(typeof dailyCare.price(2) === 'number')
  assert.ok(typeof dailyCare.prices(2, { nappy: true, milk: true, food: true }) === 'object')
})

it('MonthlyCare', () => {
  const { MonthlyCare } = modules
  const monthlyCare = new MonthlyCare({
    week: [1, 0, 1, 1, 0, 0, 0],
    start_time: 10.21,
    end_time: 22.56,
  })

  assert.ok(typeof monthlyCare.price(2) === 'number')
  assert.ok(typeof monthlyCare.prices(2, { entry: true, elder: true, food: true }) === 'object')
})

it('age2type', () => {
  const { age2type } = modules

  assert.equal(age2type(2), 'infant')
  assert.equal(age2type(6), 'toddler')
  assert.equal(age2type(9), 'lower')
  assert.equal(age2type(10), 'higher')

  assert.equal(age2type('infant'), 'infant')
  assert.throws(() => age2type('uninfant'))
})

it('string2time/time2string', () => {
  const { string2time, time2string } = modules

  const test = (timeString, expectString = timeString) =>
    assert.equal(time2string(string2time(timeString)), expectString)

  test('10:08')
  test('10:25')
  test('10:32')
  test('10:50')
  test('10', '10:00')
})

it('time2minutes', () => {
  const { time2minutes, string2time } = modules

  const test = (timeString, expectMinutes) =>
    assert.equal(time2minutes(string2time(timeString)), expectMinutes)

  test('1:25', 85)
  test('4:40', 280)
  test('10:52', 652)
})

it('normalizeStartTime', () => {
  const { normalizeStartTime, string2time } = modules

  const test = (timeString, expectTime) => {
    const time = normalizeStartTime(string2time(timeString))
    return assert.equal(time, expectTime)
  }

  test('10:19', 10)
  test('10:20', 10.5)
  test('10:49', 10.5)
  test('10:50', 11)
})

it('normalizeEndTime', () => {
  const { normalizeEndTime, string2time } = modules

  const test = (timeString, expectTime) => {
    const time = normalizeEndTime(string2time(timeString))
    return assert.equal(time, expectTime)
  }

  test('10:10', 10)
  test('10:11', 10.5)
  test('10:40', 10.5)
  test('10:41', 11)
})