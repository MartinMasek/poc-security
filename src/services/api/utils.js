'use strict';
const isFunction = input => typeof input === 'function';
export const renderIf = (predicate) => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;

export const delay = (miliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, miliseconds);
  });
}

export const isObjectEmpty = (obj) => { return Object.keys(obj).length === 0 && obj.constructor === Object }

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export const shuffleArray = (a) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}