import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./route";
import RouterBeforeEach from "@/components/RouterBeforeEach";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterBeforeEach>
          <AppRoute />
        </RouterBeforeEach>
      </BrowserRouter>
    </div>
  );
}

export default App;
