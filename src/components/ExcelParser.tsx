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
      console.log(workbook);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const raw_data: Array<Data> = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
      const date = raw_data[0].Date;

      function parseExcelDate(excelDate: number) {
        // Excel 날짜 기준(1900-01-01)
        const excelEpoch = new Date(1900, 0, 1);

        // Excel 날짜 계산 보정 (-1일: Excel 날짜 계산 오류)
        const parsedDate = new Date(excelEpoch.getTime() + (excelDate - 1) * 24 * 60 * 60 * 1000);

        return parsedDate;
      }

      const jsDate = parseExcelDate(date);
      console.log(jsDate.toISOString());
      console.log(jsDate);
      console.log(dayjs(date, {}));
    }
  };

  return (
    <>
      <input type="file" ref={inputRef} onChange={handleFileUpload} />
      <br />
    </>
  );
};

export default ExcelParser;
