import { ArrayState } from "../arrayState";
import { max } from "../utils";

export function countingSort(arr: number[]) {
    const arrayStates: ArrayState[] = [];
    const freqList = Array(max(arr)).fill(0);
    const returnArray = [];

    arr.forEach(num => {
        freqList[num]++;
    });

    freqList.forEach((num, index) => {
        while (num > 0) {
            returnArray.push(index);
            num--;
        }
        arrayStates.push({ swappedIndices: [null, null], currArray: returnArray.slice() });
    });

    return arrayStates;
}