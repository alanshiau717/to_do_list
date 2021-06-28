import React, { Component } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { Ieditlist } from "../../wrappers/main_view_wrapper";

interface Props extends RouteComponentProps {
  editList: Ieditlist;
  modalShow: boolean;
  folderId: string;
  closeModal: () => void;
}
interface State {
  modalShow: boolean;
  newItemName: string;
}

class AddModalList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalShow: this.props.modalShow,
      newItemName: "",
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  private myRef = React.createRef<HTMLInputElement>();
  focus() {
    const node = this.myRef.current;
    node?.focus();
  }
  componentWillReceiveProps(nextProps: Props) {
    this.setState({ modalShow: nextProps.modalShow });
    setTimeout(() => {
      this.focus();
    }, 1);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      newItemName: e.target.value,
    });
  }
  handleSubmit() {
    this.props.editList("add", {
      name: this.state.newItemName,
      folderId: this.props.folderId,
    });
    this.setState({
      newItemName: "",
    });
    setTimeout(() => {
      this.closeModal();
    }, 1);
  }
  openModal(item: "folder" | "list") {
    this.setState({
      modalShow: true,
    });
  }
  closeModal() {
    this.setState({
      modalShow: false,
    });
    this.props.closeModal();
  }
  render() {
    return (
      <Modal show={this.state.modalShow} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Please enter list name</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                ref={this.myRef}
                placeholder="Enter Folder Name"
                value={this.state.newItemName}
                onChange={this.handleChange}
                onKeyPress={(
                  e: React.KeyboardEvent<HTMLInputElement>,
                ) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleSubmit();
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => this.closeModal()}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => this.handleSubmit()}
          >
            Create List
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(AddModalList);
