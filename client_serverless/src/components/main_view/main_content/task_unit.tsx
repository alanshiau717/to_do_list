import React, { Component } from "react";
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
import { Iedittask } from "../../wrappers/main_view_wrapper";
import "./css/task_unit.css";
interface Props extends RouteComponentProps {
  task: ITask;
  editTask: Iedittask;
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

class TaskUnit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      TaskName: this.props.task.name,
      inputMode: false,
      hoverTask: false,
      showMenu: false,
      hoverTick: false,
      xPos: "0px",
      yPos: "0px",
    };
    this.toggleNameChange = this.toggleNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeHoverTask = this.changeHoverTask.bind(this);
    this.changeHoverTick = this.changeHoverTick.bind(this);
  }

  toggleNameChange(e: React.MouseEvent) {
    if (e.altKey) {
      this.setState({ inputMode: true });
    }
  }
  changeHoverTick(state: boolean) {
    this.setState({ hoverTick: state });
  }
  changeHoverTask(state: boolean) {
    this.setState({ hoverTask: state });
  }
  handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ TaskName: e.target.value });
  }
  changeName() {
    this.props.editTask("edit", {
      name: this.state.TaskName,
      _id: this.props.task._id,
    });
    this.setState({ inputMode: false });
  }

  render() {
    return (
      <div>
        {this.state.inputMode ? (
          <InputGroup>
            <FormControl
              autoFocus
              placeholder="Task Name"
              value={this.state.TaskName}
              onChange={this.handleNameChange}
              onKeyPress={(
                e: React.KeyboardEvent<HTMLInputElement>,
              ) => {
                if (e.key === "Enter") {
                  this.changeName();
                }
              }}
              onBlur={() => this.changeName()}
            />
          </InputGroup>
        ) : (
          <Container
            onMouseEnter={() => this.changeHoverTask(true)}
            onMouseOut={() => this.changeHoverTask(false)}
          >
            <Row style={{ maxWidth: "100%", minWidth: "100%" }}>
              <Col style={{ padding: "0px" }} md="auto">
                <div
                  className="circle"
                  onClick={() =>
                    this.props.editTask(
                      "complete",
                      this.props.task._id,
                    )
                  }
                >
                  <Check className="check" />
                </div>
              </Col>
              <Col onClick={this.toggleNameChange}>
                {this.state.TaskName}
              </Col>
              <Col className="ml-auto" md="auto">
                {this.state.hoverTask && (
                  <Trash
                    onClick={() =>
                      this.props.editTask(
                        "delete",
                        this.props.task._id,
                      )
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
}
export default withRouter(TaskUnit);
