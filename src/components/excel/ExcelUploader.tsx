import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

const requiredColumns = ["Name", "CatName", "Date"];

const ExcelParser = () => {
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = async () => {
    if (!inputRef.current) return;

    const files = inputRef.current.files;
    if (files && files.length > 1) return setError("Cannot upload multiple files");
    if (files) {
      const rawFile = files[0];
      const file = await rawFile.arrayBuffer();
      const workbook = XLSX.read(file);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const rawData: Array<Array<string>> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = rawData[0];
      console.log(headers);

      const hasAllRequiredColumns = requiredColumns.every((value, index) => value === headers[index]);
      console.log(hasAllRequiredColumns);

      if (hasAllRequiredColumns) {
        if (error) {
          setError("");
        }
        setSubmittable(true);
        console.log(rawData);
      } else {
        if (rawData.length === 0) {
          setError("Cannot read data from uploaded file.");
        } else {
          setError("Invalid data format.");
        }
      }
    }
  };

  const validateExcelFile = () => {};

  return (
    <>
      <input type="file" ref={inputRef} onChange={handleInputChange} />
      {submittable && <button type="submit">Submit</button>}
      {error && <p>{error}</p>}
      <br />
    </>
  );
};

export default ExcelParser;
