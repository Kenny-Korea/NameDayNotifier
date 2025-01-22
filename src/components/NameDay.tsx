import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllNameDayData } from "../api/api";
import Table from "./Table";
import { Data } from "../types/model";

const NameDay = () => {
  const query = useQuery<Data[]>({
    queryKey: ["nameDayData"],
    queryFn: getAllNameDayData,
    staleTime: Infinity,
  });

  const { data } = query;
  console.log(data);

  return <div>{data && <Table nameDayData={data} />}</div>;
};

export default NameDay;
