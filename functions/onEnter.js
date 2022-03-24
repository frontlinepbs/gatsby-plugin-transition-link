"use strict";

exports.__esModule = true;
exports.onEnter = void 0;

var _requestanimationframeTimer = require("requestanimationframe-timer");

const onEnter = ({
  node,
  inTransition,
  entryTrigger,
  entryProps,
  exitProps,
  triggerResolve,
  pathname,
  preventScrollJump,
  hash,
  locationKey,
  entryProps: {
    delay = 0
  },
  appearAfter = 0,
  e
}) => {
  (0, _requestanimationframeTimer.setTimeout)(() => {
    const storage = Object.keys(sessionStorage);
    const items = [];
    storage.forEach(item => {
      split = item.split('|');

      if (split.length > 0) {
        if (split[0] === "@@scroll" && split[1] === pathname && pathname.includes('event') === false) {
          items.push(split);
        }
      }
    });

    if (items.length > 0) {
      const sortedArray = items.sort(function (a, b) {
        return b[2] - a[2];
      });
      const lastScrolledArr = sortedArray[0];
      const lastScrolledKey = lastScrolledArr.join("|");
      const lastScrolled = JSON.parse(sessionStorage.getItem(lastScrolledKey));
      const position = [0, lastScrolled];
      (0, _requestanimationframeTimer.setTimeout)(() => {
        window.scrollTo(...position);
      }, 0);
    }
  });
  if (!inTransition) return;
  const {
    trigger: removed,
    ...entryPropsTrimmed
  } = entryProps;
  const timeout = appearAfter + delay;
  const visiblePromise = new Promise(resolve => {
    (0, _requestanimationframeTimer.setTimeout)(() => resolve(), timeout);
  });
  triggerResolve.entry({ ...entryPropsTrimmed,
    visible: visiblePromise,
    node
  });
  entryTrigger && typeof entryTrigger === 'function' && entryTrigger({
    entry: entryProps,
    exit: exitProps,
    node,
    e
  });
};

exports.onEnter = onEnter;
//# sourceMappingURL=onEnter.js.map