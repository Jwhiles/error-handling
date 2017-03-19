// Say you have a function multiply that, in 50 percent of cases, multiplies two numbers, and in the other 50 percent, throws an error. Write a function that wraps this function and just keeps trying until a call succeeds, after which it returns the result.


function multiply(a, b) {
  if (Math.random() < 0.5)
    return a * b;
  else
    throw new Error ('multiplication failure');
}

function reliableMultiply(a, b) {
  // Your code here.
}

console.log(reliableMultiply(8, 8));
// → 64

// now write the function retryMultiply, which will call  multiply until it succeeds, or fails three times - whichever comes first.
// If it the eventual result is success return the value, else return the error message

function multiplyRetry(a, b) {
  // Your code here.
}

console.log(multiplyRetry(5, 4));
// → 20
// or
// → multiplication failure
