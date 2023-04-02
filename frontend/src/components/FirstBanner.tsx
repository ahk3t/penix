import { Box, Container, Flex, Text } from "@chakra-ui/react";

import Heading from "./common/Heading";

export const FirstBanner = () => {
  return (
    <Flex
      backgroundColor="yellow"
      width="100%"
      height="250px"
      alignItems="center"
    >
      <Container>
        <Box>
          <Heading variant="h1" defaultSpace="lg">
            Система агрегации юридических лиц
          </Heading>
          <Text maxWidth={{ base: "350px", sm: "500px" }} marginTop="10px">
            Разработка прототипа системы для ранжирования компаний по обороту и
            возможности роста
          </Text>
        </Box>
      </Container>
    </Flex>
  );
};
