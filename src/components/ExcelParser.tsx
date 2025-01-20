import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";

const ExcelParser = () => {
  const [names, setNames] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async () => {
    if (!inputRef.current) return;

    const files = inputRef.current.files;
    if (files) {
      const rawFile = files[0];
      const file = await rawFile.arrayBuffer();
      const workbook = XLSX.read(file);
      console.log(workbook);
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
