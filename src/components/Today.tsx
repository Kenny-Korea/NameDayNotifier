import { useQueryClient } from "@tanstack/react-query";
import pigeon from "/pigeon.png";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DataType } from "../types/model";

// const currentMonth = 1;
// const currentDay = 28;
const currentDate = dayjs();
const currentMonth = currentDate.month() + 1;
const currentDay = currentDate.date();

const Today = () => {
  const queryClient = useQueryClient();
  const nameDayData = queryClient.getQueryData(["nameDayData"]) as Map<number, Map<number, DataType[]>>;
  const [todayList, setTodayList] = useState<DataType[] | undefined>([]);

  useEffect(() => {
    if (nameDayData) {
      const list = nameDayData.get(currentMonth)?.get(currentDay);
      console.log(list);
      setTodayList(list);
    }
  }, [nameDayData]);

  return (
    <div className="w-full min-h-24 flex items-center gap-4 layout-card bg-blue-50">
      <div className="flex flex-col items-center justify-center">
        <img src={pigeon} alt="pigeon" className="w-fit" />
        <p className="text-[0.6rem]">오늘의 축일자</p>
      </div>
      <div className="flex flex-col justify-center">
        {!todayList || (Array.isArray(todayList) && todayList.length < 1) ? (
          <p>오늘은 축일자가 없습니다.</p>
        ) : (
          todayList?.map((data) => <p key={data.name}>{data.name}</p>)
        )}
      </div>
    </div>
  );
};

export default Today;
