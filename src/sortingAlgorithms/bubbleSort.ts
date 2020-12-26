import { ArrayState } from "../arrayState";
import { swap } from "../utils";

export function bubbleSort(arrInput: number[]) {
  const arr = arrInput.slice();
  const arrayStates: ArrayState[] = [];

  for (let i = 0; i < arrInput.length - 1; i++) {
    for (let j = 0; j < arrInput.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        arrayStates.push({ swappedIndices: [i, j], currArray: arr.slice() });
      }
    }
  }

  return arrayStates;
}
