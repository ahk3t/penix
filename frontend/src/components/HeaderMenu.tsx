import { Box, Container, Flex } from "@chakra-ui/react";
import Image from "next/image";

const HeaderMenu = () => {
  return (
    <Box width="100%" height="60px" backgroundColor="gray.background">
      <Flex>
        <Flex width="100%" justifyContent="end">
          <Flex marginRight={"20px"}>
            <Image
              src="https://xn--80ajghhoc2aj1c8b.xn--p1ai/local/templates/main/img/cz-logo.svg"
              alt="Честный знак"
              width={172}
              height={40}
            />
          </Flex>
        </Flex>
        <Box width="100%" backgroundColor="black">
          <Flex marginLeft={"20px"}>
            <Image
              src="https://static.tildacdn.com/tild3364-3137-4564-b236-636231363433/Logo_MH.svg"
              alt="Честный знак"
              width={172}
              height={40}
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default HeaderMenu;
