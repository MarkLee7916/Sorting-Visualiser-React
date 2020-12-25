import { ArrayState } from "../arrayState";
import { swap } from "../utils";

// Wrapper for quickSortBody() to abstract out the initial parameters
export function quickSort(arrInput: number[]) {
    const arr = arrInput.slice();
    const arrayStates: ArrayState[] = [];

    quickSortBody(arr, 0, arr.length - 1, arrayStates);

    return arrayStates;
}

function quickSortBody(arr: number[], lower: number, upper: number, arrayStates: ArrayState[]) {
    if (lower < upper) {
        const pivot = partition(arr, lower, upper, arrayStates);

        quickSortBody(arr, lower, pivot - 1, arrayStates);
        quickSortBody(arr, pivot + 1, upper, arrayStates);
    }
}

// Helper function for quickSort, partition section of array between lower and upper and return index of pivot
function partition(arr: number[], lower: number, upper: number, arrayStates: ArrayState[]) {
    const pivot = arr[upper];
    let i = lower;

    for (let j = lower; j <= upper; j++) {
        if (arr[j] < pivot) {
            swap(arr, i, j);
            arrayStates.push({ swappedIndices: [i, j], currArray: arr.slice() });
            i++;
        }
    }

    swap(arr, i, upper);
    arrayStates.push({ swappedIndices: [i, upper], currArray: arr.slice() });

    return i;
}
