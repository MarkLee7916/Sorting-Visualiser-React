import { ArrayState } from "../arrayState";

export function mergeSort(arr: number[]) {
    const arrayStates: ArrayState[] = [];
    
    for (let width = 1; width < arr.length; width *= 2) {
        for (let lowerBound = 0; lowerBound < arr.length; lowerBound = lowerBound + 2 * width) {
            const midPoint = Math.min(lowerBound + width, arr.length);
            const upperBound = Math.min(lowerBound + 2 * width, arr.length);

            merge(arr, lowerBound, midPoint, upperBound, arrayStates);
        }
    }

    return arrayStates;
}

function merge(arr: number[], lowerBound: number, midPoint: number, upperBound: number, arrayStates: ArrayState[]) {
    const auxiliaryMerged = [];
    let lowerPointer = lowerBound;
    let upperPointer = midPoint;

    for (let i = lowerBound; i < upperBound; i++) {
        if (lowerPointer < midPoint && (upperPointer >= upperBound || arr[lowerPointer] < arr[upperPointer])) {
            auxiliaryMerged.push(arr[lowerPointer]);
            lowerPointer++;
        }
        else {
            auxiliaryMerged.push(arr[upperPointer]);
            upperPointer++;
        }
    }

    auxiliaryMerged.forEach((item, i) => { 
        arr[lowerBound + i] = item; 
    });

    arrayStates.push({ swappedIndices: [null, null], currArray: arr.slice() });
}
