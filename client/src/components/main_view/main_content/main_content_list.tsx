import React, { Component, useState } from "react";
import TaskUnit from "./task_unit";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import IList from "../../../models/client/list";
// import { Iedittask } from "../../wrappers/main_view_wrapper";
import { ListGroup, InputGroup, FormControl } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import {
  CreateTaskDocument,
  GetFoldersDocument,
  GetFoldersQuery,
} from "../../../generated";
import { useMutation } from "@apollo/client";

interface Props extends RouteComponentProps {
  list: GetFoldersQuery["folders"][0]["lists"][0];
}

function SidebarListFunctional(props: Props) {
  const currentList = useSelector(
    (state: any) => state.mainview.currentList,
  );
  const [addTaskInput, setAddTaskInput] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [addList, { data, loading, error }] = useMutation(
    CreateTaskDocument,
    {
      refetchQueries: [GetFoldersDocument],
    },
  );
  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      // this.props.editTask("add", this.state.newTaskName);
      addList({
        variables: {
          data: {
            name: newTaskName,
            list: parseInt(currentList),
          },
        },
      });
      setNewTaskName("");
      setAddTaskInput(false);
      // this.setState({
      //   newTaskName: "",
      //   addTaskInput: false,
      // });
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // this.setState({ newTaskName: e.target.value });
    setNewTaskName(e.target.value);
  }
  function toggleInput() {
    if (addTaskInput === true) {
      // this.setState({ addTaskInput: false });
      setAddTaskInput(false);
    } else {
      setAddTaskInput(true);
      // this.setState({ addTaskInput: true });
    }
  }

  return (
    <div>
      <h2>{props.list.name}</h2>
      <ListGroup variant="flush">
        {props.list.tasks.map((task) => {
          return (
            !task.done &&
            !task.isDeleted && (
              <ListGroup.Item
                key={task._id}
                style={{ paddingLeft: "0px" }}
              >
                <TaskUnit
                  task={task}
                  // editTask={this.props.editTask}
                />
              </ListGroup.Item>
            )
          );
        })}

        {addTaskInput ? (
          <ListGroup.Item>
            <InputGroup>
              <FormControl
                autoFocus
                placeholder="Task Name"
                value={newTaskName}
                onChange={handleChange}
                onKeyPress={handleSubmit}
              />
            </InputGroup>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item
            onClick={() => toggleInput()}
            style={{ cursor: "pointer" }}
          >
            <Plus /> Add Item
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
}

// const mapStateToProps = (state: any) => ({
//   activeList: state.mainview.currentList,
// });

// export default withRouter(
//   connect(mapStateToProps, { changeListView })(SidebarList),
// );

export default withRouter(SidebarListFunctional);
