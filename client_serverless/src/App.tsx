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
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import {
  userHasAuthenticated,
  userIsAuthenticating,
} from "./redux/reducers/userSessionSlice";

interface Props {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  userHasAuthenticated: any;
  userIsAuthenticating: any;
}
class App extends Component<Props> {
  async onLoad() {
    try {
      await Auth.currentSession();
      this.props.userHasAuthenticated(true);
    } catch (e) {
      console.log(e);
      if (e !== "No current user") {
        console.log("No current User");
      }
    }
    this.props.userIsAuthenticating(false);
  }
  componentDidMount() {
    this.onLoad();
  }

  render() {
    return (
      !this.props.isAuthenticating && (
        <div className="App">
          <div>
            <Switch>
              <Route
                exact
                path={["/"]}
                component={Wrapper(LoginPage, {})}
              />
              <Route
                exact
                path="/forgot"
                component={Wrapper(ForgotPwd, {})}
              />
              <Route
                exact
                path="/signup"
                component={Wrapper(SignUp, {})}
              />
              <Route path="/main" component={MainView} />
            </Switch>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticating: state.usersession.isAuthenticating,
    isAuthenticated: state.usersession.isAuthenticated,
  };
};

export default connect(mapStateToProps, {
  userHasAuthenticated,
  userIsAuthenticating,
})(App);
