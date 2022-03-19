"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _ = _interopRequireDefault(require("../"));

var _gsap = _interopRequireDefault(require("gsap"));

var _colorConvert = _interopRequireDefault(require("color-convert"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// This was made using the code borrowed from this beautiful codepen!
// https://codepen.io/osublake/pen/eNrQqV?editors=0010
class PaintDrip extends _react.Component {
  constructor(props) {
    super(props);

    this.createRipple = ({
      length
    }, event, hex, color, node) => {
      const body = document.body;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const piTwo = Math.PI * 2;
      let rgb = hex ? _colorConvert.default.hex.rgb(hex).join(',') : '0,0,255';
      rgb = color ? _colorConvert.default.keyword.rgb(color) : rgb;
      canvas.style.zIndex = 10000;
      canvas.style.top = 0;
      canvas.style.position = 'fixed';
      let vw = canvas.width = window.innerWidth;
      let vh = canvas.height = window.innerHeight;
      body.appendChild(canvas); // Event coords

      const x = event.clientX;
      const y = event.clientY; // Delta - difference between event and farthest corner

      const dx = x < vw / 2 ? vw - x : x;
      const dy = y < vh / 2 ? vh - y : y;
      const radius = Math.sqrt(dx * dx + dy * dy);
      const ripple = {
        alpha: 0,
        radius: 0,
        x: x,
        y: y
      };
      const seconds = length;

      _gsap.default.timeline({
        onUpdate: drawRipple,
        onComplete: () => removeCanvas(seconds / 3)
      }).to(ripple, {
        alpha: 1,
        duration: seconds / 4
      }).to(ripple, {
        radius: radius,
        ease: "power1.easeIn",
        duration: seconds - seconds / 3
      }, 0).set(node, {
        visibility: 'hidden'
      }).to(canvas, {
        x: '100%',
        ease: "power1.easeIn",
        duration: seconds / 3
      }, `+=${seconds * 0.4}`);

      function drawRipple() {
        ctx.clearRect(0, 0, vw, vh);
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, piTwo, false);
        const fillStyle = `rgba(${rgb},${ripple.alpha})`;
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }

      window.addEventListener('resize', onResize);

      function removeCanvas(wait = 0) {
        setTimeout(() => {
          body.removeChild(canvas);
        }, wait);
      }

      function onResize() {
        vw = canvas.width = window.innerWidth;
        vh = canvas.height = window.innerHeight;
      }
    };

    this.getDirection = from => {
      switch (from) {
        case 'left':
          return {
            xPercent: -5
          };

        case 'right':
          return {
            xPercent: 5
          };

        case 'top':
          return {
            yPercent: -5
          };

        case 'bottom':
          return {
            yPercent: 5
          };

        default:
          return {};
      }
    };

    this.slideIn = ({
      length
    }, node, from) => {
      _gsap.default.from(node, length, { ...this.getDirection(from),
        ease: 'power1.easeOut'
      });
    };

    this.onResize = () => {
      this.vw = this.canvas.width = window.innerWidth;
      this.vh = this.canvas.height = window.innerHeight;
    };

    this.createRipple = this.createRipple.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const {
      exit: removedExit,
      entry: removedEntry,
      paintDrip: removedProp,
      duration,
      direction = 'left',
      ...props
    } = this.props;
    const aniLength = duration || 1;
    const aniDelay = aniLength / 1.75;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_.default, (0, _extends2.default)({
      exit: {
        length: aniLength,
        trigger: ({
          exit,
          e,
          node
        }) => this.createRipple(exit, e, props.hex, props.color, node)
      },
      entry: {
        delay: aniDelay,
        length: aniLength,
        trigger: ({
          entry,
          node
        }) => this.slideIn(entry, node, direction)
      }
    }, props), props.children));
  }

}

exports.default = PaintDrip;
//# sourceMappingURL=PaintDrip.js.map