function genPrimeArr(num) {
  let arr = new Array(num + 1);
  arr.fill(true);
  arr[0] = false;
  arr[1] = false;

  let i = 2;
  while (i * i < num) {
    for (let j = i * i; j < num; j += i) {
      arr[j] = false;
    }
    i = arr.indexOf(true, i + 1);
  }

  let result = [];
  for (let i = 0; i < num; i++) {
    if (arr[i] == true) result.push(i);
  }
  return result;
}

function binarySearch(array, num, start = 0, end = array.length - 1) {
  let midpoint = Math.floor((start + end) / 2);
  if (start <= end) {
    if (num == array[midpoint]) {
      return true;
    } else if (num < array[midpoint]) {
      start = start;
      end = midpoint - 1;
      return binarySearch(array, num, start, end);
    } else if (num > array[midpoint]) {
      start = midpoint + 1;
      end = end;
      return binarySearch(array, num, start, end);
    }
  } else return false;
}
function sumPrimeArr(array) {
  let result = [];
  result[0] = array[0];
  for (let i = 1; i < array.length; i++) {
    result[i] = result[i - 1] + array[i];
  }
  return result;
}
function calcInterval(array, startPoint, endPoint) {
  if (startPoint > 0) return array[endPoint - 1] - array[startPoint - 1];
  else return array[endPoint - 1];
}

function primeMaxLengthChain(num) {
  const primeArr = genPrimeArr(num);
  const sumPrimeArray = sumPrimeArr(primeArr);
  let abort = false,
    total = [];
  for (let i = Math.ceil(primeArr.length / 3.9); i > 0; i--) {
    if (abort) break;
    let startPoint = 0;
    let endPoint = i;
    let currentTotal = 0;
    for (let j = startPoint, k = endPoint; k <= primeArr.length; j++, k++) {
      currentTotal = calcInterval(sumPrimeArray, j, k);
      if (binarySearch(primeArr, currentTotal)) {
        total.push(currentTotal);
        abort = true;
      }
    }
  }
  return total;
}
console.log(primeMaxLengthChain(100000));
// function genPrimeArr(num) {
//   let arr = new Array(num + 1);
//   arr.fill(true);
//   arr[0] = false;
//   arr[1] = false;

//   let i = 2;
//   while (i * i < num) {
//     for (let j = i * i; j < num; j += i) {
//       arr[j] = false;
//     }
//     i = arr.indexOf(true, i + 1);
//   }

//   let result = [];
//   for (let i = 0; i < num; i++) {
//     if (arr[i] == true) result.push(i);
//   }
//   return result;
// }

// function binarySearch(array, num, start = 0, end = array.length - 1) {
//   let midpoint = Math.floor((start + end) / 2);
//   if (start <= end) {
//     if (num == array[midpoint]) {
//       return true;
//     } else if (num < array[midpoint]) {
//       start = start;
//       end = midpoint - 1;
//       return binarySearch(array, num, start, end);
//     } else if (num > array[midpoint]) {
//       start = midpoint + 1;
//       end = end;
//       return binarySearch(array, num, start, end);
//     }
//   } else return false;
// }
// function primeMaxLengthChain(num) {
//   const primeArr = genPrimeArr(num);
//   let abort = false,
//     total = [];
//   for (let i = Math.ceil(primeArr.length / 3.5); i > 0; i--) {
//     let startPoint = 0;
//     let endPoint = i;
//     let currentTotal = primeArr
//       .slice(startPoint, endPoint)
//       .reduce((sum, currentNum) => sum + currentNum, 0);
//     for (let j = startPoint, k = endPoint; k < primeArr.length; j++, k++) {
//       if (binarySearch(primeArr, currentTotal)) {
//         total.push(currentTotal);
//         abort = true;
//       }
//       currentTotal = currentTotal + primeArr[k] - primeArr[j];
//     }
//     if (abort) break;
//   }
//   return total;
// }
