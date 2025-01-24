import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { dummyData } from "../data";
import dayjs from "dayjs";

type NameDay = {
  name: string;
  catholicName: string;
  description: string;
};

export const transformToMonthDayMap = (data: string[][]): Map<number, Map<number, NameDay[]>> => {
  // 헤더 제거 및 빈 데이터 필터링
  const filteredData = data
    .slice(1) // 헤더 제거
    .filter((row) => row.length > 0 && row.some((cell) => cell !== ""));

  // 월별 데이터 맵 생성
  const monthDayMap = new Map<number, Map<number, NameDay[]>>();

  filteredData.forEach((row) => {
    const [_, name, catholicName, dateStr, description] = row;

    // 날짜에서 월 추출 (ex. "12/26" or "12-26" -> 12)
    // const month = parseInt(dateStr.replace(/-/g, "/").split("/")[0]);
    const [monthStr, dayStr] = dateStr.split("/");
    const month = parseInt(monthStr);
    const day = parseInt(dayStr);

    const nameDay: NameDay = {
      name,
      catholicName,
      description,
    };

    // 월 Map이 없으면 생성
    if (!monthDayMap.has(month)) {
      monthDayMap.set(month, new Map<number, NameDay[]>());
    }

    // 해당 월의 Map 가져오기
    const dayMap = monthDayMap.get(month)!;

    // 일별 데이터 추가
    if (dayMap.has(day)) {
      dayMap.get(day)?.push(nameDay);
    } else {
      dayMap.set(day, [nameDay]);
    }
  });

  return monthDayMap;
};

const getLambdaData = async () => {
  const url = import.meta.env.VITE_API_GATEWAY_URL;
  const response = await fetch(url + "/nameday");
  return response.json();
};

const currentMonth = dayjs().month() + 1;

const NameDay = () => {
  const [nameDayData, setNameDayData] = useState<Map<number, NameDay[]> | undefined>();
  const [isEnabled, setIsEnabled] = useState(false);
  const { data, isLoading, error } = useQuery<string[][]>({
    queryKey: ["nameday"],
    queryFn: getLambdaData,
    staleTime: Infinity,
    enabled: isEnabled,
  });

  const handleTest = (): Map<number, NameDay[]> | undefined => {
    const monthDayMap = transformToMonthDayMap(dummyData);
    const result = monthDayMap.get(currentMonth);
    console.log(result);
    setNameDayData(result);
    console.log(result?.values());
    if (result) {
      Array.from(result.values()).map((nameDay) => {
        console.log(nameDay);
      });
    }
    return result;
  };

  const handleClick = () => {
    setIsEnabled(true);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  console.log(data);

  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleTest}>test</button>
      <button onClick={handleClick}>call lambda</button>
      <p>{currentMonth}월 축일자</p>
      {nameDayData &&
        Array.from(nameDayData.entries()).map(([day, nameDays]) => (
          <li key={day} className="mb-2">
            {day}일:
            <ul className="list-circle pl-5 mt-1">
              {nameDays.map((nameDay, index) => (
                <li key={index}>
                  {nameDay.name} ({nameDay.catholicName}) - {nameDay.description}
                </li>
              ))}
            </ul>
          </li>
        ))}
    </div>
  );
};

export default NameDay;
