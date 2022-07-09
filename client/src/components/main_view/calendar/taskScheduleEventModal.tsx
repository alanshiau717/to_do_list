import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
interface Props extends RouteComponentProps {
  modalShow: boolean;
  closeModal: () => void;
}
function TaskScheduleEventModal(props: Props) {
  const [modalShow, setModalShow] = useState(props.modalShow);
  const myRef = React.createRef<HTMLInputElement>();
  useEffect(() => {
    setTimeout(() => {
      const node = myRef.current;
      node?.focus();
    }, 1);
  }, [modalShow, myRef]);
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
              //   value={newItemName}
              //   onChange={handleChange}
              onKeyPress={(
                e: React.KeyboardEvent<HTMLInputElement>,
              ) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  //   handleSubmit();
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
        {/* <Button variant="primary" onClick={() => handleSubmit()}>
          Create Folder
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default withRouter(TaskScheduleEventModal);
