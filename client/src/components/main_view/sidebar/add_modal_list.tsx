import React, { Component, useEffect, useState } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
// import { Ieditlist } from "../../wrappers/main_view_wrapper";
import { useMutation } from "@apollo/client";
import { CreateListDocument } from "../../../generated";

interface Props extends RouteComponentProps {
  modalShow: boolean;
  folderId: string;
  closeModal: () => void;
}

function AddModalListFunctional(props: Props) {
  const [addList, { data, loading, error }] = useMutation(
    CreateListDocument,
  );
  const [modalShow, setModalShow] = useState(props.modalShow);
  const [newItemName, setNewItemName] = useState("");
  const myRef = React.createRef<HTMLInputElement>();
  function focus() {
    const node = myRef.current;
    node?.focus();
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
    addList({
      variables: {
        data: {
          name: newItemName,
          folder: parseInt(props.folderId),
        },
      },
    });
    // this.props.editList("add", {
    //   name: this.state.newItemName,
    //   folderId: this.props.folderId,
    // });
    setNewItemName("");
    setTimeout(() => {
      closeModal();
    }, 1);
  }
  function closeModal() {
    setModalShow(false);
    props.closeModal();
  }
  return (
    <Modal show={props.modalShow} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Please enter list name</Modal.Title>
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
          Create List
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withRouter(AddModalListFunctional);
