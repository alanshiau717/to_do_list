import React, { Component, useState } from "react";
import ITask from "../../../models/client/task";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Trash, Check } from "react-bootstrap-icons";
import {
  InputGroup,
  FormControl,
  Container,
  Col,
  Row,
} from "react-bootstrap";
// import { Iedittask } from "../../wrappers/main_view_wrapper";
import {
  GetFoldersDocument,
  GetFoldersQuery,
  ModifyTaskDocument,
} from "../../../generated";
import "./css/task_unit.css";
import { useMutation } from "@apollo/client";
interface Props extends RouteComponentProps {
  task: GetFoldersQuery["folders"][0]["lists"][0]["tasks"][0];
  // editTask: Iedittask;
}

interface State {
  TaskName: string;
  inputMode: boolean;
  hoverTask: boolean;
  hoverTick: boolean;
  showMenu: boolean;
  xPos: string;
  yPos: string;
}

function TaskUnitFunctional(props: Props) {
  const [modifyTask, { data, loading, error }] = useMutation(
    ModifyTaskDocument,
    {
      refetchQueries: [GetFoldersDocument],
    },
  );
  const [taskName, setTaskName] = useState(props.task.name);
  const [inputMode, setInputMode] = useState(false);
  const [hoverTask, setHoverTask] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hoverTick, setHoverTick] = useState(false);
  const [xPos, setXPos] = useState("0px");
  const [yPos, setYPos] = useState("0px");

  function toggleNameChange(e: React.MouseEvent) {
    if (e.altKey) {
      setInputMode(true);
      // this.setState({ inputMode: true });
    }
  }
  function changeHoverTick(state: boolean) {
    setHoverTick(state);
    // this.setState({ hoverTick: state });
  }
  function changeHoverTask(state: boolean) {
    setHoverTask(state);
    // this.setState({ hoverTask: state });
  }
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value);
    // this.setState({ TaskName: e.target.value });
  }
  function changeName() {
    modifyTask({
      variables: {
        data: {
          name: taskName,
          id: parseInt(props.task._id),
        },
      },
    });
    setInputMode(false);
  }
  return (
    <div>
      {inputMode ? (
        <InputGroup>
          <FormControl
            autoFocus
            placeholder="Task Name"
            value={taskName}
            onChange={handleNameChange}
            onKeyPress={(
              e: React.KeyboardEvent<HTMLInputElement>,
            ) => {
              if (e.key === "Enter") {
                changeName();
              }
            }}
            onBlur={() => changeName()}
          />
        </InputGroup>
      ) : (
        <Container
          onMouseEnter={() => changeHoverTask(true)}
          onMouseOut={() => changeHoverTask(false)}
        >
          <Row style={{ maxWidth: "100%", minWidth: "100%" }}>
            <Col style={{ padding: "0px" }} md="auto">
              <div
                className="circle"
                onClick={() =>
                  modifyTask({
                    variables: {
                      data: {
                        done: true,
                        id: parseInt(props.task._id),
                      },
                    },
                  })
                }
              >
                <Check className="check" />
              </div>
              {/* {this.state.hoverTick ? (
                  <CheckCircleFill
                    id="circle_fill"
                    onClick={() =>
                      this.props.editTask(
                        "complete",
                        this.props.task._id,
                      )
                    }
                    onMouseEnter={() => this.changeHoverTick(true)}
                    onMouseLeave={() => this.changeHoverTick(false)}
                  />
                ) : (
                  <Circle
                    id="circle"
                    onClick={() =>
                      this.props.editTask(
                        "complete",
                        this.props.task._id,
                      )
                    }
                    onMouseEnter={() => this.changeHoverTick(true)}
                    onMouseLeave={() => this.changeHoverTick(false)}
                  />
                )} */}
            </Col>
            <Col onClick={toggleNameChange}>{taskName}</Col>
            <Col className="ml-auto" md="auto">
              {hoverTask && (
                <Trash
                  onClick={
                    () =>
                      modifyTask({
                        variables: {
                          data: {
                            isDeleted: true,
                            id: parseInt(props.task._id),
                          },
                        },
                      })
                    // this.props.editTask("delete", this.props.task._id)
                  }
                />
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default withRouter(TaskUnitFunctional);
