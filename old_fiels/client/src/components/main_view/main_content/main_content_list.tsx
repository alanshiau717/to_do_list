import React, { Component } from "react";
import TaskUnit from "./task_unit";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import IList from "../../../models/client/list";
import { Iedittask } from "../../wrappers/main_view_wrapper";
import { ListGroup, InputGroup, FormControl } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

interface Props extends RouteComponentProps {
  list: IList;
  editTask: Iedittask;
}
interface State {
  addTaskInput: boolean;
  newTaskName: string;
}

// This component is the list displayed by the sidebar
class SidebarList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addTaskInput: false,
      newTaskName: "",
    };
    this.toggleInput = this.toggleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      this.props.editTask("add", this.state.newTaskName);
      this.setState({
        newTaskName: "",
        addTaskInput: false,
      });
    }
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newTaskName: e.target.value });
  }
  toggleInput() {
    if (this.state.addTaskInput === true) {
      this.setState({ addTaskInput: false });
    } else {
      this.setState({ addTaskInput: true });
    }
  }

  render() {
    const { list } = this.props;
    return (
      <div>
        <h2>{list.name}</h2>
        <ListGroup variant="flush">
          {list.tasks.map((task) => {
            return (
              !task.done &&
              !task.isDeleted && (
                <ListGroup.Item
                  key={task._id}
                  style={{ paddingLeft: "0px" }}
                >
                  <TaskUnit
                    task={task}
                    editTask={this.props.editTask}
                  />
                </ListGroup.Item>
              )
            );
          })}

          {this.state.addTaskInput ? (
            <ListGroup.Item>
              <InputGroup>
                <FormControl
                  autoFocus
                  placeholder="Task Name"
                  value={this.state.newTaskName}
                  onChange={this.handleChange}
                  onKeyPress={this.handleSubmit}
                />
              </InputGroup>
            </ListGroup.Item>
          ) : (
            <ListGroup.Item
              onClick={() => this.toggleInput()}
              style={{ cursor: "pointer" }}
            >
              <Plus /> Add Item
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  activeList: state.mainview.currentList,
});

export default withRouter(
  connect(mapStateToProps, { changeListView })(SidebarList),
);
