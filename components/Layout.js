"use strict";

exports.__esModule = true;
exports.LayoutComponent = void 0;

/* eslint-disable no-undef */
const React = require('react');

const preferDefault = m => m && m.default || m;

let Layout = false;

if (typeof TL__GATSBY_LAYOUT_COMPONENT_PATH !== `undefined` && !!TL__GATSBY_LAYOUT_COMPONENT_PATH) {
  try {
    Layout = preferDefault(require(TL__GATSBY_LAYOUT_COMPONENT_PATH));
  } catch (e) {
    if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
      throw new Error(`Couldn't find layout component at "${TL__GATSBY_LAYOUT_COMPONENT_PATH}.\n\n` + `Please create layout component in that location or specify path to layout component in gatsby-config.js`);
    } else {
      // Logging the error for debugging older browsers as there is no way
      // to wrap the thrown error in a try/catch.
      console.error(e);
      throw e;
    }
  }
}

const LayoutComponent = ({
  children,
  ...props
}) => {
  if (Layout) {
    return /*#__PURE__*/React.createElement(Layout, props, children);
  } else {
    return children;
  }
};

exports.LayoutComponent = LayoutComponent;
//# sourceMappingURL=Layout.js.map