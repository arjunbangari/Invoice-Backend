const dayjs = require('dayjs')

const formatDate = (date) => {
    return dayjs(date.slice(0, 10)).format('DD/MM/YYYY')
}

// let currentDate = formatDate(dayjs().format())
//         let dueDate = formatDate(dayjs().add(10, 'day').format())

const currentDate = () => {
    let now = formatDate(dayjs().format())
    return now
}

const dueDate = () => {
    let due = formatDate(dayjs().add(10, 'day').format())
    return due
}

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