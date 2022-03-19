"use strict";

exports.__esModule = true;
exports.default = delayTransitionRender;

var _react = _interopRequireWildcard(require("react"));

var _requestanimationframeTimer = require("requestanimationframe-timer");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function delayTransitionRender(WrappedComponent) {
  class DelayedTransitionWrapper extends _react.Component {
    constructor(props) {
      super(props);
      this.state = {
        // if there is a delay, set shouldRender to false
        // then in componentdid mount shouldRender becomes true
        // after the delay.
        shouldRender: !!!this.props.delay
      };
    }

    componentDidMount() {
      this.renderTimeout = (0, _requestanimationframeTimer.setTimeout)(() => this.setState({
        shouldRender: true
      }), this.props.delay);
    }

    componentWillUnmount() {
      (0, _requestanimationframeTimer.clearTimeout)(this.renderTimeout);
    }

    render() {
      return this.state.shouldRender || typeof window === `undefined` ? /*#__PURE__*/_react.default.createElement(WrappedComponent, this.props) : null;
    }

  }

  return DelayedTransitionWrapper;
}
//# sourceMappingURL=delayTransitionRender.js.map