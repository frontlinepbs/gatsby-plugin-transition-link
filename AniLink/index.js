"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = DefaultTransition;

var _react = _interopRequireDefault(require("react"));

var _Cover = _interopRequireDefault(require("./Cover"));

var _Fade = _interopRequireDefault(require("./Fade"));

var _PaintDrip = _interopRequireDefault(require("./PaintDrip"));

var _Swipe = _interopRequireDefault(require("./Swipe"));

var _ = _interopRequireDefault(require("../"));

var _MorphTo = _interopRequireDefault(require("./MorphTo"));

function DefaultTransition(allProps) {
  const {
    children,
    ...props
  } = allProps;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, props.cover && /*#__PURE__*/_react.default.createElement(_Cover.default, props, children), props.fade && /*#__PURE__*/_react.default.createElement(_Fade.default, props, children), props.paintDrip && /*#__PURE__*/_react.default.createElement(_PaintDrip.default, props, children), props.swipe && /*#__PURE__*/_react.default.createElement(_Swipe.default, props, children), !!props.morph && /*#__PURE__*/_react.default.createElement(_MorphTo.default, props, children), !props.cover && !props.fade && !props.paintDrip && !props.swipe && !props.morph && /*#__PURE__*/_react.default.createElement(_.default, props, children));
}
//# sourceMappingURL=index.js.map