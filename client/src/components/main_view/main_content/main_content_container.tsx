import { Component, useState } from "react";
import { Container } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import IFolder from "../../../models/client/folder";
import SidebarList from "./main_content_list";
// import { Iedittask } from "../../wrappers/main_view_wrapper";
import {
  CreateTaskDocument,
  GetFoldersDocument,
  GetFoldersQuery,
} from "../../../generated";
import { useMutation } from "@apollo/client";

interface Props extends RouteComponentProps {
  folders: GetFoldersQuery["folders"];
}

function SidebarListContainerFunctional(props: Props) {
  const [addTask, { data, loading, error }] = useMutation(
    CreateTaskDocument,
    {
      refetchQueries: [GetFoldersDocument],
    },
  );
  const currentList = useSelector(
    (state: any) => state.mainview.currentList,
  );
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskName(e.target.value);
  }
  function handleSubmit(e: React.FormEvent) {
    addTask({
      variables: {
        data: {
          name: newTaskName,
          list: parseInt(currentList),
        },
      },
    });
    e.preventDefault();
  }
  function toggleAddTask() {
    if (showAddTask === false) {
      setShowAddTask(true);
    } else {
      setShowAddTask(false);
    }
  }
  return (
    <Container style={{ padding: "10px" }}>
      {props.folders.map((folder) => {
        return folder.lists.map((list) => {
          return list._id === currentList ? (
            <SidebarList
              key={list._id}
              list={list}
            />
          ) : null;
        });
      })}
    </Container>
  );
}

export default withRouter(SidebarListContainerFunctional);
