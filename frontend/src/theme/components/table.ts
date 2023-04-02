export const TableStyle = {
  parts: ["table", "th", "td", "tr", "tbody"],
  baseStyle: {
    tr: {
      border: 0,
      borderRadius: 16,
      minHeight: 75,
      height: 75,
    },
    th: {
      border: 0,
      minHeight: 75,
      height: 75,
    },
    td: {
      border: 0,
      paddingTop: 25,
      paddingBottom: 25,
    },
  },
  sizes: {},
  variants: {
    "exchange-rates": {
      tr: {
        pt: "15px",
        pb: "15px",
        height: "auto",
        minH: "auto",
        pl: 0,
        pr: 0,
      },
      th: {
        pl: 0,
        pr: 0,
        pb: "15px",
        height: "auto",
        minH: "auto",
        fontSize: { base: "sm", sm: "md" },
        color: "gray.44",
        fontWeight: "400",
        textTransform: "capitalize",
      },
      td: {
        pt: "15px",
        pb: "15px",
        pl: 0,
        pr: 0,
        fontSize: { base: "16px", sm: "md" },
        fontWeight: "600",
        _first: {
          paddingLeft: 0,
        },
        _last: {
          paddingRight: 0,
        },
      },
    },
    "payment-schedule": {
      thead: {
        th: {
          height: "60px",
          maxW: "100%",
          whiteSpace: "nowrap",
          borderBottom: 0,
          color: "black",
          fontSize: "xs",
          fontWeight: "400",
          textTransform: "uppercase",
          bgColor: "white",
        },
      },
      tr: {
        height: { base: "36px", sm: "75px" },
        minH: { base: "36px", sm: "75px" },

        borderRadius: "12px",
        _odd: { bgColor: "gray.tooltip" },
      },
      th: {
        height: "60px",
        maxW: "100%",
        whiteSpace: "nowrap",
        borderBottom: 0,
        color: "black",
        fontSize: "xs",
        fontWeight: "400",
        textTransform: "uppercase",
      },
      td: {
        maxW: "100%",
        p: { base: 0, sm: "25px 0" },
        whiteSpace: "nowrap",
        borderBottom: 0,
      },
    },
  },
  defaultProps: {
    size: "",
  },
};

export default TableStyle;
