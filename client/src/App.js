import { Route } from "react-router-dom";
import "./App.css";
import { Detail, Form, Home, Landing } from "./views";
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
axios.defaults.baseURL = "https://pokemon-production-96fb.up.railway.app";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/pokemon/:id">
        <Detail />
      </Route>
      <Route path="/form">
        <Form />
      </Route>
    </div>
  );
}

export default App;
