import { Route, Redirect } from "react-router-dom";
import { createElement } from "react";
import {store} from "../../redux/store"

const PrivateRoute = ({component, ...rest}: any) => {
  const state = store.getState();
  const isAuthenticated = state.usersession.isAuthenticated
  console.log('Is authenticated', isAuthenticated)
  const routeComponent = (props: any) => (
      isAuthenticated
          ? createElement(component, props)
          : <Redirect to={{pathname: '/'}}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};

export default PrivateRoute