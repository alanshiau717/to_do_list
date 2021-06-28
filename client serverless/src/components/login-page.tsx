import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import UserAccessService from "../services/user.access";
import UserLoginType from "../models/shared/user.login";
import { Link } from "react-router-dom";

interface Props extends RouteComponentProps {}
interface State extends UserLoginType {
  loading: boolean;
  trycount: number;
}

const Login = class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.verify_login = this.verify_login.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      email: "",
      password: "",
      uservalid: true,
      loading: false,
      trycount: 0,
    };
  }

  verify_login() {
    UserAccessService.signin(this.state)
      .then((response) => {
        this.setState({ uservalid: true });
        this.props.history.push("/main");
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response.status === 401) {
          this.setState({ uservalid: false });
          this.setState({ trycount: this.state.trycount + 1 });
        } else {
          console.log("Uncaught Error");
        }
      });
  }
  onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    this.setState({
      email: email,
    });
  }
  onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target.value;
    this.setState({
      password: password,
    });
  }
  render() {
    const { email, password, uservalid, trycount } = this.state;
    return (
      <form>
        <h3>Log in</h3>
        {uservalid === false && trycount <= 4 && (
          <Alert
            variant="danger"
            style={{
              margin: "0px 0px 0px 0px",
              padding: "5px 5px 5px 5px",
            }}
          >
            Email or password is wrong.
          </Alert>
        )}
        {uservalid === false && trycount > 4 && (
          <Alert
            variant="danger"
            style={{
              margin: "0px 0px 0px 0px",
              padding: "5px 5px 5px 5px",
            }}
          >
            Email or password is wrong. <br />
            <Alert.Link href="#">Reset your password.</Alert.Link>
          </Alert>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={this.onChangeEmail}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={this.onChangePassword}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label
              className="custom-control-label"
              htmlFor="customCheck1"
            >
              Remember me
            </label>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-dark btn-lg btn-block"
          onClick={this.verify_login}
        >
          Sign in
        </button>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
          }}
        >
          <div style={{ gridColumn: "1/2" }} className="text-left">
            <Link to="/signup"> Sign up </Link>
          </div>
          <div style={{ gridColumn: "2/3" }} className="text-right">
            Forgot <Link to="/forgot">password?</Link>
          </div>
        </div>
      </form>
    );
  }
};

export default withRouter(Login);
