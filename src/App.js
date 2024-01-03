import Router from "./App/Router";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Router />
      <AppFooter />
    </div>
  );
}

export default App;
