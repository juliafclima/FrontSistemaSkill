import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes";
import { Provider } from "./context/context";
import { ThemeProvider } from "styled-components";
import theme from "./global/styles/theme";

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
