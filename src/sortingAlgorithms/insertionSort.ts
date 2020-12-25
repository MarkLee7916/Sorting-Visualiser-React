import { ArrayState } from "../arrayState";
import { swap } from "../utils";

export function insertionSort(arrInput: number[]): ArrayState[] {
  const arr = arrInput.slice();
  const arrayStates: ArrayState[] = [];

  for (let i = 0; i < arr.length; i++) {
    let j = i;
    while (j >= 1 && arr[j] < arr[j - 1]) {
      swap(arr, j, --j);

      arrayStates.push({ swappedIndices: [j, j + 1], currArray: arr.slice() });
    }
  }

  return arrayStates;
}
