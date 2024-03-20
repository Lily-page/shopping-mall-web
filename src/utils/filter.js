import moment from 'moment'

function formatDate(value) {
    return moment(value).format('YYYY-MM-DD')
}

function hideTel(value) {
    return value.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
}

function keepTwoNum(value) {
    value = Number(value);
    return value.toFixed(2);
}

function formatTime(value) {
    return moment(value).format('YYYY-MM-DD hh:mm:ss')
}

export default { formatDate, hideTel, keepTwoNum, formatTime }