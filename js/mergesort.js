// MERGE SORT — O(n log n)
function mergeSort(arr, compareFn) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, middle), compareFn);
    const right = mergeSort(arr.slice(middle), compareFn);

    return merge(left, right, compareFn);
}

function merge(left, right, compareFn) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) <= 0) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    return result;
}

function sortOrdersByPriority(orderList) {
    return mergeSort(orderList, (a, b) => {
        if (a.status === "Completed" && b.status !== "Completed") return 1;
        if (b.status === "Completed" && a.status !== "Completed") return -1;

        const priorityA = getOrderPriority(a);
        const priorityB = getOrderPriority(b);

        return priorityA.days - priorityB.days;
    });
}
