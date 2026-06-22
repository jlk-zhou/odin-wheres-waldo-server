/**
 * Determines whether an array is ascend sorted. 
 * @param {array} array - An array to be determined whether it is ascend sorted. 
 * @returns Whether the array is ascend sorted
 */

export default function isSortedAscend(array) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }
  return true;
}
