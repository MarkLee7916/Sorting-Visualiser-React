import React from "react";

interface Props {
  running: boolean;
  sort: () => void;
  shuffle: () => void;
  updateSortingAlgo: (str: string) => void;
  createNewArray: () => void;
  updateDelayMultiplier: (delayMultiplier: number) => void;
}

export const Menu = ({
  running,
  sort,
  shuffle,
  updateSortingAlgo,
  createNewArray,
  updateDelayMultiplier,
}: Props) => {

  const runningVisibility = running ? "hidden" : "visible";

  function handleUpdateSortingAlgo(event) {
    updateSortingAlgo(event.target.value);
  }

  function handleUpdateDelayMultiplier(event) {
    const delayMultiplier: string = event.target.value;

    updateDelayMultiplier(parseFloat(delayMultiplier));
  }

  return (
    <header>
      <nav>
        <ul id="menu">
          <select
            className="menu-button"
            onChange={handleUpdateSortingAlgo}
          >
            <option value="insertion-sort">Insertion Sort</option>
            <option value="quick-sort">Quick Sort</option>
            <option value="heap-sort">Heap Sort</option>
            <option value="selection-sort">Selection Sort</option>
            <option value="bubble-sort">Bubble Sort</option>
            <option value="merge-sort">Merge Sort</option>
            <option value="counting-sort">Counting Sort</option>
          </select>

          <div style={{ visibility: runningVisibility }}>
            <label htmlFor="select-speed" className="menu-text">
              Toggle Speed:
            </label>

            <select
              id="select-speed"
              className="menu-button"
              onChange={handleUpdateDelayMultiplier}
            >
              <option value="1.0">x1.0</option>
              <option value="0.5">x0.5</option>
              <option value="0.25">x0.25</option>
              <option value="0.1">x0.1</option>
            </select>
          </div>

          <button className="menu-button" onClick={sort} style={{ visibility: runningVisibility }}>
            Sort
          </button>

          <button className="menu-button" onClick={shuffle} style={{ visibility: runningVisibility }}>
            Shuffle
          </button>

          <button className="menu-button" onClick={createNewArray} style={{ visibility: runningVisibility }}>
            Create New Array
          </button>
        </ul>
      </nav>
    </header>
  );
};
