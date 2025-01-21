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
    if (!files?.length) return;
    if (files.length > 1) return setError("Cannot upload multiple files");

    const rawFile = files[0];
    if (!rawFile.name.match(/\.(xlsx|xls|csv)$/)) {
      return setError("Please upload only Excel or CSV files (.xlsx, .xls or .csv)");
    }

    try {
      const file = await rawFile.arrayBuffer();
      const workbook = XLSX.read(file);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const rawData: Array<Array<string>> = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = rawData[0];

      if (!headers || rawData.length === 0) {
        setSubmittable(false);
        return setError("Cannot read data from uploaded file.");
      }

      const hasAllRequiredColumns = requiredColumns.every((value, index) => value === headers[index]);

      if (hasAllRequiredColumns) {
        setError("");
        setSubmittable(true);
      } else {
        setSubmittable(false);
        setError("Invalid data format.");
      }
    } catch (err) {
      setSubmittable(false);
      setError("Error processing file.");
    }
  };

  const handleSubmitData = () => {
    alert("succeeded to upload data");
  };

  return (
    <div className="bg-red-200">
      <input type="file" ref={inputRef} onChange={handleInputChange} />
      {submittable && (
        <button type="submit" onClick={handleSubmitData} className="bg-red-300 border-none">
          Submit
        </button>
      )}
      {error && <p>{error}</p>}
      <br />
    </div>
  );
};

export default ExcelParser;
