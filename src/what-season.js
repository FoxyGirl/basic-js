import { NotImplementedError } from '../extensions/index.js';

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function isValidDate(d) {
  return d instanceof Date && !isNaN(Date.parse(d)) && Object.keys(d).length === 0;
}

export default function getSeason(date) {
  if (date === undefined) {
    return "Unable to determine the time of year!";
  }

  if (!isValidDate(date)) {
    throw new Error('Invalid date!');
  }

  const seasons = {
    winter: [ 0, 1, 11 ],
    spring: [ 2, 3, 4 ],
    summer: [ 5, 6, 7 ],
    autumn: [ 8, 9, 10 ]
  }

  const month = date.getMonth();

  const [ season, _ ] = Object.entries(seasons).find(([_, value]) => value.includes(month));
 
  return season;
}
