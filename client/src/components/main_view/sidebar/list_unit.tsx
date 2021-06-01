import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import IList from "../../../models/client/list";
import { Trash, ListCheck } from "react-bootstrap-icons";
import { Ieditlist } from "../../wrappers/main_view_wrapper";
import { Nav, Container, Col, Row } from "react-bootstrap";

interface Props extends RouteComponentProps {
  list: IList;
  folderId: string;
  changeListView: any;
  editList: Ieditlist;
  noDelete: boolean;
}

interface State {
  hover: boolean;
}

class ListUnit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.changeHover = this.changeHover.bind(this);
  }
  static defaultProps = {
    noDelete: false,
  };
  changeHover(state: boolean) {
    this.setState({ hover: state });
  }
  render() {
    return (
      !this.props.list.isDeleted && (
        <Container>
          <Row>
            <Nav.Link
              onMouseEnter={() => this.changeHover(true)}
              onMouseLeave={() => this.changeHover(false)}
            >
              <div
                onClick={() =>
                  this.props.changeListView({
                    list_id: this.props.list._id,
                    folder_id: this.props.folderId,
                  })
                }
              >
                <Col>
                  <ListCheck />
                </Col>
                <Col>{this.props.list.name}</Col>
                <Col>
                  {this.state.hover && !this.props.noDelete && (
                    <Trash
                      onClick={() =>
                        this.props.editList("delete", {
                          listId: this.props.list._id,
                          folderId: this.props.folderId,
                        })
                      }
                    />
                  )}
                </Col>
              </div>
            </Nav.Link>
          </Row>
        </Container>
      )
    );
  }
}

export default withRouter(
  connect(null, { changeListView })(ListUnit),
);
