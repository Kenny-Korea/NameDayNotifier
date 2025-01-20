import ExcelParser from "./components/ExcelParser";
import agape from "/agape.png";

const App = () => {
  return (
    <div className="App">
      <img src={agape} alt="" />
      <ExcelParser />
    </div>
  );
};

export default App;
