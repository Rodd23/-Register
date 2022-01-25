import "./App.css";
import "@fontsource/roboto/400.css";
import { Router } from "react-router-dom";

import Routes from './routes';
import history from "./history";

import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
