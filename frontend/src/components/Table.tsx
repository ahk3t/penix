import {
  Container,
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";

import Pagination from "./Pagination";
import Sort from "./Sort";

const ResultTable = ({
  data = [],
  currentPage,
  setCurrentPage,
  quantity,
  isLoading,
  handleAscDesc,
  handleSort,
}) => {
  const renderRows = data.map((item, index) => (
    <Tr key={index}>
      <Td color="#bab81e" textDecoration="underline">
        <Link
          href={item.inn && `details/${item.id_sp}${window.location.search}`}
        >
          {item.inn || "-"}
        </Link>
      </Td>
      <Td>{item.city_with_type || "-"}</Td>
      <Td>{item.postal_code || "-"}</Td>
    </Tr>
  ));
  return (
    <Container mt="0px" mb="80px">
      <Flex alignItems="center" justifyContent="space-between">
        <Sort
          isLoading={isLoading}
          handleSort={handleSort}
          handleAscDesc={handleAscDesc}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          quantityPage={quantity}
          isLoading={isLoading}
        />
      </Flex>
      <Table mt="20px">
        <Thead>
          <Tr>
            <Th>Инн</Th>
            <Th>Город</Th>
            <Th>Почтовый адрес</Th>
          </Tr>
        </Thead>
        <Tbody>{renderRows}</Tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        quantityPage={quantity}
        isLoading={isLoading}
        mt="10px"
      />
    </Container>
  );
};
export default ResultTable;
