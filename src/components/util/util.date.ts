import dayjs from "dayjs";
import { DataType } from "../../types/model";

export class DateUtil {
  constructor() {
    this.date = dayjs();
  }

  public date: dayjs.Dayjs;

  public getMonth() {
    const dayjsMonth = dayjs().month();
    return dayjsMonth + 1;
  }

  public transformToMonthDayMap = (data: string[][]): Map<number, Map<number, DataType[]>> => {
    // 헤더 제거 및 빈 데이터 필터링
    const filteredData = data
      .slice(1) // 헤더 제거
      .filter((row) => row.length > 0 && row.some((cell) => cell !== ""));

    // 월별 데이터 맵 생성
    const monthDayMap = new Map<number, Map<number, DataType[]>>();

    filteredData.forEach((row) => {
      const [_, name, catname, date, description] = row;

      // 날짜에서 월 추출 (ex. "12/26" or "12-26" -> 12)
      // const month = parseInt(dateStr.replace(/-/g, "/").split("/")[0]);
      const [monthStr, dayStr] = date.split("/");
      const month = parseInt(monthStr);
      const day = parseInt(dayStr);

      const nameDay: DataType = { name, catname, description, date };

      // 월 Map이 없으면 생성
      if (!monthDayMap.has(month)) {
        monthDayMap.set(month, new Map<number, DataType[]>());
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
}

export const util = new DateUtil();
