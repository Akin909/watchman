import { injectGlobal } from 'styled-components';

// font-family: 'Open Sans', Helvetica, Arial, Sans-serif;
export default injectGlobal`
  html, body  {
    font-family: -apple-system, BlinkMacSystemFont, “Segoe UI”, Roboto, Helvetica, Arial, sans-serif;
    font-size: 1em;
    width: 100%;
    height: 100%;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  li {
    list-style-type: none;
  }
  `;
