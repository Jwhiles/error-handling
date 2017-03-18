// rewrite this async

const syncSizeChecker = (data) => {
  try {
    if (data < 10) {
      throw new Error('too small');
    } else {
      console.log('all fine');
    }
  }
  catch (err) {
    console.log('you had an error: ', err.message);
  }
}


// please finish these functions so they can handle errors asynchronously
const asyncSizeChecker = (data) => {
  try {
    setTimeout(() => {
      if (data < 10) {
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
syncSizeChecker(11);

asyncSizeChecker(5, asyncCB);
asyncSizeChecker(11, asyncCB);
