# error-handling
Workshop on error handling &amp; testing for errors

Error handling can be a pain - it will add extra code to your server, and you can easily write a server that will work without any error handling at all. However, if you want your server to be at all reliable, then you need to deal with errors that do arise. So let's learn how!

## What is an error?
If you write your code wrong, and it doesn't work, that is not an error. That is a bug, and the solution is to fix it. When we talk about errors, we mean problems that arise from sources we can't control. Two prime examples are
  - user input
  - external APIs

## Errors vs exceptions
In Javascript there is a class of objects called [errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).. We can create an error by typing `new Error('message')`. Errors are also created automatically in a number of different circumstances.

Simply creating an error doesn't really do anything.
>If an error falls over in a forest with no one to hear it, does it really even matter? - Confucius

Things get more interesting when we start to talk about exceptions. We can create an exception by typing `throw new Error('exceptional')`. If you add this to your javascript file, it will break. Try it. Really, try it. Now!!!

> Raising an exception somewhat resembles a super-charged return from a function: it jumps out of not just the current function but also out of its callers, all the way down to the first call that started the current execution... If exceptions always zoomed right down to the bottom of the stack, they would not be of much use. They would just provide a novel way to blow up your program. Their power lies in the fact that you can set “obstacles” along the stack to catch the exception as it is zooming down. Then you can do something with it, after which the program continues running at the point where the exception was caught. - Eloquent Javascript

## handling exceptions
So how do we typically handle an exception? The simplest option is often to pass the error to the client, and let your front end javascript deal with it. This means that your server can happily tick a long, passing out errors to be console logged by innocent front end developers.

Alternatively, we can simply log the error on the server - and then do nothing else. This is quick and easy, but it can leave users of your website in the dark about why your site isn't work.

Another option is to simply let our server crash. You might choose to do this in the case of an error that means we absolutely don't want our program to continue. I can't think of an example for this so PLEASE MAKE A PR

## Synchronous error handling
  In normal every day Javascript, the way your grandparents use to write it, we can use `try` and `catch` blocks to handle our errors.

```
function teachFac10(knowledgeOfErrors) {
  try {
    if (knowledgeOfErrors === 0) {
      throw "How can I teach you? I know nothing"
    }
  }
  catch(err) {
    alert(err);
  }
}
```

#### What's happening here then?
We tell the program to run the code contained within the try block - like so `try { run me }`.

If something is thrown with this try block, your program will immediately jump to the catch block - you can imagine catch as being like a function with a single argument, that is always the error that has been thrown.

This sort of code relies on SYNCHRONICITY. As soon as we start handling errors in asynchronous functions, which unfortunately is where most of your errors will arise, we have to take a different approach.

## Asynchronosusosus error handling
A lot of the code we will have to write in node.js will be asynchronous. Imagine that you want to make a request to an API for information about cats. You'll have to reach out to another server which will be an asynchronous operation. This sadly means that we can't use `try` and `catch`

### Why can't I try/catch?!
Consider the following example, which does not work.
  ```
  function getInformationAboutCats(callback) {
    try {
      asyncContactCatApi(function (err, data) {
        if (err) {
        throw (err);
        } else {
            // do something with the data
        });
    } catch (err) {
      alert('err')
    }
  }
}
  ```
In this situation, our async call has to wait until the rest of our synchronous code runs (If you are curious why, then [watch my favourite video](https://www.youtube.com/watch?v=8aGhZQkoFbQ)). This means that our catch statement will have been skipped over before our error is thrown. If we ever throw an error from the cat API our program will die. What a disaster!

You will by now hopefully have seen some error first callbacks. This style of callback is very common in Node.js programming.

Similarly to how we can use a callback to make use of any data from Asynch operations, we can use the same callback to handle our errors.

We might try and rewrite our above function like so
```
function getInformationAboutCats(callback) {
  asyncContactCatApi(function (err, data) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, data)
    }
}

getInformationAboutCats((err, data) => {
  if (err) {
    consoe.log('bad stuff happened. No cats')
  } else {
    // do stuff with data
  }
  })
```

This code is slightly more confusing than our synchronous function. It works though. We are now passing the responsibility for handling this error further up our program. Ideally we would go one step further and send it to the client, allowing them to deal with it.

## further reading

[https://www.joyent.com/node-js/production/design/errors](https://www.joyent.com/node-js/production/design/errors)

[http://eloquentjavascript.net/08_error.html](http://eloquentjavascript.net/08_error.html)
