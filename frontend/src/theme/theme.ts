import { extendTheme } from "@chakra-ui/react";

import breakpoints from "./breakpoints";
import colors from "./colors";
import components from "./components";
import global from "./global";
// import layerStyles from "./layer-styles";
import sizes from "./sizes";
// import space from "./space";
import textStyles from "./text-styles";
import typography from "./typography";

export default extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: { global },
  // layerStyles,
  textStyles,
  colors,
  sizes,
  // space,
  radii: {
    normal: "25px",
  },
  ...typography,
  breakpoints,
  components,
});
