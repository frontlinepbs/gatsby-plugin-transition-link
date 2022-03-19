"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _requestanimationframeTimer = require("requestanimationframe-timer");

var _createTransitionContext = require("../context/createTransitionContext");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class TransitionRenderer extends _react.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      shouldBeVisible: !!!this.props.appearAfter
    };

    this.componentDidMount = () => {
      const delay = typeof this.props.delay === 'number' ? this.props.delay : 0;
      const appearafter = typeof this.props.appearAfter === 'number' ? this.props.appearAfter : 0;
      const timeout = delay + appearafter;
      this.appearTimeout = (0, _requestanimationframeTimer.setTimeout)(() => this.setState({
        shouldBeVisible: true
      }), timeout);
    };

    this.componentWillUnmount = () => {
      (0, _requestanimationframeTimer.clearTimeout)(this.appearTimeout);
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // only rerender if the transition status changes.
    return this.props.transitionStatus !== nextProps.transitionStatus || this.state.shouldBeVisible !== nextState.shouldBeVisible || this.props.children !== nextProps.children;
  }

  render() {
    const {
      mount,
      entryZindex,
      exitZindex,
      transitionStatus,
      transitionState,
      children,
      injectPageProps
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `tl-wrapper ${mount ? 'tl-wrapper--mount' : 'tl-wrapper--unmount'} tl-wrapper-status--${transitionStatus}`,
      style: {
        zIndex: mount ? entryZindex : exitZindex,
        opacity: this.state.shouldBeVisible ? 1 : 0
      }
    }, /*#__PURE__*/_react.default.createElement(_createTransitionContext.PublicProvider, {
      value: { ...transitionState
      }
    }, // injectPageProps is a plugin option
    injectPageProps ? /*#__PURE__*/(0, _react.cloneElement)(children, { ...transitionState
    }) : children));
  }

}

exports.default = TransitionRenderer;
//# sourceMappingURL=TransitionRenderer.js.map