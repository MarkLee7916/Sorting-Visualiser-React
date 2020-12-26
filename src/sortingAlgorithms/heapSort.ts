import { ArrayState } from "../arrayState";
import { swap } from "../utils";

export function heapSort(arrInput: number[]) {
  const arr = arrInput.slice();
  const arrayStates: ArrayState[] = [];

  buildHeap(arr, arrayStates);

  for (let i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    heapify(arr, 0, i, arrayStates);
  }

  arrayStates.push({ swappedIndices: [null, null], currArray: arr.slice() });

  return arrayStates;
}

function buildHeap(arr: number[], arrayStates: ArrayState[]) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length, arrayStates);
  }
}

function heapify(
  arr: number[],
  root: number,
  cutoff: number,
  arrayStates: ArrayState[]
) {
  const left = 2 * root + 1;
  const right = 2 * root + 2;
  let max = root;

  if (right < cutoff && arr[right] > arr[max]) {
    max = right;
  }

  if (left < cutoff && arr[left] > arr[max]) {
    max = left;
  }

  if (root != max) {
    swap(arr, root, max);
    heapify(arr, max, cutoff, arrayStates);
    arrayStates.push({ swappedIndices: [root, max], currArray: arr.slice() });
  }
}
