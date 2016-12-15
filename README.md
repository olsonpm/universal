# Universal

Provides accessors to both `global` and `window` without having to worry about
reference errors.  This is useful for isomorphic applications which may use one
or the other while still being consumed in both.

If you still have questions just look at the code - it's pocket-sized.

examples

### global and window properties
```js
console.log(universal.global);
// prints the global object which falls back to an empty object in
//   browser environments

console.log(universal.window);
// prints the window object which falls back to an empty object in
//   node environments
```

### getWindowProp() and getGlobalProp()
 - both functions take an array of strings which constitute the path to
   the property.

```js
// router.js
import universal from 'universal';

const pathname = universal.getWindowProp(['location', 'pathname']);
console.log(pathname);
// prints the result of 'window.location.pathname' which will return undefined
//   in node environments and the pathname in browser environments.

const nodeEnv = universal.getGlobalProp(['process', 'env', 'NODE_ENV']);
console.log(nodeEnv);
// prints the result of 'global.process.env.NODE_ENV' which will return
//   undefined in browser environments and the NODE_ENV environment variable in
//   node environments
```

### invokeWindowPropWith() and invokeGlobalPropWith()
 - both functions take two arguments.
   1) an array of strings which constitute the path to the property.
   2) an array of arguments applied to the property

 *Note: this method is a noop when called in the incorrect context.  e.g.
   `invokeGlobalPropWith` in the browser does nothing*

```js
// router.js
import universal from 'universal';

universal.invokeWindowPropWith(['location', 'replace'], ['https://www.google.com']);
// calls "window.location.replace('https://www.google.com')" which on the node
//   environment won't do anything and its function will return undefined.
```

### setWindowProp() and setGlobalProp()
 - both functions take two arguments.
   1) an array of strings which constitute the path to the property.
   2) an value to set the property to
 - returns undefined

*Note: this method is a noop when called in the incorrect context.  e.g.
  `setGlobalProp` in the browser does nothing*

```js
// router.js
import universal from 'universal';

universal.setWindowProp(['document', 'onmousemove'], event => { /* do something */ });
// In a browser this sets "window.document.onmousemove" to the following
//   function.  In a node environment, nothing is set.
```
