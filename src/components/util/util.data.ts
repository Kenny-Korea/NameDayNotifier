import { DataType } from "../../types/model";

export const parseNameDayData = (data: string[][]): Map<number, Map<number, DataType[]>> => {
  // 월과 일별로 데이터를 저장할 중첩 Map
  const nameDayMap = new Map<number, Map<number, DataType[]>>();

  // 헤더 제외하고 실제 데이터만 처리
  data.slice(2).forEach((row) => {
    const [_, name, catname, date, description] = row;
    const [month, day] = date.split("/").map(Number); // "MM/DD" 형식에서 월과 일 추출

    // 해당 월이 없으면 새로운 Map 생성
    if (!nameDayMap.has(month)) {
      nameDayMap.set(month, new Map<number, DataType[]>());
    }

    // 해당 일이 없으면 새로운 배열 생성
    const monthMap = nameDayMap.get(month)!;
    if (!monthMap.has(day)) {
      monthMap.set(day, []);
    }

    // 데이터 추가
    monthMap.get(day)!.push({
      name,
      date,
      catname,
      description,
    });
  });

  return nameDayMap;
};
