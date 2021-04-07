// Return random integer betwee lower (inclusive) and upper (non-inclusive)
export function randomIntBetween(lower: number, upper: number) {
  return Math.floor(Math.random() * (upper - lower)) + lower;
}

// Swap items at the given indexes
export function swap<T>(arr: T[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Create a delay for the specified amount of time in millis
export function wait(delayTime: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delayTime);
  });
}

// Return a sorted list with range lower -> upper, with a function to specify the step
export function range(
  lower: number,
  upper: number,
  step = (x: number) => x + 1
) {
  const array = [];

  while (lower < upper) {
    array.push(lower);
    lower = step(lower);
  }

  return array;
}

export function max(arr: number[]) {
  return arr.reduce((currMax, elem) => Math.max(currMax, elem), 0);
}

// Return a shuffled array with range MIN_ARRAY_LEN -> MAX_ARRAY_LEN
export function randomArray(lowerLimit: number, upperLimit: number): number[] {
  const length = randomIntBetween(lowerLimit, upperLimit);
  const array = range(0, length);

  return shuffle(array);
}

export function shuffle<T>(arr: T[]) {
  let currIndex = arr.length;

  while (currIndex > 0) {
    const randomIndex = randomIntBetween(0, currIndex);
    currIndex--;

    swap(arr, currIndex, randomIndex);
  }

  return arr;
}

export function isSorted(arr: number[]) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
}

export function flatten<T>(arr: T[]) {
  return arr.reduce((acc, elem) => acc.concat(elem), []);
}
