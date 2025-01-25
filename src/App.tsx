import Card from "./components/card/Card";
import CardLayout from "./components/card/CardLayout";
import ExcelParser from "./components/excel/ExcelParser";
import ExcelUploader from "./components/excel/ExcelUploader";
import NameDay from "./components/NameDay";
import SearchBar from "./components/search/SearchBar";
import SpreadSheet from "./components/SpreadSheet";
import Today from "./components/Today";
import "./main.css";
import AGAPE_CI from "/agape-ci.png";

const App = () => {
  return (
    <div className="w-screen h-screen p-4 flex flex-col items-center bg-gradient-to-b from-gray-50 via-gray-50/95 to-gray-50/90">
      <img src={AGAPE_CI} className="w-24" />

      <SearchBar />
      {/* <ExcelParser /> */}
      {/* <ExcelUploader /> */}
      {/* <NameDay /> */}
      {/* <SpreadSheet /> */}
      <p>hello world</p>
      <Today />
      <CardLayout />
    </div>
  );
};

export default App;
