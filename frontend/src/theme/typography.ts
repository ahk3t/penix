import localFont from "@next/font/local";

export const CircleRegular = localFont({
  src: [
    {
      path: "../../public/fonts/Circe-Regular.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  // variable: '--font-new',
});
export const CircleBold = localFont({
  src: [
    {
      path: "../../public/fonts/Circe-Bold.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  // variable: '--font-new',
});
export const CircleExtraBold = localFont({
  src: [
    {
      path: "../../public/fonts/Circe-ExtraBold.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  // variable: '--font-new',
});
export default {
  fonts: {
    body: CircleRegular.style.fontFamily,
    heading: CircleBold.style.fontFamily,
    mono: CircleExtraBold.style.fontFamily,
  },
  fontSizes: {
    xxs: "10px",
    xs: "11px",
    sm: "14px",
    md: "18px",
    lg: "22px",
    xl: "36px",
    "2xl": "48px",
    "3xl": "60px",
    menu: "16px",
    subMenu: "13px",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};