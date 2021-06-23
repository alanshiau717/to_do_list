import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
// import "./App.css";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./components/login-page";
import ForgotPwd from "./components/forgot-password";
import Wrapper from "./components/wrappers/verification_wrapper";
import MainView from "./components/wrappers/main_view_wrapper";
import SignUp from "./components/sign-up";
class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Switch>
            <Route
              exact
              path={["/"]}
              component={Wrapper(LoginPage)}
            />
            <Route
              exact
              path="/forgot"
              component={Wrapper(ForgotPwd)}
            />
            <Route exact path="/signup" component={Wrapper(SignUp)} />
            <Route path="/main" component={MainView} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
