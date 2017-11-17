let assert = require("assert");
const { getParamNames, getParamDefaultValues } = require("../index");

function testFunc1() {
  return null;
}

function testFunc2(param1, param2, param3) {
  return null;
}

let testFunc3 = function(param1, param2) {
  return null;
};

function testFunc4(param1 = 1, param2 = null, param3 = "Hello World") {
  return null;
}

function testFunc5(
  param1 = 0.54 /*This is a float*/,
  param2 /* Random close parenthesis )*/,
  /* Random open parenthesis ( */ param3 = "Str"
) {
  return null;
}

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

describe("getParamNames", function() {
  it("should handle functions with no parameters", () => {
    assert.deepEqual(getParamNames(testFunc1), []);
  });
  it("should handle functions with no default parameters", () => {
    assert.deepEqual(getParamNames(testFunc2), ["param1", "param2", "param3"]);
  });
  it("should handle functions bound to a variable", () => {
    assert.deepEqual(getParamNames(testFunc3), ["param1", "param2"]);
  });
  it("should accept functions with simple default parameters supplied", () => {
    assert.deepEqual(getParamNames(testFunc4), ["param1", "param2", "param3"]);
  });
  it("should accept functions with comments in parameter body", () => {
    assert.deepEqual(getParamNames(testFunc5), ["param1", "param2", "param3"]);
  });
  it("should accept functions with function calls, expressions, and arrow functions as default parameters", () => {
    assert.deepEqual(getParamNames(testFunc6), ["param1", "param2", "param3"]);
  });
});

describe("getParamDefaultValues", function() {
  it("should accept functions with no parameters", () => {
    assert.deepEqual(getParamDefaultValues(testFunc1), []);
  });
  it("should accept functions with no default parameters", () => {
    assert.deepEqual(getParamDefaultValues(testFunc2), [
      undefined,
      undefined,
      undefined
    ]);
  });
  it("should accept functions bound to a variable", () => {
    assert.deepEqual(getParamDefaultValues(testFunc3), [undefined, undefined]);
  });
  it("should accept functions with simple default parameters supplied", () => {
    assert.deepEqual(getParamDefaultValues(testFunc4), [
      "1",
      "null",
      '"Hello World"'
    ]);
  });
  it("should accept functions with comments in parameter body", () => {
    assert.deepEqual(getParamDefaultValues(testFunc5), [
      "0.54",
      undefined,
      '"Str"'
    ]);
  });
  it("should accept functions with function calls, expressions, and arrow functions as default parameters", () => {
    assert.deepEqual(getParamDefaultValues(testFunc6), [
      "Math.round(0.6)",
      "(4 + 3) / 2",
      "num => {\n    let k = num;\n    return k + 2;\n  }"
    ]);
  });
});
