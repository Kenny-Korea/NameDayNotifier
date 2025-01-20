import ExcelParser from "./components/excel/ExcelParser";
import ExcelUploader from "./components/excel/ExcelUploader";
import "./main.css";

const App = () => {
  return (
    <div className="App">
      {/* <ExcelParser /> */}
      <ExcelUploader />
    </div>
  );
};

export default App;
