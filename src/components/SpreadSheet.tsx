import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import dayjs from "dayjs";

type NameDay = {
  name: string;
  catholicName: string;
  description: string;
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

  const handleClick = () => {
    setIsEnabled(true);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  console.log(data);

  return (
    <div className="flex flex-col gap-2">
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
