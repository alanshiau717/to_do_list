import { useMutation } from "@apollo/client";
import {
  CreateTaskDocument,
  GetFoldersDocument,
  GetFoldersQuery,
} from "../../../generated";
import { useSelector } from "react-redux";
import "../../../css/TaskViewContainer.css";
import { TaskElement } from "./TaskElement";
import { FormControl, InputGroup } from "react-bootstrap";
import React, { useState } from "react";

interface Props {
  folders: GetFoldersQuery["folders"];
}

function getCurrentTaskList(
  folders: GetFoldersQuery["folders"],
  currentList: string,
  currentFolder: string
): GetFoldersQuery["folders"][0]["lists"][0] | null {
  let currentTaskList: GetFoldersQuery["folders"][0]["lists"][0] | null = null;
  folders.forEach((folder) => {
    if (folder._id == currentFolder) {
      folder.lists.forEach((list) => {
        if (list._id == currentList) {
          currentTaskList = list;
        }
      });
    }
  });
  return currentTaskList;
}

export default function TaskViewContainer(props: Props) {
  const [addTask, { data, loading, error }] = useMutation(CreateTaskDocument, {
    refetchQueries: [GetFoldersDocument],
  });
  const currentList = useSelector((state: any) => state.mainview.currentList);
  const currentFolder = useSelector(
    (state: any) => state.mainview.currentFolder
  );
  const [newTaskName, setNewTaskName] = useState("");

  const currentTaskList = getCurrentTaskList(
    props.folders,
    currentList,
    currentFolder
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskName(e.target.value);
  }
  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && newTaskName != "") {
      addTask({
        variables: {
          data: {
            name: newTaskName,
            list: parseInt(currentList),
          },
        },
      });
      setNewTaskName("");
    }
  }

  return (
    <div className={"taskViewContainer"}>
      <div className={"taskViewText"}>
        {" "}
        {currentTaskList && currentTaskList.name}{" "}
      </div>
      <InputGroup>
        <FormControl
          autoFocus
          placeholder="Add Task"
          value={newTaskName}
          onChange={handleChange}
          onKeyPress={handleSubmit}
        />
      </InputGroup>
      {currentTaskList &&
        currentTaskList.tasks.map((task) => {
          if (!task.isDeleted && !task.done) {
            return <TaskElement task={task} />;
          }
        })}
    </div>
  );
}
