import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import { Provider } from "./context/context";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
