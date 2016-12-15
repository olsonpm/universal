'use strict';


//---------//
// Imports //
//---------//

const r = require('ramda');


//------//
// Init //
//------//

const apply = createApply()
  , bind = createBind()
  , converge = createConverge()
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
      converge(
        bind
        , [
          r.path(path)
          , r.path(r.init(path))
        ]
      )
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

function createBind() {
  return r.curry(
    (fn, thisObj) => (r.is(Function, fn))
      ? fn.bind(thisObj)
      : undefined
  );
}

function createConverge() {
  return r.curry(
    (fn, fnArr, arg) => r.pipe(
      r.map(apply(r.__, [arg]))
      , apply(fn)
    )(fnArr)
  );
}


//---------//
// Exports //
//---------//

module.exports = universal;
