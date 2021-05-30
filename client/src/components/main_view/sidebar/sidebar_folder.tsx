import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Accordion, Card, Button, ListGroup } from "react-bootstrap";
import { changeListView } from "../../../redux/reducers/mainViewSlice"
import { connect } from "react-redux"
import IFolder from "../../../models/client/folder";
import {Trash} from 'react-bootstrap-icons'
import {Ieditfolder, Ieditlist} from '../../wrappers/main_view_wrapper'
import ListUnit from "./list_unit"


interface Props extends RouteComponentProps {
  folder: IFolder;
  changeListView: any,
  editFolder: Ieditfolder
  editList: Ieditlist
}
interface State { 
  hover: boolean
}
//folder and list props passed into it
//folder will be created and lists will be passed into another list
class SidebarFolder extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  changeListViewHandler(listid: string, folderid: string) {
    var payload = {
      list_id: listid,
      folder_id: folderid
    }

    this.props.changeListView(payload)
  }
  changeHover(state: boolean){
      this.setState({hover: state})
  }
  componentDidMount() { }
  render() {
    const { folder } = this.props;
    return (
      <Accordion key={folder._id} defaultActiveKey={folder._id} onMouseLeave={()=> this.changeHover(false)}onMouseEnter={() => this.changeHover(true)}>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={folder._id}>
              {folder.name} 
            </Accordion.Toggle>
            {this.state.hover && <Trash onClick = {() => {this.props.editFolder('delete', this.props.folder._id)}}/>}
          </Card.Header>
          <Accordion.Collapse eventKey={folder._id}>
            {/* <Card.Body> */}
            <ListGroup>
              {folder.lists.map((list) => {
                return (<ListGroup.Item key={list._id}>
                  {/* <button onClick={() => this.changeListViewHandler(list._id, folder._id)}>{list.name}</button > */}
                  <ListUnit list={list} folderId={folder._id} editList={this.props.editList}/>
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