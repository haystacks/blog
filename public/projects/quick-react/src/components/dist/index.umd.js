(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = global || self, factory(global.comp = {}, global.React));
}(this, function (exports, React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function Upload () {
    return React.createElement("button", {
      type: "primary"
    }, "button");
  }

  exports.Upload = Upload;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
