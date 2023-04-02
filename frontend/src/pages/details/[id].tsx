import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Flex,
  Link as ChakraLink,
  StackItem,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";

import { fetchAPI } from "@/api";
import { DoughnutChart, LineChart } from "@/components/common/Chart";
import Heading from "@/components/common/Heading";

const DetailsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const path = window.location.pathname.split("/")[2];
    fetchAPI(`members/${path}`).then((res) => {
      setData(res);
    });
  }, []);
  return (
    <>
      <Box pt="50px" backgroundColor="gray.background">
        <Container>
          <NextLink
            href={`/${
              typeof window !== "undefined" ? window.location.search : ""
            }`}
            passHref
          >
            <Button width="100px" backgroundColor="gray.200" variant="outline">
              Назад
            </Button>
          </NextLink>
          <Heading variant="h1" mt="40px">
            {data?.inn || "Инн отстувует"}
          </Heading>
          <Heading variant="h3" color="gray.text">
            Ретейлер
          </Heading>
          <Heading
            variant="h4"
            color="gray.text"
            p="10px"
            border="3px solid red"
            borderRadius="30"
            width="250px"
            mt="10px"
          >
            Подозрительность{" "}
            {data?.quality_factor ? data?.quality_factor : "  ---"}
          </Heading>
          <Card width="600px" mt="100px">
            <CardHeader>
              <Heading variant="h3">Название компании</Heading>
            </CardHeader>
            <CardBody>
              <Text>Город: {data?.city_with_type || "-"}</Text>
              <Text>
                Зарегистрирована в регионе: {data?.register_region_code || "-"}
              </Text>
              <Text>
                Находится в регионе: {data?.location_region_code || "-"}
              </Text>
              <Text>Почтовый индекс: {data?.postal_code || "-"}</Text>

              <Divider my="10px" />
              <Text>
                Основная: Cъешь же ещё этих мягких французских булок, да выпей
                чаю съешь же ещё этих мягких францучаю Cъешь же ещё этих мягких
                французских булок, да выпей чаю съешь же ещ францучаю
              </Text>
            </CardBody>
            <Box
              backgroundColor="black"
              borderRadius="10px"
              p="20px"
              width="250px"
              height={"100px"}
              textAlign="center"
              position="absolute"
              top="-40px"
              right="-100px"
              transform="rotate(10deg)"
            >
              <Heading variant="h2" color="white" fontWeight="bold">
                О компании
              </Heading>
            </Box>
          </Card>
          <Box
            position="relative"
            width="500px"
            height="500px"
            ml="auto"
            mr="50px"
            mt="-90px"
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              right="0"
              left="0"
              top="0"
              bottom="0"
            >
              <Heading
                variant="h2"
                fontSize="3xl"
                fontWeight="bold"
                textAlign="center"
                mb="-24px"
                color="gray.text"
              >
                {data?.prospect_factor ? data?.prospect_factor : "0"}%
              </Heading>
            </Box>
            <DoughnutChart value={data?.prospect_factor || 0} />
          </Box>
          <Box
            bottom="300px"
            position="relative"
            left="150px"
            width="500px"
            mt="-40px"
          >
            <Heading variant="h2" fontSize="2xl">
              Оценка компании
            </Heading>
            <Text
              fontSize="16px"
              color="gray.text"
              width="500px"
              ml="5px"
              mt="10px"
            >
              Параметр иллюстрирует перспективность
              <br /> компании для инвестиционных вложений
            </Text>
          </Box>
        </Container>
      </Box>
      <Box backgroundColor="black" py="50px">
        <Container>
          <Flex>
            <Text fontSize="xl" color="white">
              Изменение спроса через 3 месяца:
            </Text>
            <Box fontSize="xl" color="yellow" ml="20px" fontWeight="bolder">
              {data?.growth_factor ? data?.growth_factor + "%" : "-"}
            </Box>
          </Flex>
        </Container>
      </Box>
      <Container pb="150px">
        <Heading variant="h2" fontSize="2xl" mb="40px" mt="70px">
          Прогноз по изменению выручки за 3 месяца
        </Heading>
        {data?.future && <LineChart data={data.future} />}
      </Container>
    </>
  );
};
export default DetailsPage;

// export async function getStaticPaths(props) {
//   console.log(props);
//   const data =
//     // locales
//     //   ? await fetchAPI(`members/${locales}`)
//     await fetchAPI("members?page=1&page_size=10");
//   const paths = data.results.map((item) => {
//     return {
//       params: { id: item?.id_sp },
//     };
//   });
//   return { paths: [], fallback: true };
// }
// export async function getStaticProps({ params }) {
//   const dataPage = await fetchAPI(`members/${params?.id}`);
//   return {
//     props: {
//       data: dataPage,
//     },
//     revalidate: 10,
//   };
// }
