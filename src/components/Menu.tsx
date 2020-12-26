import React from "react";

interface Props {
  initialSortingAlgo: string;
  running: boolean;
  sort: () => void;
  shuffle: () => void;
  updateSortingAlgo: (str: string) => void;
  createNewArray: () => void;
  delayMultiplier: number;
  updateDelayMultiplier: (delayMultiplier: number) => void;
}

export const Menu = ({
  initialSortingAlgo,
  running,
  sort,
  shuffle,
  updateSortingAlgo,
  createNewArray,
  delayMultiplier,
  updateDelayMultiplier,
}: Props) => {
  
  function handleUpdateSortingAlgo(event) {
    updateSortingAlgo(event.target.value);
  }

  function handleUpdateDelayMultiplier(event) {
    const delayMultiplierString: string = event.target.value;
    const delayMultiplier = delayMultiplierString.slice(
      1,
      delayMultiplierString.length
    );

    updateDelayMultiplier(JSON.parse(delayMultiplier));
  }

  // Renders the same menu as default, but with all options removed
  const emptyNavBar = (
    <header>
      <nav>
        <ul id="menu">
          <button className="empty-menu-button">-</button>
        </ul>
      </nav>
    </header>
  );

  const menuNavBar = (
    <header>
      <nav>
        <ul id="menu">
          <select
            value={initialSortingAlgo}
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
          <div>
            <label htmlFor="select-speed" className="menu-text">
              Toggle Speed:
            </label>
            <select
              id="select-speed"
              value={"x" + delayMultiplier.toFixed(1)}
              className="menu-button"
              onChange={handleUpdateDelayMultiplier}
            >
              <option value="x0.1">x0.1</option>
              <option value="x0.5">x0.5</option>
              <option value="x1.0">x1.0</option>
              <option value="x1.5">x1.5</option>
            </select>
          </div>
          <button className="menu-button" onClick={sort}>
            Sort
          </button>
          <button className="menu-button" onClick={shuffle}>
            Shuffle
          </button>
          <button className="menu-button" onClick={createNewArray}>
            Create New Array
          </button>
        </ul>
      </nav>
    </header>
  );

  // We only want the user to access the menu when there's no animations running
  if (running) {
    return emptyNavBar;
  } else {
    return menuNavBar;
  }
};
