import { createGlobalStyle } from "styled-components";
import Colors from "./colors";

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(270deg, ${Colors.GREEN} 0%, ${Colors.WHITE} 100%);
  text-rendering: optimizeLegibility;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
}

html,
body,
#root {
  height: 100%;
}

html {
  scroll-behavior: smooth;
  @media (prefers-reduced-motion: reduce) {
	  scroll-behavior:auto;
  }
}
`;
