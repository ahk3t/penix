import { Box, Flex, useTheme } from "@chakra-ui/react";

import HeaderMenu from "./HeaderMenu";

const MainLayout = ({ children, ...props }) => {
  const { breakpoints = {} } = useTheme() as any;
  return (
    <Flex
      w="100%"
      minHeight="100vh"
      flexDirection="column"
      minW={{ base: "auto", sm: breakpoints.sm }}
      id="app-wrapper"
      {...props}
    >
      <HeaderMenu />
      <Box>{children}</Box>
      {/* <Footer /> */}
    </Flex>
  );
};
export default MainLayout;
