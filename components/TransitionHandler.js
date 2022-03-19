"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactTransitionGroup = require("react-transition-group");

var _router = require("@reach/router");

var _TransitionRenderer = _interopRequireDefault(require("./TransitionRenderer"));

var _delayTransitionRender = _interopRequireDefault(require("./delayTransitionRender"));

var _createTransitionContext = require("../context/createTransitionContext");

var _onEnter = require("../functions/onEnter");

var _onExit = require("../functions/onExit");

var _secondsMs = require("../utils/secondsMs");

require("../style.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DelayedTransition = (0, _delayTransitionRender.default)(_reactTransitionGroup.Transition);

class TransitionHandler extends _react.Component {
  render() {
    const {
      props
    } = this;
    const {
      children,
      injectPageProps = true
    } = props;
    return /*#__PURE__*/_react.default.createElement(_createTransitionContext.Consumer, null, ({
      exitDelay,
      exitLength,
      exitState,
      entryDelay,
      entryLength,
      entryState,
      entryTrigger,
      entryProps,
      exitTrigger,
      exitProps,
      inTransition,
      updateContext,
      triggerResolve,
      appearAfter,
      preventScrollJump,
      hash,
      e
    }) => {
      return /*#__PURE__*/_react.default.createElement(_router.Location, null, ({
        location
      }) => {
        const {
          action,
          pathname,
          key: locationKey
        } = location;
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "tl-edges"
        }, /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.TransitionGroup, {
          component: null
        }, /*#__PURE__*/_react.default.createElement(DelayedTransition, {
          key: pathname // we're using seconds but transitiongroup uses ms
          ,
          delay: (0, _secondsMs.getMs)(entryDelay),
          timeout: {
            enter: (0, _secondsMs.getMs)(entryLength),
            exit: (0, _secondsMs.getMs)(exitLength)
          },
          onEnter: node => !!node && !window.__tl_back_button_pressed && (0, _onEnter.onEnter)({
            node,
            action,
            inTransition,
            entryTrigger,
            entryProps,
            exitProps,
            pathname,
            updateContext,
            triggerResolve,
            preventScrollJump,
            hash,
            locationKey,
            appearAfter: (0, _secondsMs.getMs)(appearAfter),
            e
          }),
          onExit: node => !!node && !window.__tl_back_button_pressed && (0, _onExit.onExit)({
            node,
            inTransition,
            exitTrigger,
            entryProps,
            exitProps,
            triggerResolve,
            e
          })
        }, transitionStatus => {
          const mount = transitionStatus === 'entering' || transitionStatus === 'entered';
          const states = {
            entry: {
              state: entryState,
              delay: entryDelay,
              length: entryLength
            },
            exit: {
              state: exitState,
              delay: exitDelay,
              length: exitLength
            }
          };
          const current = mount ? states.entry : states.exit;
          const transitionState = {
            transitionStatus,
            current,
            mount,
            ...states
          };
          const exitZindex = exitProps.zIndex || 0;
          const entryZindex = entryProps.zIndex || 1;
          return /*#__PURE__*/_react.default.createElement(_TransitionRenderer.default, {
            mount: mount,
            entryZindex: entryZindex,
            exitZindex: exitZindex,
            transitionStatus: transitionStatus,
            transitionState: transitionState,
            children: children,
            injectPageProps: injectPageProps,
            appearAfter: (0, _secondsMs.getMs)(appearAfter)
          });
        })));
      });
    });
  }

}

exports.default = TransitionHandler;
//# sourceMappingURL=TransitionHandler.js.map