import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

interface Data {
  CatName: string;
  Name: string;
  Date: number;
}

const ExcelParser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    if (!inputRef.current?.files?.length) return;

    setIsLoading(true);
    setError(null);

    try {
      const rawFile = inputRef.current.files[0];
      const file = await rawFile.arrayBuffer();
      const workbook = XLSX.read(file);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData: Array<Data> = XLSX.utils.sheet_to_json(worksheet);

      await saveToDynamoDB(rawData);
    } catch (error) {
      console.error("파일 처리 중 오류:", error);
      setError("파일 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
    // rawData.forEach((row: Data) => {
    //   if (row.Date) {
    //     const excelDate = row.Date;
    //     const jsDate = new Date((excelDate - 25569) * 86400 * 1000); // JavaScript Date로 변환
    //     const formattedDate = dayjs(jsDate).format("MM-DD"); // 날짜를 `dayjs`로 파싱하고 월과 일만 추출
    //     console.log(`월과 일: ${formattedDate}`);
    //   }
    // });
  };

  const saveToDynamoDB = async (data: Data[]) => {
    const client = new DynamoDBClient({
      region: "ap-northeast-2", // 서울 리전
      credentials: {
        accessKeyId: import.meta.env.VITE_APP_AWS_ACCESS_KEY_ID!,
        secretAccessKey: import.meta.env.VITE_APP_AWS_SECRET_ACCESS_KEY!,
      },
    });

    console.log(client);

    const docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });

    const TABLE_NAME = "NameDayNotificator"; // DynamoDB 테이블명

    // 데이터를 25개씩 나누어 처리 (DynamoDB 배치 작업 제한)
    const chunkSize = 25;
    for (let i = 0; i < data.length; i += chunkSize) {
      console.log(i);
      const chunk = data.slice(i, i + chunkSize);

      const batchWriteParams = {
        RequestItems: {
          [TABLE_NAME]: chunk.map((item) => {
            console.log(item);
            const excelDate = item.Date;
            const jsDate = new Date((excelDate - 25569) * 86400 * 1000); // JavaScript Date로 변환
            const formattedDate = dayjs(jsDate).format("MM-DD"); // 날짜를 `dayjs`로 파싱하고 월과 일만 추출
            return {
              PutRequest: {
                Item: {
                  id: `${item.CatName}_${item.Name}_${item.Date}`, // 복합 키 생성
                  CatName: item.CatName,
                  Name: item.Name,
                  Date: formattedDate,
                  // Date: dayjs(parseExcelDate(item.Date)).format("YYYY-MM-DD"),
                  CreatedAt: new Date().toISOString(),
                  UpdatedAt: new Date().toISOString(),
                },
              },
            };
          }),
        },
      };

      console.log(batchWriteParams);

      try {
        await docClient.send(new BatchWriteCommand(batchWriteParams));
        console.log(`${i + chunk.length}개의 항목이 성공적으로 저장되었습니다.`);
      } catch (error) {
        console.error("DynamoDB 저장 중 오류 발생:", error);
        // 실패한 요청 재시도 로직 구현 가능
      }
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
    <div>
      <input type="file" ref={inputRef} onChange={handleFileUpload} accept=".xlsx,.xls,.csv" disabled={isLoading} />
      {isLoading && <p>데이터를 처리중입니다...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ExcelParser;
