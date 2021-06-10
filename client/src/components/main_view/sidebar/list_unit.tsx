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
        <Nav.Link
          onMouseEnter={() => this.changeHover(true)}
          onMouseLeave={() => this.changeHover(false)}
          style={{ padding: "0px" }}
        >
          <div
            onClick={() =>
              this.props.changeListView({
                list_id: this.props.list._id,
                folder_id: this.props.folderId,
              })
            }
          >
            <div style={{ display: "inline" }}>
              <ListCheck />
              {this.props.list.name}
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
            </div>
            {/* <Container>
              <Row
                style={{
                  maxWidth: "100%",
                  minWidth: "100%",
                }}
              >
                <Col style={{ padding: "0px" }} md="auto">
                  <ListCheck />
                </Col>
                <Col>
                  <div
                    className="text-truncate"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    // style={{
                    //   display: "inline-block",
                    //   whiteSpace: "nowrap",
                    //   overflow: "hidden !important",
                    //   textOverflow: "ellipsis",
                    //   maxWidth: "10px",
                    // }}
                  >
                    {this.props.list.name}
                  </div>
                </Col>
                <Col className="ml-auto" md="auto">
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
              </Row>
            </Container> */}
          </div>
        </Nav.Link>
      )
    );
  }
}

export default withRouter(
  connect(null, { changeListView })(ListUnit),
);
