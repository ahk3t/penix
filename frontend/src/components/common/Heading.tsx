import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export interface HeadingProps extends BoxProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  accent?: boolean;
  defaultSpace?: "sm" | "lg" | boolean;
}

export const Heading = ({
  variant,
  children,
  defaultSpace = true,
  ...props
}: HeadingProps) => {
  let mb = undefined;
  if (defaultSpace === true || defaultSpace === "lg") {
    mb = { base: "space.32", sm: "space.40" };
  } else if (defaultSpace === "sm") mb = { base: "space.20", sm: "space.40" };

  return (
    <Box as={variant} textStyle={variant} mb={mb} {...props}>
      {children}
    </Box>
  );
};

export default Heading;
