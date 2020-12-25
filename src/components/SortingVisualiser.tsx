import React, { useState } from "react";
import { insertionSort } from "../sortingAlgorithms/insertionSort";
import { quickSort } from "../sortingAlgorithms/quickSort";
import { heapSort } from "../sortingAlgorithms/heapSort";
import { selectionSort } from "../sortingAlgorithms/selectionSort";
import { randomIntBetween, wait, shuffle, range, isSorted } from "../utils";
import { v4 as generateUniqueKey } from "uuid";
import { Bar } from "./Bar";
import { Menu } from "./Menu";
import { bubbleSort } from "../sortingAlgorithms/bubbleSort";
import { fisherYates } from "../shufflingAlgorithms/fisherYates";
import { mergeSort } from "../sortingAlgorithms/mergeSort";
import { ArrayState } from "../arrayState";
import { countingSort } from "../sortingAlgorithms/countingSort";

const MIN_ARRAY_LEN = 100;
const MAX_ARRAY_LEN = 150;

type Algo = (arr: number[]) => ArrayState[];

export const SortingVisualiser = () => {
    const [array, newArray] = useState({ swappedIndices: [null, null], currArray: randomArray() });
    const [currSortingAlgo, newSortingAlgo] = useState("insertion-sort");
    const [running, setRunning] = useState(false);

    const algoRepresentations = new Map<string, Algo>([
        ["insertion-sort", insertionSort],
        ["quick-sort", quickSort],
        ["heap-sort", heapSort],
        ["selection-sort", selectionSort],
        ["bubble-sort", bubbleSort],
        ["merge-sort", mergeSort],
        ["counting-sort", countingSort],
        ["shuffle", fisherYates]
    ]);

    const relativeDelays = new Map<string, number>([
        ["insertion-sort", 0],
        ["bubble-sort", 0],
        ["heap-sort", 0],
        ["quick-sort", 10],
        ["counting-sort", 10],
        ["shuffle", 20],
        ["selection-sort", 30], 
        ["merge-sort", 100]
    ]);

    function randomArray(): number[] {
        const length = randomIntBetween(MIN_ARRAY_LEN, MAX_ARRAY_LEN);
        const array = range(0, length);

        return shuffle(array);
    }

    function updateSortingAlgo(algo: string) {
        newSortingAlgo(algo);
    }

    function createNewArray() {
        newArray({
            swappedIndices: [null, null],
            currArray: randomArray(),
        });
    }

    function renderSortingAlgo() {
        if (!isSorted(array.currArray)) {
            renderAlgo(currSortingAlgo);
        }
    }

    function renderShufflingAlgo() {
        renderAlgo("shuffle");
    }

    async function renderAlgo(algoStr: string) {
        const algo = algoRepresentations.get(algoStr);
        const delay = relativeDelays.get(algoStr);
        const states = algo(array.currArray);

        for (let i = 0; i < states.length; i++) {
            await wait(delay);

            newArray(states[i]);

            // For some reason, UI has weird bugs if you put this above the for loop
            setRunning(true);
        }

        setRunning(false);
    }

    return (
        <>
            <Menu
                initialSortingAlgo={currSortingAlgo}
                running={running}
                sort={renderSortingAlgo}
                shuffle={renderShufflingAlgo}
                updateSortingAlgo={updateSortingAlgo}
                createNewArray={createNewArray}
            />
            <div className="array">
                {array.currArray.map((elem, index) => (
                    <Bar
                        value={elem}
                        isSwapped={array.swappedIndices.includes(index)}
                        isSorted={isSorted(array.currArray)}
                        key={generateUniqueKey()}
                    />
                ))}
            </div>
        </>
    );
};
