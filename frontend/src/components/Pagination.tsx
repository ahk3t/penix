import { Box, Button, Flex, Text } from "@chakra-ui/react";

import ChevronDownIcon from "./common/Icons";

const Pagination = ({
  currentPage,
  setCurrentPage,
  quantityPage,
  isLoading,
  ...props
}) => {
  return (
    <Flex flexWrap="nowrap" textAlign={"end"} alignItems="center" {...props}>
      <span
        style={{
          whiteSpace: "nowrap",
        }}
      >{`${currentPage} из ${quantityPage}`}</span>
      <Button
        width="50px"
        height="50px"
        backgroundColor="gray.mid"
        color="gray.mid"
        ml="30px"
        onClick={() => setCurrentPage((page) => (page > 1 ? --page : page))}
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        <ChevronDownIcon
          width="20px"
          height="20px"
          transform={"rotate(-90deg)"}
        />
      </Button>
      <Button
        width="50px"
        height="50px"
        backgroundColor="gray.mid"
        color="gray.mid"
        ml="10px"
        onClick={() =>
          setCurrentPage((page) => (page < quantityPage ? ++page : page))
        }
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        <ChevronDownIcon
          width="20px"
          height="20px"
          transform={"rotate(90deg)"}
        />
      </Button>
    </Flex>
  );
};
export default Pagination;
