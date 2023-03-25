import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import App from "./App";
import { darkTheme } from "./theme";

const GlobalStyle = createGlobalStyle`@font-face {
  font-family: 'GmarketSansMedium';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul,li {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}

body {
  font-weight: 600;
  font-family: 'GmarketSansMedium', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
  font-size:18px;
}
input::placeholder{
  font-family: 'GmarketSansMedium', sans-serif;
  font-weight:600;
  font-size:14px;
}
a {
  text-decoration:none;
  color:inherit;
}
::-webkit-scrollbar {
  width: 0.5rem;
}

::-webkit-scrollbar-track {
  background-color: ${(props) => props.theme.bgColor};
}

::-webkit-scrollbar-thumb {
  border-radius:10px;
  background-color: ${(props) => props.theme.cardColor};
}

::-webkit-scrollbar-thumb:hover {
  background-color:${(props) => props.theme.scroll}
}
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
