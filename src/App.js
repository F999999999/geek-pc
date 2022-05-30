import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./route";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
