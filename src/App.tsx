import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Provider } from "./context/context";
import "./global/styles/global.css";
import theme from "./global/styles/theme";
import AppRouter from "./routes";

function App() {
  return (
    <Provider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
