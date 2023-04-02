import { Flex, Text } from "@chakra-ui/react";
import { useSetState } from "react-use";

import FormSelect from "./common/Select";

const Sort = ({ isLoading, ...props }) => {
  const [filter, setFilter] = useSetState({
    company: "",
    area: "",
    post: "",
    procent: "",
  });
  const handleFilter = (field, data) => {
    setFilter({
      [field]: data,
    });
  };
  return (
    <Flex alignItems="center">
      <Text mr="30px">Sort:</Text>
      <FormSelect
        placeholder={"Процент"}
        isDisabled={isLoading}
        setValue={(data) => handleFilter("procent", data)}
        value={filter.procent}
      />
    </Flex>
  );
};
export default Sort;
