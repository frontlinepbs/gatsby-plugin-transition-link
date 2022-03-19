"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _ = _interopRequireWildcard(require("../"));

var _gsap = _interopRequireDefault(require("gsap"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Cover extends _react.Component {
  constructor(_props) {
    super(_props);

    this.getCoverEl = () => document.querySelector(`.tl-cover-el`);

    this.horizontal = ({
      node,
      props: {
        length: seconds
      },
      direction
    }) => {
      const directionTo = direction === 'left' ? '-100%' : '100%';
      const directionFrom = direction === 'left' ? '100%' : '-100%';
      const wait = seconds / 6;
      const half = (seconds - wait) / 2;
      const cover = this.getCoverEl();
      return _gsap.default.timeline().set(cover, {
        y: 0,
        x: directionFrom,
        display: "block"
      }).to(cover, {
        x: "0%",
        ease: "power1.easeInOut",
        duration: half
      }).set(node, {
        opacity: 0
      }).to(cover, {
        x: directionTo,
        ease: "power1.easeInOut",
        duration: half
      }, `+=${wait}`);
    };

    this.vertical = ({
      node,
      props: {
        length: seconds
      },
      direction
    }) => {
      const directionTo = direction === 'up' ? '-100%' : '100%';
      const directionFrom = direction === 'up' ? '100%' : '-100%';
      const wait = seconds / 6;
      const half = (seconds - wait) / 2;
      const cover = this.getCoverEl();
      return _gsap.default.timeline().set(cover, {
        y: directionFrom
      }).to(cover, {
        y: "0%",
        ease: "power1.easeInOut",
        duration: half
      }).set(node, {
        opacity: 0
      }).to(cover, {
        y: directionTo,
        ease: "power1.easeIn",
        duration: half
      }, `+=${wait}`);
    };

    this.moveInDirection = ({
      props,
      direction,
      node
    }) => {
      if (direction === 'left' || direction === 'right') {
        return this.horizontal({
          props,
          direction,
          node
        });
      }

      return this.vertical({
        props,
        direction,
        node
      });
    };

    this.horizontal = this.horizontal.bind(this);
    this.vertical = this.vertical.bind(this);
  }

  render() {
    const direction = this.props.direction || 'left';
    const length = this.props.duration || 1;
    const {
      exit: removedExit,
      entry: removedEntry,
      cover: removedProp,
      ...props
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_.default, (0, _extends2.default)({
      exit: {
        length: length,
        trigger: ({
          exit,
          node
        }) => this.moveInDirection({
          props: exit,
          node,
          direction
        })
      },
      entry: {
        delay: length / 2
      }
    }, props), this.props.children), /*#__PURE__*/_react.default.createElement(_.TransitionPortal, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "tl-cover-el",
      style: {
        position: "fixed",
        background: this.props.bg || "#4b2571",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100vw",
        height: "100vh",
        transform: "translateY(100%)"
      }
    })));
  }

}

exports.default = Cover;
//# sourceMappingURL=Cover.js.map