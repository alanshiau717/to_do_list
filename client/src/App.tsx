import { Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";
// import "./App.css";
import { Switch, Route} from "react-router-dom";
import LoginPage from "./components/login-page";
import ForgotPwd from "./components/forgot-password";
import Wrapper from "./components/wrappers/verification_wrapper";
import MainView from "./components/wrappers/main_view_wrapper";
import SignUp from "./components/sign-up";
import Calendar from "./components/test.component"
import PrivateRoute from "./components/wrappers/ProtectedRouteWrapper";
import { connect } from "react-redux";
import {
  userHasAuthenticated,
  userIsAuthenticating,
} from "./redux/reducers/userSessionSlice";

import UserAccessService from "./services/user.access";
import { store } from "./redux/store";
// import { store } from "./redux/store";
interface Props {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
  userHasAuthenticated: any;
  userIsAuthenticating: any;
}


class App extends Component<Props> {
  async onLoad() {
    console.log("hit onload")
    const isValidSession = await UserAccessService.isCurrentSessionValid()
    if(isValidSession){
      console.log('is a valid session setting userHasUAuthenticate to true')
      store.dispatch(userHasAuthenticated(true))
    }
    else{
      console.log("is not a valid session")
      store.dispatch(userHasAuthenticated(false))
    }
    console.log("setting is authenticating to false")
    store.dispatch(userIsAuthenticating(false))
    
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
              component={Wrapper(LoginPage)}
            />
            <Route
              exact
              path="/forgot"
              component={Wrapper(ForgotPwd)}
            />
            <Route exact path="/signup" component={Wrapper(SignUp)} />
            <PrivateRoute
            path='/main'
            // isAuthenticated={this.props.isAuthenticated}
            component={MainView}
        />
            <Route path="/calendar" component={Calendar} />
          </Switch>
        </div>
      </div>
    
      )
    )
  }
}

const mapStateToProps = (state: any) => ({
    isAuthenticating: state.usersession.isAuthenticating,
    isAuthenticated: state.usersession.isAuthenticated,
});

export default connect(mapStateToProps, {
  userHasAuthenticated,
  userIsAuthenticating,
})(App);

