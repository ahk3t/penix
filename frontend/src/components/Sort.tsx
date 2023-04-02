import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSetState } from "react-use";

import FormSelect from "./common/Select";

const mockOpotions = [
  { value: "prospect_factor", title: "Инвестиционная оценка" },
  { value: "growth_factor", title: "Предполагаемый рост" },
  { value: "quality_factor", title: "Подозрительность" },
];
const mockAsc = [
  { value: "asc", title: "По возрастанию" },
  { value: "desc", title: "По убыванию" },
];
const Sort = ({ isLoading, handleSort, handleAscDesc, ...props }) => {
  const [sort, setSort] = useState(null);
  const [ascDesc, setAscDesc] = useState("asc");

  const handleFilter = (data) => {
    setSort(data);
    handleSort(data);
  };
  return (
    <Flex alignItems="center">
      <Text mr="30px">Сортировка:</Text>
      <FormSelect
        placeholder={"Параметр"}
        isDisabled={isLoading}
        setValue={(data) => handleFilter(data)}
        value={sort}
        options={mockOpotions}
      />
      <FormSelect
        placeholder={"По возрастанию / По убыванию"}
        isDisabled={isLoading}
        setValue={(data) => {
          setAscDesc(data);
          handleAscDesc(data);
        }}
        value={ascDesc}
        options={mockAsc}
      />
    </Flex>
  );
};
export default Sort;
