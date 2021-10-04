import { NotImplementedError } from '../extensions/index.js';

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
export default function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error(`'arr' parameter must be an instance of the Array!`);
  }

  const result = [];

  let i = 0;
  while (i < arr.length) {
    const el = arr[i];
    if (!isNaN(el)) {
      result.push(el);
      i += 1;
      continue;
    }

    if (el === '--discard-next') {
      i += 2;
    }

    if (el === '--discard-prev') {
      result.pop();
      i += 2;
    }

    if (el === '--double-next') {
      let x = arr[i + 1];
      result.push(x).push(x);
      i += 2;
    }

    if (el === '--double-prev') {
      let x = result.pop();
      result.push(x).push(x);
      i += 2;
    }
  }
  
  return result;
}
