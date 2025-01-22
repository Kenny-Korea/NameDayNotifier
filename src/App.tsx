import ExcelParser from "./components/excel/ExcelParser";
import ExcelUploader from "./components/excel/ExcelUploader";
import NameDay from "./components/NameDay";
import SpreadSheet from "./components/SpreadSheet";
import "./main.css";

const App = () => {
  return (
    <div className="App">
      <ExcelParser />
      {/* <ExcelUploader /> */}
      <br />
      {/* <NameDay /> */}
      <SpreadSheet />
    </div>
  );
};

export default App;
