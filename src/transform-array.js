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

  const actions = ['--discard-next', '--discard-prev', '--double-next', '--double-prev'];

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (!actions.includes(el)) {
      result.push(el);
      continue;
    }

    if (el === '--discard-next') {
      i++;
    }

    if (el === '--discard-prev' && arr[i - 2] !== "--discard-next") {
      result.pop();
    }

    if (el === '--double-next') {
      let x = arr[i + 1];
      if (x) {
        result.push(x)
      }
    }

    if (el === '--double-prev' && arr[i - 2] !== "--discard-next") {
      let x = arr[i - 1];
      if (x) {
        result.push(x)
      }
    }
  }

  
  return result;
}
