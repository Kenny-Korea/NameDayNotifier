import Card from "./components/card/Card";
import ExcelParser from "./components/excel/ExcelParser";
import ExcelUploader from "./components/excel/ExcelUploader";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
import NameDay from "./components/NameDay";
import SpreadSheet from "./components/SpreadSheet";
import Table from "./components/Table";
import Today from "./components/Today";
import "./main.css";

const tests = "test";

const App = () => {
  return (
    // <div className="w-screen h-screen p-4 flex flex-col items-center bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50/90">
    <div className="w-screen h-screen flex flex-col bg-blue-300">
      <div className="w-full h-full p-4 flex flex-col">
        <Header />
        <Content />
        {/* <ExcelParser /> */}
        {/* <ExcelUploader /> */}
        {/* <NameDay /> */}
        {/* <SpreadSheet /> */}
      </div>
    </div>
  );
};

export default App;
