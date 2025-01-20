import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

interface Data {
  CatName: string;
  Name: string;
  Date: number;
}

const ExcelParser = () => {
  const [names, setNames] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const requestPermission = async () => {
  //     console.log(Notification.permission);
  //     const permission = await Notification.requestPermission();
  //     console.log(permission);
  //   };
  //   requestPermission();
  // }, []);

  const handleFileUpload = async () => {
    if (!inputRef.current) return;

    const files = inputRef.current.files;
    if (files) {
      const rawFile = files[0];
      const file = await rawFile.arrayBuffer();
      const workbook = XLSX.read(file);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData: Array<Data> = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
      console.log(rawData);

      rawData.forEach((row: Data) => {
        if (row.Date) {
          const excelDate = row.Date;
          const jsDate = new Date((excelDate - 25569) * 86400 * 1000); // JavaScript Date로 변환
          const formattedDate = dayjs(jsDate).format("MM-DD"); // 날짜를 `dayjs`로 파싱하고 월과 일만 추출
          console.log(`월과 일: ${formattedDate}`);
        }
      });
    }
  };

  const readExcelFile = () => {};

  function parseExcelDate(excelDate: number) {
    // Excel 날짜 기준(1900-01-01)
    const excelEpoch = new Date(1900, 0, 1);

    // Excel 날짜 계산 보정
    // Excel에서는 1900년이 윤년이라고 잘못 계산하여 모든 날짜가 1일 앞서 저장되는 오류를 보정하기 위함
    const parsedDate = new Date(excelEpoch.getTime() + (excelDate - 1) * 24 * 60 * 60 * 1000);

    return parsedDate;
  }

  return (
    <>
      <input type="file" ref={inputRef} onChange={handleFileUpload} />
      <br />
    </>
  );
};

export default ExcelParser;
