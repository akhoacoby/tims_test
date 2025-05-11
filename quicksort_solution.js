// Partition function
function partition(arr, low, high) {
  // Choose the pivot
  let pivot = arr[high];

  // Index of smaller element and indicates
  // the right position of pivot found so far
  let i = low - 1;

  // Traverse arr[low..high] and move all smaller
  // elements to the left side. Elements from low to
  // i are smaller after every iteration
  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }

  // Move pivot after smaller elements and
  // return its position
  swap(arr, i + 1, high);
  return i + 1;
}

// Swap function
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// The QuickSort function implementation
function quickSort(arr, low, high) {
  if (low < high) {
    // pi is the partition return index of pivot
    let pi = partition(arr, low, high);

    // Recursion calls for smaller elements
    // and greater or equals elements
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

// Main driver code
let arr = [10, 7, 8, 9, 1, 5];
let n = arr.length;

// Call QuickSort on the entire array
quickSort(arr, 0, n - 1);
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i] + " ");
}
