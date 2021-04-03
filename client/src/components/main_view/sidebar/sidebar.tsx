import React, { Component } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
interface Props {}
interface State {}

//This component is a skeleton for the sidebart
//Will take data regarding folders and lists and pass them to children props
//which will render the folders and lists
export default class SideBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const test = ["Folder 1", "Folder 2", "Folder 3"];
    return (
      <div>
        {test.map((tab) => (
          <Accordion key={tab} defaultActiveKey={tab}>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={tab}>
                  {tab}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={tab}>
                <Card.Body>description of tab</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </div>
    );
  }
}
