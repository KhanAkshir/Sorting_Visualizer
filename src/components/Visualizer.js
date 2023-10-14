import React, { useState, useEffect } from "react";

import Button from "./asset/Button";
import Options from "./asset/Options";
import Slider from "./asset/Slider";
import "./static/visualizer.css";


function Visualizer() {
  //   Create state variables
  const [arraySize, setArraySize] = useState(10);
  const [randomArray, setRandomArray] = useState([]);
  const [disableOptions, setdisableOption] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [speed, setspeed] = useState(100);


  //  Function to generate a random array based on the array size
  function generateRandomArray() {
    document.getElementById("array-container").style.backgroundColor = "yellow";

    document.body.style.backgroundColor = "gray";
    document.getElementById("title").style.color = "yellow";

    for (let i = 0; i < randomArray.length; i++) {
      let bar = document.getElementById(i).style;
      bar.backgroundColor = "black";
    }
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * (100 - 10 + 1)) + 10); // Adjust the range as needed
    }

    setRandomArray([...newArray]);
  }

  useEffect(() => {
    generateRandomArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  const maxi = Math.max(...randomArray);
  const animationSpeed = 10000 / ((arraySize * speed) / 10); ///////////////////////////////////////////////////////////////////////////////

  function sleep(milliSeconds) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => setTimeout(resolve, milliSeconds));
    });
  }

  async function finishedAnimation() {
    

    document.body.style.backgroundColor = "yellow";
    document.getElementById("title").style.color = "red";
    document.getElementById("array-container").style.backgroundColor = "black";

    for (let i = 0; i < randomArray.length; i++) {
      let bar = document.getElementById(i).style;
      bar.backgroundColor = "yellow";
      await sleep(1);
    }
    setdisableOption(false);
  }

  // Selection Sort
  async function selectionSort() {
    let currentArr = randomArray;
    for (let i = 0; i < currentArr.length - 1; i++) {
      var minimum = i;
      for (let j = i + 1; j < currentArr.length; j++) {
        if (currentArr[minimum] > currentArr[j]) {
          let bar = document.getElementById(j).style;
          document.getElementById(i).style.backgroundColor = "white";
          bar.backgroundColor = "red";
          await sleep(animationSpeed);
          bar.backgroundColor = "black";
          minimum = j;
        } else {
          document.getElementById(i).style.backgroundColor = "white";
          document.getElementById(j).style.backgroundColor = "green";
          await sleep(animationSpeed);
          document.getElementById(i).style.backgroundColor = "black";
          document.getElementById(j).style.backgroundColor = "black";
        }
      }

      if (minimum !== i) {
        let bar1 = document.getElementById(i).style;
        let bar2 = document.getElementById(minimum).style;
        bar1.backgroundColor = "white";
        bar2.backgroundColor = "red";

        await sleep(animationSpeed);
        
        let temp = currentArr[minimum];
        currentArr[minimum] = currentArr[i];
        currentArr[i] = temp;
        setRandomArray([...currentArr]);
        bar1.backgroundColor = "red";
        bar2.backgroundColor = "white";
        await sleep(animationSpeed);

        bar1.backgroundColor = "black";
        bar2.backgroundColor = "black";
      }
      let sorted_bar = document.getElementById(i).style;
      sorted_bar.backgroundColor = "red";
    }
    finishedAnimation();
  }

  //bubble sort
  async function bubbleSort() {
    let currentArr = randomArray;
    for (let i = 0; i < currentArr.length - 1; i++) {
      let check = true;
      for (let j = 0; j < currentArr.length - i - 1; j++) {
        if (currentArr[j] > currentArr[j + 1]) {
          check = false;
          let bar1 = document.getElementById(j).style;
          let bar2 = document.getElementById(j + 1).style;

          bar1.backgroundColor = "blue";
          bar2.backgroundColor = "red";

          await sleep(animationSpeed);
          
          let temp = currentArr[j];
          currentArr[j] = currentArr[j + 1];
          currentArr[j + 1] = temp;
          setRandomArray([...currentArr]);
          bar1.backgroundColor = "red";
          bar2.backgroundColor = "blue";
          await sleep(animationSpeed);

          bar1.backgroundColor = "black";
          bar2.backgroundColor = "black";
        } else {
          document.getElementById(j).style.backgroundColor = "green";
          document.getElementById(j + 1).style.backgroundColor = "green";
          await sleep(animationSpeed);
          document.getElementById(j).style.backgroundColor = "black";
          document.getElementById(j + 1).style.backgroundColor = "black";
        }
      }
      if (check === true) {
        break;
      }
      let sorted_bar = document.getElementById(currentArr.length - i - 1).style;
      sorted_bar.backgroundColor = "red";
    }

    finishedAnimation();
  }

  //Insertion sort
  async function insertionSort() {
    let currentArr = randomArray;
    for (let i = 1; i < currentArr.length; i++) {
      let current = currentArr[i];
      let j = i - 1;
      if (current < currentArr[j]) {
        document.getElementById(j).style.backgroundColor = "blue";
        document.getElementById(i).style.backgroundColor = "red";
        await sleep(animationSpeed);
        document.getElementById(j).style.backgroundColor = "black";
        document.getElementById(i).style.backgroundColor = "black";

        while (j >= 0 && current < currentArr[j]) {
          let bar1 = document.getElementById(j + 1).style;
          let bar2 = document.getElementById(j).style;
          currentArr[j + 1] = currentArr[j];
          setRandomArray([...currentArr]);

          bar1.backgroundColor = "black";
          bar2.backgroundColor = "gray";

          await sleep(animationSpeed);
          bar1.backgroundColor = "black";
          bar2.backgroundColor = "black";
          j--;
        }
        if (j !== i - 1) {
          currentArr[j + 1] = current;
          setRandomArray([...currentArr]);
          let bar = document.getElementById(j + 1).style;
          bar.backgroundColor = "red";
          await sleep(animationSpeed);
          bar.backgroundColor = "black";
        }
      } else {
        document.getElementById(j).style.backgroundColor = "green";
        document.getElementById(i).style.backgroundColor = "green";
        await sleep(animationSpeed);
        document.getElementById(j).style.backgroundColor = "black";
        document.getElementById(i).style.backgroundColor = "black";
      }
    }
    finishedAnimation();
  }

  //Merge Sort
  async function mergeSort() {
    let currentArr = randomArray;

    await mergesort_help(currentArr, 0, currentArr.length - 1);
    finishedAnimation();
  }

  async function mergesort_help(arr, low, high) {
    if (low < high) {
      let mid = Math.floor((low + high) / 2);
      await mergesort_help(arr, low, mid);
      await mergesort_help(arr, mid + 1, high);
      await merge(arr, low, mid, high);
      setRandomArray([...arr]);
    }
  }

  async function merge(arr, low, mid, high) {
    let i = low;
    let j = mid + 1;
    let k = 0;
    let tempArr = [];

    while (i <= mid && j <= high) {
      let bar1 = document.getElementById(i).style;
      let bar2 = document.getElementById(j).style;
      bar1.backgroundColor = "red";
      bar2.backgroundColor = "green";
      if (arr[i] < arr[j]) {
        tempArr[k] = arr[i];
        i++;
        k++;
      } else {
        tempArr[k] = arr[j];
        j++;
        k++;
      }

      await sleep(animationSpeed);

      bar1.backgroundColor = "black";
      bar2.backgroundColor = "black";
    }

    while (i <= mid) {
      tempArr[k] = arr[i];

      let bar1 = document.getElementById(i).style;

      bar1.backgroundColor = "orange";

      await sleep(animationSpeed);

      bar1.backgroundColor = "black";

      i++;
      k++;
    }

    while (j <= high) {
      tempArr[k] = arr[j];

      let bar2 = document.getElementById(j).style;

      bar2.backgroundColor = "orange";

      await sleep(animationSpeed);

      bar2.backgroundColor = "black";

      j++;
      k++;
    }

    for (let i = low; i <= high; i++) {
      arr[i] = tempArr[i - low];
      sleep(animationSpeed);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //  quickSort

  async function quickSort() {
    let currentArr = randomArray;
    await quickSort_help(currentArr, 0, currentArr.length - 1);
    await finishedAnimation();
  }

  async function quickSort_help(arr, s, e) {
    if (s < e) {
      let pivot_index = await partition(arr, s, e);
      await quickSort_help(arr, s, pivot_index - 1);
      await quickSort_help(arr, pivot_index + 1, e);
    }
  }

  async function partition(arr, s, e) {
    let count = 0;
    let pivot_element = arr[s];
    for (let i = s + 1; i <= e; i++) {
      if (arr[i] <= pivot_element) {
        count++;
      }
    }
    console.log(count);
    let pivot_index = s + count;
    let pivot_index_bar = document.getElementById(pivot_index).style;
    let pivot_bar = document.getElementById(s).style;
    pivot_index_bar.backgroundColor = "green";
    pivot_bar.backgroundColor = "red";
    await sleep(animationSpeed);
    let temp = arr[s];
    arr[s] = arr[pivot_index];
    arr[pivot_index] = temp;
    setRandomArray([...arr]);

    pivot_index_bar.backgroundColor = "red";
    pivot_bar.backgroundColor = "green";
    await sleep(animationSpeed);

    pivot_bar.backgroundColor = "black";

    let i = s;
    let j = e;
    while (i < pivot_index && j > pivot_index) {
      pivot_index_bar.backgroundColor = "red";

      while (arr[i] <= arr[pivot_index]) {
        let bar_i = document.getElementById(i).style;

        bar_i.backgroundColor = "white";
        await sleep(animationSpeed);
        bar_i.backgroundColor = "black";
        i++;
      }

      while (arr[j] > arr[pivot_index]) {
        let bar_j = document.getElementById(j).style;
        bar_j.backgroundColor = "blue";
        await sleep(animationSpeed);
        bar_j.backgroundColor = "black";
        j--;
      }

      if (i < pivot_index && j > pivot_index) {
        let bar_j = document.getElementById(j).style;
        let bar_i = document.getElementById(i).style;
        bar_i.backgroundColor = "white";
        bar_j.backgroundColor = "blue";
        await sleep(animationSpeed);

        let temp1 = arr[i];
        arr[i] = arr[j];
        arr[j] = temp1;

        setRandomArray([...arr]);
        bar_i.backgroundColor = "blue";
        bar_j.backgroundColor = "white";
        await sleep(animationSpeed);
        bar_i.backgroundColor = "black";
        bar_j.backgroundColor = "black";
        i++;
        j--;
      }
    }
    pivot_index_bar.backgroundColor = "black";

    return pivot_index;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function heapSort() {
    let currentArr = randomArray;
    await heapSort_help(currentArr);
    finishedAnimation();
  }

  async function heapSort_help(arr) {
    const n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setRandomArray([...arr]);
      document.getElementById(i).style.backgroundColor = "red";
      await heapify(arr, i, 0);
    }
  }

  async function heapify(arr, n, i) {
    let largest = i;
    let bar1 = document.getElementById(largest).style;
    bar1.backgroundColor = "white";
    await sleep(animationSpeed);
    bar1.backgroundColor = "black";
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && arr[i] < arr[left]) {
        let bar = document.getElementById(left).style;
        let bar1 = document.getElementById(largest).style;
        bar.backgroundColor = "brown";
        bar1.backgroundColor = "white";
        await sleep(animationSpeed);
        bar.backgroundColor = "black";
        bar1.backgroundColor = "black";
        largest = left;
      }

      if (right < n && arr[largest] < arr[right]) {
        let bar = document.getElementById(right).style;
        let bar1 = document.getElementById(i).style;
        bar.backgroundColor = "pink";
        bar1.backgroundColor = "white";
        await sleep(animationSpeed);
        bar.backgroundColor = "black";
        bar1.backgroundColor = "black";
        largest = right;
      }

      if (largest !== i) {
        let bar1 = document.getElementById(largest).style;
        let bar2 = document.getElementById(i).style;
        bar1.backgroundColor = "red";
        bar2.backgroundColor = "blue";
        await sleep(animationSpeed);
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setRandomArray([...arr]);
        bar2.backgroundColor = "red";
        bar1.backgroundColor = "blue";
        await sleep(animationSpeed);
        bar2.backgroundColor = "black";
        bar1.backgroundColor = "black";

        i = largest;
      } else {
        break;
      }
    }
  }

  function selectalgo() {
    setdisableOption(true);
    document.body.style.backgroundColor = "gray";
    document.getElementById("title").style.color = "yellow";
    document.getElementById("array-container").style.backgroundColor = "yellow";

    switch (algorithm) {
      case "bubbleSort":
        bubbleSort();

        break;
      case "selectionSort":
        selectionSort();
        break;
      case "insertionSort":
        insertionSort();
        break;
      case "mergeSort":
        mergeSort();
        break;
      case "quickSort":
        quickSort();
        break;
      case "heapSort":
        heapSort();
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div id="top">
        <div id="head">
          <div id="part1">
            <Slider
              name="Array_size"
              function={(e) => {
                setArraySize(e.target.value);
              }}
              min={10}
              max={50}
              disbleoption={disableOptions}
              val={arraySize}
            />

            <div id="display">
              <p>{arraySize}</p>
            </div>

            <Slider
              name="Animation_Speed"
              function={(e) => {
                setspeed(e.target.value);
              }}
              min={100}
              max={1000}
              step={100}
              disbleoption={disableOptions}
              val={speed}
            />
            <div id="display1">
              <p>{speed}</p>
            </div>
          </div>
          <div id="part2">
            <h1 id="title">Sorting_Visualizer</h1>
            
          </div>
        </div>

        <div className="btn">
          <Options
            function={(e) => setAlgorithm(e.target.value)}
            disableOptions={disableOptions}
          />

          <Button
            function={selectalgo}
            disbleoption={disableOptions}
            name={"Run"}
          />

          <Button
            function={generateRandomArray}
            disbleoption={disableOptions}
            name="New_Array"
          />
        </div>
      </div>

      {/* Displaying array*/}
      <div id="array-container">
        {randomArray.map((value, index) => (
          <div
            className="array-bar"
            style={{
              height: `${value * 5}px`,
              width: `${1.5}%`,
              marginTop: `${545 - maxi * 5}px`,
            }}
            key={index}
            id={index}
          ></div>
        ))}
      </div>
    </>
  );
}

export default Visualizer;
