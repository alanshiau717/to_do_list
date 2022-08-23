import React, { Component, useEffect, useState } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
// import { Ieditfolder } from "../../wrappers/main_view_wrapper";
import { CreateFolderDocument, GetFoldersDocument } from "../../../generated";
import { useMutation } from "@apollo/client";
import {useDispatch} from "react-redux";
import {closeModal} from "../../../redux/reducers/modalSlice";
interface Props extends RouteComponentProps {
  modalShow: boolean;
  closeModal: () => void;
}
interface State {
  modalShow: boolean;
  newItemName: string;
}

function AddModalFolderFunctional(props: Props) {
  const [addFolder, { data, loading, error }] = useMutation(
    CreateFolderDocument,
    {
      refetchQueries: [GetFoldersDocument],
    },
  );
  const [modalShow, setModalShow] = useState(props.modalShow);
  const [newItemName, setNewItemName] = useState("");
  const myRef = React.createRef<HTMLInputElement>();
  function focus() {
    const node = myRef.current;
    node?.focus();
    // this.state.textInput.current.focus();
  }
  useEffect(() => {
    setTimeout(() => {
      focus();
    }, 1);
  }, [modalShow]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewItemName(e.target.value);
  }
  function handleSubmit() {
    addFolder({ variables: { data: { name: newItemName } } });
    setNewItemName("");
    closeModal();
  }
  function closeModal() {
    setModalShow(false);
    props.closeModal();
  }

  return (
    <Modal show={props.modalShow} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Please enter folder name</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              ref={myRef}
              placeholder="Enter Folder Name"
              value={newItemName}
              onChange={handleChange}
              onKeyPress={(
                e: React.KeyboardEvent<HTMLInputElement>,
              ) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeModal()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Create Folder
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export function GlobalAddFolderModal() {
  const [addFolder, { data, loading, error }] = useMutation(
      CreateFolderDocument,
      {
        refetchQueries: [GetFoldersDocument],
      },
  );
  const dispatch = useDispatch()
  // const [modalShow, setModalShow] = useState(props.modalShow);
  const [newItemName, setNewItemName] = useState("");
  const myRef = React.createRef<HTMLInputElement>();
  function focus() {
    const node = myRef.current;
    node?.focus();
    // this.state.textInput.current.focus();
  }
  // useEffect(() => {
  //   setTimeout(() => {
  //     focus();
  //   }, 1);
  // }, [modalShow]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewItemName(e.target.value);
  }
  function handleSubmit() {
    addFolder({ variables: { data: { name: newItemName } } });
    setNewItemName("");
    dispatch(closeModal())
    // closeModal();
  }
  // function closeModal() {
  //   setModalShow(false);
  //   props.closeModal();
  // }

  return (
      <div>
        <Modal.Header>
          <Modal.Title>
            Add Folder
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                  autoFocus
                  ref={myRef}
                  placeholder="Enter Folder Name"
                  value={newItemName}
                  onChange={handleChange}
                  onKeyPress={(
                      e: React.KeyboardEvent<HTMLInputElement>,
                  ) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Create Folder
          </Button>
        </Modal.Footer>
      </div>


  );
}


export default withRouter(AddModalFolderFunctional);
