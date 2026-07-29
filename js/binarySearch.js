// BINARY SEARCH — O(log n)
function binarySearch(sortedArr, targetId) {
    let left = 0;
    let right = sortedArr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (sortedArr[mid].id === targetId) {
            return sortedArr[mid];
        }

        if (sortedArr[mid].id < targetId) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return null;
}

function findOrderById(id) {
    const sortedById = [...orders].sort((a, b) => a.id - b.id);
    return binarySearch(sortedById, id);
}
