export function binarySearch(arr, targetId) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid].id === targetId) {
      return arr[mid];
    }

    if (arr[mid].id < targetId) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}