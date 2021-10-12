import { Route, BrowserRouter, Switch } from "react-router-dom";
import { ChartDataContextProvider } from "./contexts/ChartDataContext";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <ChartDataContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ChartDataContextProvider>
  );
}

export default App;
