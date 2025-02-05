import { useQueryClient } from "@tanstack/react-query";
import pigeon from "/pigeon.png";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { DataType } from "../types/model";
import TextCopyButton from "./button/TextCopyButton";
import { celebrationMessages } from "../data";

// const currentMonth = 1;
// const currentDay = 28;
const currentDate = dayjs();
const currentMonth = currentDate.month() + 1;
const currentDay = currentDate.date();

const Today = () => {
  const queryClient = useQueryClient();
  const nameDayData = queryClient.getQueryData(["nameDayData"]) as Map<number, Map<number, DataType[]>>;
  const [todayList, setTodayList] = useState<DataType[] | undefined>([]);
  const hasTodayList = (todayList && Array.isArray(todayList) && todayList.length > 0) || false;
  const [message, setMessage] = useState<string>("");
  const randomCelebrationMessage = useMemo(
    () => celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)],
    []
  );

  useEffect(() => {
    if (nameDayData) {
      const list = nameDayData.get(currentMonth)?.get(currentDay);
      console.log(list);
      setTodayList(list);
    }
  }, [nameDayData]);

  useEffect(() => {
    if (hasTodayList && todayList) {
      const newMessage = todayList.reduce((acc, cv: DataType, ci: number) => {
        const title = cv.gender === "남자" ? "형제" : "자매";
        acc += `${cv.name} ${cv.catname} ${title}님`;
        if (ci === todayList.length - 1) {
          acc += `의 영명 축일입니다. (${cv.description})`;
        } else {
          acc += ", ";
        }
        return acc;
      }, "오늘은 ");

      // 미리 선택된 랜덤 메시지 사용
      setMessage(newMessage + ". " + randomCelebrationMessage);
    }
  }, [todayList, hasTodayList, randomCelebrationMessage]);

  return (
    <div className="w-full min-h-24 flex items-center gap-4 layout-card bg-blue-50">
      <div className="flex flex-col items-center justify-center">
        <img src={pigeon} alt="pigeon" className="w-fit" />
        <p className="text-[0.6rem]">오늘의 축일자</p>
      </div>
      <div className="flex-1 flex-col justify-center">
        {hasTodayList &&
          todayList?.map((data: DataType) => (
            <span className="mr-2" key={data.name}>
              [{data.name}]
            </span>
          ))}
        {!hasTodayList && <p>오늘은 축일자가 없습니다.</p>}
        {hasTodayList && message && <p className="text-[0.6rem]">{message}</p>}
      </div>
      <TextCopyButton message={message} />
    </div>
  );
};

export default Today;
