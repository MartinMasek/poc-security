'use strict';

import { Q_MULTI_SELECT } from "../constants";

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

export const computeCompletedQuestions = (questions) => {
  if (!questions) return 0;
  let completed = 0;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (areAllInputsFilled(q.inputs)) completed++;
  }
  return completed;
}

export const areAllInputsFilled = (inputs) => {
  return inputs.every(i => {
    if (i.value === null || i.value === '' || i.value === undefined) {
      if (i.optional) return true;
      if (i.type === Q_MULTI_SELECT) return true;
      return false;
    }
    if (i.conditional && i.conditionValue === i.value) {
      if (i.conditionalInput.value === null || i.conditionalInput.value === '' || i.conditionalInput.value === undefined) {
        if (i.conditionalInput.optional) return true;
        return false;
      }
    }
    return true;
  })
}

export const computeTotalProgressOfSurvey = (sections) => {
  if (!sections) return 0;
  if (sections.length == 0) return 0;

  let totalQuestions = 0;
  let completed = 0;
  sections.forEach(s => {
    completed += s.completedQuestions ? s.completedQuestions : 0;
    totalQuestions += s.questions ? s.questions.length : 0;
  });
  return Math.ceil((completed / totalQuestions) * 100);
}