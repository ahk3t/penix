import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { fetchAPI } from "@/api";
import Filter from "@/components/Filter";
import { FirstBanner } from "@/components/FirstBanner";
import ResultTable from "@/components/Table";

function AllData() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const length = 10;
  useEffect(() => {
    router?.query?.page && setCurrentPage(+router.query.page);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetchAPI(`members?page=${currentPage}&page_size=${length}`).then((res) => {
      setData(res.results);
      setQuantity(Math.round(res.count / 10));
    });
    setIsLoading(false);
    router.push(
      {
        pathname: window.location.pathname,
        query: { page: currentPage },
      },
      undefined,
      {
        shallow: true,
        scroll: false,
      }
    );
  }, [currentPage]);

  const onSubmitFilter = (data) => {
    setIsLoading(true);
    setCurrentPage(1);
    fetchAPI(`members?inn=${data}&city_with_type=${data}`).then((res) => {
      setData(res.results);
      setQuantity(Math.round(res.count / 10));
    });
    setIsLoading(false);
  };

  return (
    <>
      <FirstBanner />
      <Filter onSubmit={onSubmitFilter} isLoading={isLoading} mb="80px" />
      <ResultTable
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        quantity={quantity}
        isLoading={isLoading}
      />
    </>
  );
}

export default AllData;
