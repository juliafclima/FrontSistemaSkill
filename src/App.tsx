import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import AppRouter from "./routes";
import { Provider } from "./context/context";
import theme from "./global/styles/theme";
import "./global/styles/global.css";

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
