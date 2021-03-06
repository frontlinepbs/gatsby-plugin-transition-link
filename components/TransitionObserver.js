"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _createTransitionContext = require("../context/createTransitionContext");

function TransitionObserver(props) {
  const innerRef = (0, _react.useRef)(null);
  const context = (0, _react.useContext)(_createTransitionContext.publicContext);
  const [contextState, updateContextState] = (0, _react.useState)(null);
  const [observing, setObserving] = (0, _react.useState)(false);
  const observerSupport = 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype;
  (0, _react.useEffect)(() => {
    if (innerRef && innerRef.current) {
      let observer;
      const options = {
        threshold: 1
      };
      observer = new IntersectionObserver(observed => {
        const [thisObserved] = observed;
        setObserving(!!thisObserved.intersectionRatio);
      }, options);
      observer.observe(innerRef.current);
      return () => observer.unobserve(innerRef.current);
    }
  }, [innerRef]);
  (0, _react.useEffect)(() => {
    if (!observerSupport || props.forceRender) {
      // always update the context if there is no intersection
      // observer support or if the prop forceRender is set to true
      updateContextState(context);
    } else if (observing) {
      updateContextState(context);
    }
  }, [context.transitionStatus, innerRef, observing]);
  return props.children(contextState, innerRef);
}

var _default = TransitionObserver;
exports.default = _default;
//# sourceMappingURL=TransitionObserver.js.map