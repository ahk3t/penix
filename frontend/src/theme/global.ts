import textStyles from "./text-styles";

export default {
  "html, body": {
    // overflowX: 'hidden',
    lineHeight: "short",
    color: "black",
    fontSize: {
      base: "sm",
      sm: "md",
    },
    height: "100%",
    scrollBehavior: "smooth",
  },
  a: {
    // color: color,
    transition: "0.2s easi-in-out",
    _hover: {
      // color: colorActive,
    },
  },
  "#__next": {
    height: "100%",
  },
  ".image": {
    marginTop: "5px",
    marginBottom: "20px",
  },
  "@media screen and (min-width: 1024px)": {
    ".image-style-align-center": {
      display: "flex",
      justifyContent: "center",
    },
    ".image-style-align-right": {
      float: "right",
      marginLeft: "24px",
      marginRight: 0,
    },
    ".image-style-align-left": {
      float: "left",
      marginLeft: 0,
      marginRight: "24px",
    },
  },

  ...textStyles,
};
