"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

const React = require('react');

const TransitionHandler = require('./components/TransitionHandler').default;

const Layout = require('./components/Layout').LayoutComponent; // eslint-disable-next-line react/prop-types,react/display-name


module.exports = ({
  element,
  props
}, pluginOptions) => {
  return /*#__PURE__*/React.createElement(Layout, props, /*#__PURE__*/React.createElement(TransitionHandler, (0, _extends2.default)({}, props, pluginOptions), element));
};
//# sourceMappingURL=wrap-page.js.map