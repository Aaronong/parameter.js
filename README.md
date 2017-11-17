# parameter.js

Parameter.js is a simple library that allows you to extract parameter names and default values from any javascript function.

While extracting parameter names used to be an easy task, the introduction of default parameter values, and arrow functions in ES6 complicated the process.

This library was thus created to make extracting parameter names and default values from ES6 functions simple. The library was inspired by the questions and answers posted on this [Stack Overflow thread](https://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically?newreg=0a9a555b6ae640e7a8cdb3eb4c7c8344) on extracting parameter names from js functions.

Parameter.js 

- Handles functions with comments in parameter body (regardless of content)
- Handles functions with function calls as default parameters
- Handles functions with arrow functions as default parameters
- Handles functions with valid javascript expressions as default parameters

## Installation

```powershell
$ npm install parameter.js
```



## Usage

```javascript
//es5
var { getParamNames, getParamDefaultValues } = require("parameter.js");
//es6
import { getParamNames, getParamDefaultValues } from 'parameter.js';
```

## Documentation

### `getParamNames`

```javascript
/**
 * Returns the parameters of the given function as a list of strings
 * @param {any JS function} func 
 */
function getParamNames(func) {
  //Truncated
}
```



#### Examples

- Handles functions with no parameters

```javascript
function testFunc1() {
  return null;
}
getParamNames(testFunc1) // returns []
```

- Handles functions with no default parameters

```javascript
function testFunc2(param1, param2, param3) {
  return null;
}
getParamNames(testFunc2) // returns ["param1", "param2", "param3"]
```

- Handles functions bound to a variable

```javascript
let testFunc3 = function(param1, param2) {
  return null;
};
getParamNames(testFunc2) // returns ["param1", "param2"]
```

- Handles functions with simple default parameters

```javascript
function testFunc4(param1 = 1, param2 = null, param3 = "Hello World") {
  return null;
}
getParamNames(testFunc4) // returns ["param1", "param2", "param3"]
```

- Handles functions with comments in parameter body

```javascript
function testFunc5(
  param1 = 0.54 /*This is a float*/,
  param2 /* Random close parenthesis )*/,
  /* Random open parenthesis ( */ param3 = "Str"
) {
  return null;
}
getParamNames(testFunc5) // returns ["param1", "param2", "param3"]
```

- Handles functions with function calls, expressions, and arrow functions as default parameters.

```javascript
function testFunc6(
  param1 = Math.round(0.6),
  param2 = (4 + 3) / 2,
  param3 = num => {
    let k = num;
    return k + 2;
  }
) {
  return null;
}
getParamNames(testFunc6) // returns ["param1", "param2", "param3"]

```



### `getParamDefaultValues`

```javascript
/**
 * Returns the default parameters of a given function as a list of strings
 * @param {any JS function} func 
 */
function getParamDefaultValues(func) {
  //Truncated
}
```



#### Examples

- Handles functions with no parameters

```javascript
function testFunc1() {
  return null;
}
getParamDefaultValues(testFunc1) // returns []
```

- Handles functions with no default parameters

```javascript
function testFunc2(param1, param2, param3) {
  return null;
}
getParamDefaultValues(testFunc2) // returns [undefined, undefined, undefined]
```

- Handles functions bound to a variable

```javascript
let testFunc3 = function(param1, param2) {
  return null;
};
getParamNames(testFunc2) // returns [undefined, undefined]
```

- Handles functions with simple default parameters

```javascript
function testFunc4(param1 = 1, param2 = null, param3 = "Hello World") {
  return null;
}
getParamNames(testFunc4) // returns ["1", "null", '"Hello World"']
```

- Handles functions with comments in parameter body

```javascript
function testFunc5(
  param1 = 0.54 /*This is a float*/,
  param2 /* Random close parenthesis )*/,
  /* Random open parenthesis ( */ param3 = "Str"
) {
  return null;
}
getParamNames(testFunc5) // returns ["0.54", undefined, '"Str"']
```

- Handles functions with function calls, expressions, and arrow functions as default parameters.

```javascript
function testFunc6(
  param1 = Math.round(0.6),
  param2 = (4 + 3) / 2,
  param3 = num => {
    let k = num;
    return k + 2;
  }
) {
  return null;
}
getParamNames(testFunc6) // returns ["Math.round(0.6)", "(4 + 3) / 2", "num => {\n    let k = num;\n    return k + 2;\n  }"]
```

