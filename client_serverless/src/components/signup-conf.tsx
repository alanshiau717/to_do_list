import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { Auth } from "aws-amplify";
interface Props extends RouteComponentProps {}
interface State {}

const SignupConf = class SingupConf extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Form>
        <Form.Row></Form.Row>
      </Form>
    );
  }
};

export default withRouter(SignupConf);
