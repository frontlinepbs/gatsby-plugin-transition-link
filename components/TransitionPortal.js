"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const portalRoot = typeof document !== `undefined` ? document.body : false;

const PortalContainer = props => {
  const zIndex = function (level) {
    switch (level) {
      case 'bottom':
        return 1000;

      case 'top':
        return 1200;

      default:
        return 1100;
    }
  }(props.level);

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "gatsby-plugin-transition-link-portal",
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: zIndex
    }
  }, props.children);
};

class TransitionPortal extends _react.Component {
  constructor() {
    super();

    this.componentDidMount = () => {
      portalRoot && portalRoot.appendChild(this.el);
    };

    this.componentWillUnmount = () => {
      portalRoot && portalRoot.removeChild(this.el);
    };

    this.el = typeof document !== `undefined` ? document.createElement('section') : false;
  }

  render() {
    return this.el && portalRoot ? /*#__PURE__*/_reactDom.default.createPortal( /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, portalRoot && /*#__PURE__*/_react.default.createElement(PortalContainer, {
      styles: this.props.css,
      level: this.props.level
    }, this.props.children)), this.el) : null;
  }

}

exports.default = TransitionPortal;
//# sourceMappingURL=TransitionPortal.js.map