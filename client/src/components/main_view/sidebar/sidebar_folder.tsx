import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Accordion, Card, Button } from "react-bootstrap";
import IFolder from "../../../models/client/folder";

interface Props extends RouteComponentProps {
  folder: IFolder;
}
interface State {}
//folder and list props passed into it
//folder will be created and lists will be passed into another list
class SidebarFolder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    const { folder } = this.props;
    return (
      <Accordion key={folder._id} defaultActiveKey={folder._id}>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={folder._id}>
              {folder.name}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={folder._id}>
            <Card.Body>description of tab</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}
export default withRouter(SidebarFolder);
