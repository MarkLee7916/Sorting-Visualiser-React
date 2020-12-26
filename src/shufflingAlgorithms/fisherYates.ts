import { ArrayState } from "../arrayState";
import { randomIntBetween, swap } from "../utils";

export function fisherYates(arrInput: number[]) {
  const arr = arrInput.slice();
  const arrayStates: ArrayState[] = [];
  let currIndex = arr.length;

  while (currIndex > 0) {
    const randomIndex = randomIntBetween(0, currIndex);
    currIndex--;

    swap(arr, currIndex, randomIndex);
    arrayStates.push({
      swappedIndices: [currIndex, randomIndex],
      currArray: arr.slice(),
    });
  }

  arrayStates.push({ swappedIndices: [null, null], currArray: arr.slice() });

  return arrayStates;
}
