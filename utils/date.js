const dayjs = require('dayjs')

// return date in the format 'DD/MM/YYYY'
const formatDate = (date) => {
    return dayjs(date.slice(0, 10)).format('DD/MM/YYYY')
}

// Get current date
const currentDate = () => {
    let now = formatDate(dayjs().format())
    return now
}

// Calculate due date 
const dueDate = () => {
    let due = formatDate(dayjs().add(10, 'day').format())
    return due
}

// Check if the given date has passed.
const isLate = (date) => {
    const now = dayjs().format('YYYY/MM/DD')
    const duedate = `${date.substring(6,10)}/${date.substring(3,5)}/${date.substring(0,2)}`

    const date1 = dayjs(now)
    const date2 = dayjs(duedate)

    return date1.diff(date2, 'day') > 0
}

module.exports = {
    currentDate,
    dueDate,
    isLate
}