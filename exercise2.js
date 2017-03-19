// The below function takes a number and throws an error if it is too small.
const syncSizeChecker = (int) => {
  try {
    if (int < 10) {
      throw new Error('too small');
    } else {
      console.log('all fine');
    }
  }
  catch (err) {
    console.log('you had an error: ', err.message);
  }
}

// This function should do the same as the above, but asynchronouslyslylsously. Please rewrite it and it's callback, so they work :)
const asyncSizeChecker = (int) => {
  try {
    setTimeout(() => {
      if (int < 10) {
        throw new Error('too small');
      } else {
        console.log('all fine');
      }
  }, 1000)
  }
  catch (err) {
    console.log('you had an error: ', err.message);
  }
}


const asyncCB = (err, data) => {
 // your code here
}


syncSizeChecker(5);
// you had an error:  too small
syncSizeChecker(11);
// all fine

asyncSizeChecker(5, asyncCB);
// you had an error:  too small
asyncSizeChecker(11, asyncCB);
// all fine
