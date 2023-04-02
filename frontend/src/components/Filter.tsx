import { Button, Container, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useSetState } from "react-use";

import FormSelect from "./common/Select";

const Filter = ({ isLoading, onSubmit, ...props }) => {
  // const [filter, setFilter] = useSetState({
  //   company: "",
  //   area: "",
  //   post: "",
  //   procent: "",
  // });
  const [value, setValue] = useState("");
  const handleFilter = (data) => {
    setValue(data.target.value);
  };
  return (
    <Container mt="20px" {...props}>
      <Flex gap={"10px"}>
        {/* <FormSelect
          placeholder={"Компания"}
          isDisabled={isLoading}
          setValue={(data) => handleFilter("company", data)}
          value={filter.company}
        />
        <FormSelect
          placeholder={"Район"}
          isDisabled={isLoading}
          setValue={(data) => handleFilter("area", data)}
          value={filter.area}
        />
        <FormSelect
          placeholder={"Почта"}
          isDisabled={isLoading}
          setValue={(data) => handleFilter("post", data)}
          value={filter.post}
        />
        <FormSelect
          placeholder={"Процент"}
          isDisabled={isLoading}
          setValue={(data) => handleFilter("procent", data)}
          value={filter.procent}
        /> */}
        <Input
          placeholder="Поиск по инн и городу"
          value={value}
          onChange={handleFilter}
        />
        <Button
          onClick={() => onSubmit(value)}
          backgroundColor="#"
          width={"300px"}
        >
          Поиск
        </Button>
      </Flex>
    </Container>
  );
};
export default Filter;
