import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
// import "./App.css";
import { Link, Switch, Route } from "react-router-dom";
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import LoginPage from "./components/login-page";
import ForgotPwd from "./components/forgot-password";
import Wrapper from "./components/wrappers/verification_wrapper";
import Test from "./components/test.component";
import MainView from "./components/wrappers/main_view_wrapper";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Switch>
            <Route exact path={["/"]} component={Wrapper(LoginPage)} />
            <Route exact path="/forgot" component={Wrapper(ForgotPwd)} />
            <Route exact path="/add" component={AddTutorial} />
            <Route path="/tutorials/:id" component={Tutorial} />
            <Route path="/main" component={MainView} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
