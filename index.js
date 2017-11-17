"use strict";

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;

function _getParameterBody(func) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, "");
  const parameterBodyStart = fnStr.indexOf("(") + 1;
  let parameterBodySeek = parameterBodyStart;
  let parenthesisCounter = 1;
  while (parenthesisCounter > 0) {
    if (fnStr.charAt(parameterBodySeek) === "(") {
      parenthesisCounter += 1;
    } else if (fnStr.charAt(parameterBodySeek) === ")") {
      parenthesisCounter -= 1;
    }
    parameterBodySeek += 1;
  }
  return fnStr.substring(parameterBodyStart, parameterBodySeek - 1);
}

function _getParams(func) {
  let paramBody = _getParameterBody(func);
  let parenthesisCounter = 0;
  let chunks = [];
  let chunkStart = 0;
  for (let i = 0; i < paramBody.length; i++) {
    if (paramBody.charAt(i) === "(") {
      parenthesisCounter += 1;
    } else if (paramBody.charAt(i) === ")") {
      parenthesisCounter -= 1;
    } else if (parenthesisCounter === 0 && paramBody.charAt(i) === ",") {
      chunks.push(paramBody.substring(chunkStart, i).trim());
      chunkStart = i + 1;
    }
  }
  if (paramBody.length > 0) {
    chunks.push(paramBody.substring(chunkStart, paramBody.length).trim());
  }
  return chunks;
}

/**
 * Returns the parameters of the given function as a list of strings
 * @param {any JS function} func 
 */
function getParamNames(func) {
  let params = _getParams(func);
  return params.map(param => {
    return param.split("=")[0].trim();
  });
}

/**
 * Returns the default parameters of a given function as a list of strings
 * @param {any JS function} func 
 */
function getParamDefaultValues(func) {
  let params = _getParams(func);
  return params.map(param => {
    let val = param.split("=");
    if (val.length < 2) {
      return undefined;
    }
    if (val.length === 2) {
      return val[1].trim();
    }
    return val
      .splice(1)
      .join("=")
      .trim();
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { getParamNames, getParamDefaultValues };
}
