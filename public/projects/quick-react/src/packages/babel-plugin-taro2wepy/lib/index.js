"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default() {
  return {
    visitor: {
      // Visitor 中的每个函数接收2个参数：path 和 state
      Identifier: function Identifier(path, state) {
        var name = path.node.name; // reverse the name: JavaScript -> tpircSavaJ
        // path.node.name = name
        //     .split('')
        //     .reverse()
        //     .join('');
      },
      ImportDeclaration: function ImportDeclaration(path, state) {
        console.log(path.node);
      }
    }
  };
}