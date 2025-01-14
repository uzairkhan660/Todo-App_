import React , {useContext} from 'react';
import { BrowserRouter as Router , Route , Switch , Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components//Navbar";
import Todos from './components/Todos';
import Admin from './components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

function App() {
  
  return (
    <Router>
          <Navbar />
          <Route exact path="/" component={Home} />
          <UnPrivateRoute exact path="/login" component={Login} />
          <UnPrivateRoute exact path="/register" component={Register} />
          <PrivateRoute path="/todos" roles={["user","admin"]} component={Todos} />
          <PrivateRoute path="/admin" roles={["admin"]} component={Admin} />
    </Router>
  );
}

export default App;
