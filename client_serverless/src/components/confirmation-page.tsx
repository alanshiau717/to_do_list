import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Form, Button, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { userHasAuthenticated } from "../redux/reducers/userSessionSlice";
interface Props extends RouteComponentProps {
  email: string;
  pwd: string;
  userHasAuthenticated: any;
  isAuthenticated: boolean;
}

interface State {
  confirmationCode: string;
}

const Confirm = class ConfirmationPage extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.state = {
      confirmationCode: "",
    };
  }
  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    await Auth.confirmSignUp(
      this.props.email,
      this.state.confirmationCode,
    );
    await Auth.signIn(this.props.email, this.props.pwd);
    this.props.userHasAuthenticated(true);
    this.props.history.push("/main");
    console.log("hit");
  }
  handleFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      confirmationCode: e.target.value,
    });
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="input"
            maxLength={6}
            onChange={this.handleFieldChange}
            value={this.state.confirmationCode}
          />
          <Form.Text muted>
            Please check your email for the code.
          </Form.Text>
        </Form.Group>
      </Form>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.usersession.isAuthenticated,
  };
};

export default withRouter(
  connect(mapStateToProps, { userHasAuthenticated })(Confirm),
);
