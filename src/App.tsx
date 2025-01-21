import ExcelParser from "./components/excel/ExcelParser";
import ExcelUploader from "./components/excel/ExcelUploader";
import Table from "./components/Table";
import "./main.css";

const App = () => {
  return (
    <div className="App">
      <ExcelParser />
      {/* <ExcelUploader /> */}
      <br />
      <Table />
    </div>
  );
};

export default App;
