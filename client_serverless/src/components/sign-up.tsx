import React from "react";
import UserAccessService from "../services/user.access.serverless";

import {
  Form,
  Button,
  Col,
  // FormControlElement,
} from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import ConfirmationPage from "./confirmation-page";

interface ErrorObj {
  pwd: {
    error_msg: string;
    is_err: boolean;
  };
  fname: {
    error_msg: string;
    is_err: boolean;
  };
  lname: {
    error_msg: string;
    is_err: boolean;
  };
  email: {
    error_msg: string;
    is_err: boolean;
  };
}
interface FormValues {
  fname: string;
  lname: string;
  pwd: string;
  confpwd: string;
  email: string;
}
interface Props extends RouteComponentProps {}
interface State {
  banner_message: string;
  validation: boolean;
  error: ErrorObj;
  formValues: FormValues;
  submitted: boolean;
}

class LoginPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      submitted: false,
      banner_message: "",
      validation: false,
      error: {
        pwd: {
          error_msg: "",
          is_err: false,
        },
        fname: {
          error_msg: "",
          is_err: false,
        },
        lname: {
          error_msg: "",
          is_err: false,
        },
        email: {
          error_msg: "",
          is_err: false,
        },
      },
      formValues: {
        fname: "",
        lname: "",
        pwd: "",
        confpwd: "",
        email: "",
      },
    };
  }
  validate() {
    var canSubmit = true;
    var tempErr = this.state.error;
    if (this.state.formValues.fname === "") {
      tempErr.fname = {
        error_msg: "Please Enter First Name",
        is_err: true,
      };
      canSubmit = false;
    } else {
      tempErr.fname.is_err = false;
    }

    if (this.state.formValues.lname === "") {
      tempErr.lname = {
        error_msg: "Please Enter Last Name",
        is_err: true,
      };
      canSubmit = false;
    } else {
      tempErr.lname.is_err = false;
    }
    if (this.state.formValues.pwd === "") {
      tempErr.pwd = {
        error_msg: "Please Enter a password",
        is_err: true,
      };
      canSubmit = false;
    } else if (
      this.state.formValues.pwd !== this.state.formValues.confpwd
    ) {
      tempErr.pwd = {
        error_msg: "Passwords don't match",
        is_err: true,
      };
      canSubmit = false;
    } else {
      tempErr.pwd.is_err = false;
    }
    var emailPattern =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(this.state.formValues.email)) {
      tempErr.email = {
        error_msg: "Please enter a valid email",
        is_err: true,
      };
      canSubmit = false;
    } else {
      tempErr.email.is_err = false;
    }
    this.setState({
      error: tempErr,
    });
    return canSubmit;
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [e.target.name]: e.target.value,
      },
    });
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      validation: true,
    });

    var canSubmit = this.validate();
    if (canSubmit) {
      var data = {
        firstName: this.state.formValues.fname,
        lastName: this.state.formValues.lname,
        email: this.state.formValues.email,
        password: this.state.formValues.pwd,
      };

      try {
        await UserAccessService.signup(data);
        this.setState({ submitted: true });
      } catch (e) {
        if (e.code === "UsernameExistsException") {
          this.setState({
            error: {
              ...this.state.error,
              email: {
                error_msg: "Email Already Exists",
                is_err: true,
              },
            },
          });
        } else {
          console.log(e);
        }
      }
    }
  }
  render() {
    return !this.state.submitted ? (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              type="input"
              placeholder="First Name"
              name="fname"
              value={this.state.formValues.fname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.handleChange(e);

                if (this.state.validation) {
                  setTimeout(() => {
                    this.validate();
                  }, 1);
                }
              }}
              isInvalid={this.state.error.fname.is_err}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.error.fname.error_msg}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              // required
              type="input"
              placeholder="Last Name"
              name="lname"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.handleChange(e);

                if (this.state.validation) {
                  setTimeout(() => {
                    this.validate();
                  }, 1);
                }
              }}
              value={this.state.formValues.lname}
              isInvalid={this.state.error.lname.is_err}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.error.lname.error_msg}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridEmial">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              this.handleChange(e);

              if (this.state.validation) {
                setTimeout(() => {
                  this.validate();
                }, 1);
              }
            }}
            value={this.state.formValues.email}
            placeholder="Enter Email"
            name="email"
            isInvalid={this.state.error.email.is_err}
          />
          <Form.Control.Feedback type="invalid">
            {this.state.error.email.error_msg}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              // required
              type="password"
              placeholder=""
              name="pwd"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.handleChange(e);

                if (this.state.validation) {
                  setTimeout(() => {
                    this.validate();
                  }, 1);
                }
              }}
              value={this.state.formValues.pwd}
              isInvalid={this.state.error.pwd.is_err}
            />
            <Form.Control.Feedback type="invalid">
              {this.state.error.pwd.error_msg}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              // required
              type="password"
              placeholder=""
              name="confpwd"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.handleChange(e);

                if (this.state.validation) {
                  setTimeout(() => {
                    this.validate();
                  }, 1);
                }
              }}
              value={this.state.formValues.confpwd}
              isInvalid={this.state.error.pwd.is_err}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    ) : (
      <ConfirmationPage
        email={this.state.formValues.email}
        pwd={this.state.formValues.pwd}
      />
    );
  }
}

export default withRouter(LoginPage);
