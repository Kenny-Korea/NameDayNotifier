import { useQuery } from "@tanstack/react-query";
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: import.meta.env.VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });
console.log(auth);
console.log(sheets);

export const getSpreadsheetData = async () => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: import.meta.env.VITE_SPREADSHEET_ID,
      range: "시트1!A:Z", // 전체 데이터 범위
    });

    return response.data.values;
  } catch (error) {
    console.error("Error fetching spreadsheet data:", error);
    throw new Error("Failed to fetch spreadsheet data");
  }
};

const NameDay = () => {
  const { data, isLoading, error } = useQuery<string[][]>({
    queryKey: ["spreadsheetData"],
    queryFn: getSpreadsheetData,
    staleTime: Infinity,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;

  console.log(data);

  return <div>{data && data.map((row, i) => <div key={i}>{row.join(", ")}</div>)}</div>;
};

export default NameDay;
