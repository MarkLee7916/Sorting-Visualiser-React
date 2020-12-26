import React, { useState } from "react";
import { insertionSort } from "../sortingAlgorithms/insertionSort";
import { quickSort } from "../sortingAlgorithms/quickSort";
import { heapSort } from "../sortingAlgorithms/heapSort";
import { selectionSort } from "../sortingAlgorithms/selectionSort";
import { wait, isSorted, randomArray } from "../utils";
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
  // Internal representation of the array we're sorting displayed on the screen
  const [array, newArray] = useState(generateArray());

  // Holds a string representation of the current algorithm user has selected
  const [currSortingAlgo, newSortingAlgo] = useState("insertion-sort");

  // A flag that is true if an algorithm is currently running, otherwise false
  const [running, setRunning] = useState(false);

  // User controlled multiplier for delays where lower delays mean faster animations
  const [delayMultiplier, newDelayMultiplier] = useState(1);

  // Maps the string representation of an algorithm to its implementation
  const algoRepresentations = new Map<string, Algo>([
    ["insertion-sort", insertionSort],
    ["quick-sort", quickSort],
    ["heap-sort", heapSort],
    ["selection-sort", selectionSort],
    ["bubble-sort", bubbleSort],
    ["merge-sort", mergeSort],
    ["counting-sort", countingSort],
    ["shuffle", fisherYates],
  ]);

  // Some algorithms run faster than others, so this map stores a different delay value for each algo
  // Where a lower delay value means a faster animation
  const relativeDelays = new Map<string, number>([
    ["insertion-sort", 1],
    ["bubble-sort", 1],
    ["heap-sort", 5],
    ["counting-sort", 20],
    ["quick-sort", 50],
    ["shuffle", 50],
    ["selection-sort", 50],
    ["merge-sort", 100],
  ]);

  // Wrapper around newSortingAlgo hook to pass into the Menu component
  function updateSortingAlgo(algo: string) {
    newSortingAlgo(algo);
  }

  // Wrapper around newDelayMultiplier hook to pass into the Menu component
  function updateDelayMultiplier(updatedDelayMultiplier: number) {
    newDelayMultiplier(updatedDelayMultiplier);
  }

  // Generate an array object
  function generateArray() {
    const array = randomArray(MIN_ARRAY_LEN, MAX_ARRAY_LEN);
    const swappedIndices = [null, null];

    return { currArray: array, swappedIndices: swappedIndices };
  }

  // Generate array and update array state
  function createNewArray() {
    newArray(generateArray());
  }

  // Animate the current sorting algorithm the user has selected
  function renderSortingAlgo() {
    if (isSorted(array.currArray)) {
      alert("Array already sorted!");
    } else {
      renderAlgo(currSortingAlgo);
    }
  }

  // Animate the main shuffling algorithm
  function renderShufflingAlgo() {
    renderAlgo("shuffle");
  }

  // Animate the algorithm string represntation passed as a parameter
  async function renderAlgo(algoStr: string) {
    const algo = algoRepresentations.get(algoStr);
    const delay = relativeDelays.get(algoStr);
    const states = algo(array.currArray);

    for (let i = 0; i < states.length; i++) {
      await wait(delay * (1 / delayMultiplier));

      newArray(states[i]);

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
        delayMultiplier={delayMultiplier}
        updateDelayMultiplier={updateDelayMultiplier}
      />
      <div className="array">
        {array.currArray.map((elem, index) => (
          <Bar
            value={elem}
            isSwapped={array.swappedIndices.includes(index)}
            isSorted={isSorted(array.currArray)}
            key={elem}
          />
        ))}
      </div>
    </>
  );
};
