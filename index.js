'use strict';


//---------//
// Imports //
//---------//

const r = require('ramda');


//------//
// Init //
//------//

const apply = createApply()
  , getProp = createGetProp()
  , invokePropWith = createInvokePropWith()
  ;


//------//
// Main //
//------//

const universal = {
  getGlobalProp: getProp('global')
  , getWindowProp: getProp('window')
  , invokeGlobalPropWith: invokePropWith('global')
  , invokeWindowPropWith: invokePropWith('window')
};

try {
  universal.global = global;
} catch (e) {
  universal.global = {};
}

try {
  universal.window = window;
} catch (e) {
  universal.window = {};
}


//-------------//
// Helper Fxns //
//-------------//

function createGetProp() {
  return r.curry(
    (type, path) => r.path(path, universal[type])
  );
}

function createInvokePropWith() {
  return r.curry(
    (type, path, args) => r.pipe(
      r.path(path)
      , apply(r.__, args)
    )(universal[type])
  );
}

function createApply() {
  return r.curry(
    (fn, args) => (r.is(Function, fn))
      ? fn.apply(null, args)
      : undefined
  );
}


//---------//
// Exports //
//---------//

module.exports = universal;
