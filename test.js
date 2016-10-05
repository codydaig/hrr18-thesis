const date = { start: '2016-10-05 10:37pm (-07:00 America/Los_Angeles)' }
const moment = require('moment')


let time = date.start.split('(')[0].split('')
const ampm = time[time.length -3]
time = time.slice(0, time.length -3 )

if (ampm == 'a'){
  time.push(' AM')
} else if(ampm == 'p'){
  time.push(' PM')
}






time = time.join('')

let newdate = moment(time,'YYYY-MM-DD hh:mm a' )

const newDate = new Date(newdate)

console.log(newDate)

