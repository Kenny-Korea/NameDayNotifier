import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllNameDayData } from "../api/api";

const Table = () => {
  const query = useQuery({
    queryKey: ["nameDayData"],
    queryFn: getAllNameDayData,
    staleTime: Infinity,
  });

  return (
    <div>
      {query.data?.map((item) => (
        <div key={item.id}>{item.Name}</div>
      ))}
    </div>
  );
};

export default Table;
