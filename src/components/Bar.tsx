import React from "react";
import { isWidescreen } from "../constants";

interface Props {
  value: number;
  isSwapped: boolean;
  isSorted: boolean;
}

const HEIGHT_MULTIPLIER = isWidescreen ? 4.5 : 9;
const DEFAULT_COLOR = "rgb(127,219,255)";
const SWAP_COLOR = "rgb(255, 111, 97)";
const SORTED_COLOR = "rgb(0,255,127)";

export const Bar = ({ value, isSwapped, isSorted }: Props) => {
  function getBarColor() {
    if (isSorted) {
      return SORTED_COLOR;
    } else if (isSwapped) {
      return SWAP_COLOR;
    } else {
      return DEFAULT_COLOR;
    }
  }

  return (
    <div
      className="bar"
      style={{
        height: `${HEIGHT_MULTIPLIER * value}px`,
        backgroundColor: getBarColor(),
      }}
    ></div>
  );
};
