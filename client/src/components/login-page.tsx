import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserAccessService from "../services/user.access";
import { UserLoginType } from "../types/user.access";

interface Props {}
interface State extends UserLoginType {
  loading: boolean;
}

export default class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.verify_login = this.verify_login.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      email: "",
      password: "",
      uservalid: false,
      loading: false,
    };
  }

  verify_login() {
    UserAccessService.signin(this.state)
      .then((response) => {})
      .catch((e) => {
        console.log(e.response);
        if (e.response.status === 401) {
          this.setState({ uservalid: false });
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
    const { email, password, uservalid } = this.state;
    return (
      <form>
        <h3>Log in</h3>

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
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          // type="submit"
          type="button"
          className="btn btn-dark btn-lg btn-block"
          onClick={this.verify_login}
        >
          Sign in
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}
