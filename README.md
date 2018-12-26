# niconico-hoik-price
![GitHub release](https://img.shields.io/github/release/niconico-hoik/price.svg?longCache=true&style=flat-square)

```js
import { DailyCare } from 'niconico-hoik-price'

const dailyCare = new DailyCare({
  start_time: 10.5,
  end_time: 21.7,
})

const dailyCarePrices = dailyCare.prices(2, { nappy: true })
const dailyCarePrice = dailyCare.price('toddler', { milk: true })
```
```js
import { MonthlyCare } from 'niconico-hoik-price'

const monthlyCare = new MonthlyCare({
  weeks: [1, 0, 0, 1, 1, 0, 1],
  start_time: 10,
  end_time: 21,
})

const monthlyCarePrices = monthlyCare.prices(3, { entry: true })
const monthlyCarePrice = monthlyCare.price('infant', { elder: true, food: true })
```