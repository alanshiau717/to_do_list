import {
  GetFoldersDocument,
  GetFoldersQuery,
  ModifyTaskDocument,
} from "../../../generated";
import {
  Pencil,
  Trash,
  Circle,
  Calendar3,
  Check,
  CircleFill,
} from "react-bootstrap-icons";
import "../../../css/TaskElement.scss";
import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { openTaskViewModal } from "../../../redux/reducers/modalSlice";

interface Props {
  task: GetFoldersQuery["folders"][0]["lists"][0]["tasks"][0];
}

export function TaskElement(props: Props) {
  const isSingleRow = hasDueDateOrScheduleDate(props.task);
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskName, setNewTaskName] = useState(props.task.name);
  const dispatch = useDispatch();
  const [modifyTask, { data, loading, error }] = useMutation(
    ModifyTaskDocument,
    {
      refetchQueries: [GetFoldersDocument],
    }
  );
  function hasDueDateOrScheduleDate(
    task: GetFoldersQuery["folders"][0]["lists"][0]["tasks"][0]
  ): Boolean {
    if (task.due == null) {
      return true;
    }
    return false;
  }

  function isPastDueDate(
    task: GetFoldersQuery["folders"][0]["lists"][0]["tasks"][0]
  ) {
    const now = new Date();
    if (now.getTime() - new Date(task.due!).getTime() > 0) {
      return true;
    }
    return false;
  }
  function handleClick(event: React.MouseEvent<HTMLElement>) {
    // @ts-ignore
    if (!event.target.classList.value.includes("clickPropagator")) {
      event.preventDefault();
    } else {
      dispatch(openTaskViewModal({ props: { task: props.task } }));
    }
  }
  function changeTaskNameOnEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      modifyTask({
        variables: {
          data: {
            name: newTaskName,
            id: parseInt(props.task._id),
          },
        },
      });
      setIsEditing(false);
    }
  }
  function completeTask() {
    modifyTask({
      variables: {
        data: {
          id: parseInt(props.task._id),
          done: true,
        },
      },
    });
  }

  function deleteTask() {
    modifyTask({
      variables: {
        data: {
          name: newTaskName,
          id: parseInt(props.task._id),
          isDeleted: true,
        },
      },
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskName(e.target.value);
  }

  return (
    <div
      className={"TaskElementContainer clickPropagator"}
      style={isSingleRow ? { height: "50px" } : {}}
      onClick={handleClick}
    >
      <div
        className={`${
          isSingleRow ? "TaskElementRow1-singleRow" : ""
        } TaskElementRow1 clickPropagator`}
      >
        <div
          className={"TaskCircle hover-button"}
          onClick={() => completeTask()}
        >
          <Circle size={24} className={"hover-button--off"} />
          <CircleFill size={24} className={"hover-button--on"} />
        </div>
        <div className={"Text clickPropagator"}>
          {isEditing ? (
            <InputGroup>
              <FormControl
                autoFocus
                onChange={handleChange}
                onKeyPress={changeTaskNameOnEnter}
                value={newTaskName}
              />
            </InputGroup>
          ) : (
            newTaskName
          )}
        </div>
        <div className={"EditButton"} onClick={() => setIsEditing(true)}>
          <Pencil />
        </div>
        <div className={"DeleteButton"} onClick={() => deleteTask()}>
          <Trash />
        </div>
      </div>
      {!isSingleRow && (
        <div className={"TaskElementRow2 clickPropagator"}>
          <div className={"ScheduleCalendar"}>
            <Calendar3 size={15} />
          </div>
          <div
            className={`DueDate ${
              isPastDueDate(props.task) ? "DueDate-expired" : ""
            }`}
          >
            {new Date(props.task.due!).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
}
