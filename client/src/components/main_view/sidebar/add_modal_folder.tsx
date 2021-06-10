import React, { Component } from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { Ieditfolder } from "../../wrappers/main_view_wrapper";
interface Props extends RouteComponentProps {
  editFolder: Ieditfolder;
  modalShow: boolean;
  closeModal: () => void;
}
interface State {
  modalShow: boolean;
  newItemName: string;
}

class AddModalFolder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalShow: this.props.modalShow,
      newItemName: "",
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.focus = this.focus.bind(this);
  }
  private myRef = React.createRef<HTMLInputElement>();
  focus() {
    const node = this.myRef.current;
    node?.focus();
    // this.state.textInput.current.focus();
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
    this.props.editFolder("add", this.state.newItemName);
    this.setState({
      newItemName: "",
    });
    this.closeModal();
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
          <Modal.Title>Please enter folder name</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.newItemName}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form> */}
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
            Create Folder
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default withRouter(AddModalFolder);
