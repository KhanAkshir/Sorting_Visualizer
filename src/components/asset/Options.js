import React from "react";
import "../static/options.css"
const Options = (props) => {
  return (
    <div className='dropdown'>
      <select id="options" onChange={props.function} disabled={props.disableOptions}>
        <option value='bubbleSort'>Bubble Sort</option>
        <option value='selectionSort'>Selection Sort</option>
        <option value='insertionSort'>Insertion Sort</option>
        <option value='mergeSort'>Merge Sort</option>
        <option value='quickSort'>Quick Sort</option>
        <option value='heapSort'>Heap Sort</option>
      </select>
    </div>
  );
};

export default Options;
