import "./App.css";
import "@fontsource/roboto/400.css";

import Routes from './routes';
import { SessionProvider } from "./providers/userSession";


function App() {
  return (
    <div className="App">
      <SessionProvider>
        <Routes />
      </SessionProvider>
    </div>
  );
}

export default App;
