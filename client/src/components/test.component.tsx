import React from "react";
import UserAccessService from "../services/user.access";
import ToDoList from "../services/main.service";
interface Props {}
interface State {}

export default class TestPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getUser = this.getUser.bind(this);
  }
  getUser() {
    console.log(UserAccessService.getCurrentUser());
    ToDoList.getTask({})
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <button
          // type="submit"
          type="button"
          className="btn btn-dark btn-lg btn-block"
          onClick={this.getUser}
        >
          Sign in
        </button>
      </div>
    );
  }
}
