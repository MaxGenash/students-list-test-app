/**
 * @param {Object} recordsById - object with numeric keys
 * @return {Number}
 */
export function getNextRecordId(recordsById) {
  return Math.max(...Object.keys(recordsById).map(Number), 0) + 1;
}

/**
 * @param {Date} date
 * @return {number}
 */
export function getExpiredYears(date) {
  return new Date().getFullYear() - new Date(date).getFullYear();
}
