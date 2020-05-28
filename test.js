const array1 = [1,2,3];
const array2 = [1,2,3,4];
const array3 = [1,2];
const array4 = [1,5]

let checker = (array, subarray) => {
    return subarray.every(value => {
        return array.includes(value)
    });
}

//let checker = (arr, target) => target.every(v => arr.includes(v));

console.log();

console.log('this is checker', checker(array2, array4));