export const RadioStyle = {
  parts: ["control", "label"],
  baseStyle: {
    control: { minW: "20px", minH: "20px", mr: "10px" },
    label: { ml: 0 },
  },
  variants: {
    tab: {
      label: {
        cursor: "pointer",
        fontSize: "sm",
        color: "blue.normal",
        _checked: { color: "gray.44" },
        ml: 0,
      },
      control: {
        minW: 0,
        minH: 0,
        width: 0,
        border: "none",
        height: 0,
        _checked: { width: 0, height: 0, _before: { display: "none" } },
        mr: 0,
      },
    },
    "tab-invert": {
      label: {
        cursor: "pointer",
        fontSize: "sm",
        color: "gray.44",
        _checked: { color: "black" },
        ml: 0,
      },
      control: {
        _focus: {
          "+ .chakra-radio__label": {
            boxShadow: "outline",
          },
        },
        minW: 0,
        minH: 0,
        width: 0,
        border: "none",
        height: 0,
        _checked: {
          width: 0,
          height: 0,
          _before: { display: "none" },
          _focus: { boxShadow: "none" },
        },
        mr: 0,
      },
    },
    tag: {
      label: {
        cursor: "pointer",
        fontSize: "xs",
        textTransform: "uppercase",
        p: "4px 8px",
        minH: "26px",
        color: "gray.44",
        _checked: { color: "blue.normal", borderColor: "blue.normal" },
        ml: 0,
        borderColor: "gray.44-20",
        borderRadius: "4px",
        borderWidth: "1px",
      },
      control: {
        minW: 0,
        minH: 0,
        width: 0,
        border: "none",
        height: 0,
        _checked: { width: 0, height: 0, _before: { display: "none" } },
        mr: 0,
      },
    },
    "calculator-tab": {
      label: {
        cursor: "pointer",
        fontSize: "sm",
        color: "gray.44",
        _checked: { color: "black" },
        ml: 0,
      },
      control: {
        minW: 0,
        minH: 0,
        width: 0,
        border: "none",
        height: 0,
        _checked: { width: 0, height: 0, _before: { display: "none" } },
        mr: 0,
      },
    },
    "filter-item": {
      label: {
        cursor: "pointer",
        padding: "5px 15px",
        borderRadius: "25px",
        border: "1px solid #E6EAED",
        margin: 0,
        color: "#848BA4",
        fontSize: "sm",
        _checked: {
          color: "white",
          bgColor: "blue.normal",
          borderColor: "blue.normal",
        },
        ml: 0,
      },
      control: {
        minW: 0,
        minH: 0,
        width: 0,
        border: "none",
        height: 0,
        _focus: {
          bgColor: "transparent",
          boxShadow: "none",
        },
        _checked: {
          width: 0,
          height: 0,
          _before: { display: "none" },
          _focus: { boxShadow: "none" },
        },
        mr: 0,
      },
    },
    "table-pagin": {
      label: {
        marginInlineStart: 0,
        borderRadius: "21px",
        padding: "3px 10px",
        cursor: "pointer",
        fontSize: "sm",
        color: "black",
        _checked: { bg: "gray.card" },
        ml: 0,
      },
      control: {
        minW: 0,
        minH: 0,
        width: 0,
        border: "none",
        height: 0,
        _checked: { width: 0, height: 0, _before: { display: "none" } },
        mr: 0,
      },
    },
    form: {
      control: {
        _hover: {
          borderColor: "gray.44",
        },
      },
    },
  },
};

export default RadioStyle;
