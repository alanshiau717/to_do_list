import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Accordion, Card, Button, ListGroup } from "react-bootstrap";
import { changeListView } from "../../../redux/reducers/mainViewSlice"
import { connect } from "react-redux"
import IFolder from "../../../models/client/folder";


interface Props extends RouteComponentProps {
  folder: IFolder;
  changeListView: any
}
interface State { }
//folder and list props passed into it
//folder will be created and lists will be passed into another list
class SidebarFolder extends Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);
  // }

  changeListViewHandler(listid: string, folderid: string) {
    var payload = {
      list_id: listid,
      folder_id: folderid
    }
    this.props.changeListView(payload)
  }
  componentDidMount() { }
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
            {/* <Card.Body> */}
            <ListGroup>
              {folder.lists.map((list) => {
                return (<ListGroup.Item key={list._id}>
                  <button onClick={() => this.changeListViewHandler(list._id, folder._id)}>{list.name}</button >
                </ListGroup.Item>)
              })}
            </ListGroup>
            {/* </Card.Body> */}
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}


export default withRouter(connect(null, { changeListView })(SidebarFolder))