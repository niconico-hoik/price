import assert from 'assert'
import * as modules from '../src'

it('DailyCare', () => {
  const { DailyCare } = modules
  const dailyCare = new DailyCare({
    start_time: 10,
    end_time: 22,
  })

  assert.ok(typeof dailyCare.price(2) === 'number')
  assert.ok(typeof dailyCare.prices(2, { nappy: true, milk: true, food: true }) === 'object')
})

it('MonthlyCare', () => {
  const { MonthlyCare } = modules
  const monthlyCare = new MonthlyCare({
    week: [1, 0, 1, 1, 0, 0, 0],
    start_time: 10,
    end_time: 22,
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
  const time = '10:50'
  assert.equal(time2string(string2time(time)), time)
})

it('normalizeStartTime', () => {
  const { normalizeStartTime, string2time } = modules
  assert.equal(normalizeStartTime(string2time('10:50')), 11)
  assert.equal(normalizeStartTime(string2time('10:49')), 10.5)
  assert.equal(normalizeStartTime(string2time('10:20')), 10.5)
  assert.equal(normalizeStartTime(string2time('10:19')), 10)
})

it('normalizeEndTime', () => {
  const { normalizeEndTime, string2time } = modules
  assert.equal(normalizeEndTime(string2time('10:10')), 10)
  assert.equal(normalizeEndTime(string2time('10:11')), 10.5)
  assert.equal(normalizeEndTime(string2time('10:40')), 10.5)
  assert.equal(normalizeEndTime(string2time('10:41')), 11)
})