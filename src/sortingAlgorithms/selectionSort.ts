import { ArrayState } from "../arrayState";
import { swap } from "../utils";

export function selectionSort(arr: number[]) {
  const arrayStates: ArrayState[] = [];

  for (let limit = 0; limit < arr.length; limit++) {
    const min = indexOfMinElement(arr, limit);

    swap(arr, limit, min);
    arrayStates.push({ swappedIndices: [limit, min], currArray: arr.slice() });
  }

  return arrayStates;
}

// Return smallest element whose index is greater than indexLimit
function indexOfMinElement(arr: number[], indexLimit: number) {
  let min = Infinity;
  let minIndex: number;

  for (let i = indexLimit; i < arr.length; i++) {
    if (arr[i] <= min) {
      minIndex = i;
      min = arr[i];
    }
  }

  return minIndex;
}
