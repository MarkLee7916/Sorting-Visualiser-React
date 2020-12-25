import React from "react";

interface Props {
  initialSortingAlgo: string;
  running: boolean;
  sort: () => void;
  shuffle: () => void;
  updateSortingAlgo: (str: string) => void;
  createNewArray: () => void;
}

export const Menu = ({ initialSortingAlgo, running, sort, shuffle, updateSortingAlgo, createNewArray }: Props) => {
  function handleUpdateSortingAlgo(event) {
    updateSortingAlgo(event.target.value);
  }

  const emptyNavBar = (
     <header>
        <nav>
          <ul id="menu">
            <button className="empty-menu-button">
              ----------------------
            </button>
          </ul>
        </nav>
      </header>
  )

  const menuNavBar = (
     <header>
        <nav>
          <ul id="menu">
            <select value={initialSortingAlgo} className="menu-button" onChange={handleUpdateSortingAlgo}>
              <option value="insertion-sort">Insertion Sort</option>
              <option value="quick-sort">Quick Sort</option>
              <option value="heap-sort">Heap Sort</option>
              <option value="selection-sort">Selection Sort</option>
              <option value="bubble-sort">Bubble Sort</option>
              <option value="merge-sort">Merge Sort</option>
              <option value="counting-sort">Counting Sort</option>
            </select>
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
  )

  if (running) {
    return emptyNavBar;
  } else {
    return menuNavBar;
  }
};
