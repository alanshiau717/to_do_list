import React, { Component, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect, useDispatch } from "react-redux";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import IList from "../../../models/client/list";
import { Trash, ListCheck } from "react-bootstrap-icons";
import { Nav } from "react-bootstrap";
import {
  GetFoldersQuery,
  ModifyListDocument,
} from "../../../generated";
import { render } from "@testing-library/react";
import { useMutation } from "@apollo/client";
interface Props extends RouteComponentProps {
  list: GetFoldersQuery["folders"][0]["lists"][0];
  folderId: string;
  // changeListView: any;
  // editList: Ieditlist;
  noDelete: boolean;
}

export function ListUnitFunctional(props: Props) {
  const [hover, setHover] = useState(false);
  const [modifyList, { data, loading, error }] = useMutation(
    ModifyListDocument,
  );
  const dispatch = useDispatch();
  function changeHover(state: boolean) {
    setHover(state);
  }
  return (
    <Nav.Link
      onMouseEnter={() => changeHover(true)}
      onMouseLeave={() => changeHover(false)}
      style={{ padding: "0px" }}
    >
      <div
        onClick={
          () =>
            dispatch(
              changeListView({
                list_id: props.list._id,
                folder_id: props.folderId,
              }),
            )
          // props.changeListView({
          //   list_id: props.list._id,
          //   folder_id: props.folderId,
          // })
        }
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "30px auto 30px",
          }}
        >
          <div
            style={{
              gridColumn: "1 / 2",
            }}
          >
            <ListCheck />
          </div>
          <div
            style={{
              gridColumn: "2 / 3",
              justifySelf: "start",
              maxWidth: "100%",
            }}
            className="text-truncate"
          >
            {props.list.name}
          </div>
          {hover && !props.noDelete && (
            <div
              style={{
                gridColumn: "3 / 4",
              }}
            >
              <Trash
                onClick={
                  () => {
                    console.log("hit modifylist");
                    modifyList({
                      variables: {
                        data: {
                          id: parseInt(props.list._id),
                          isDeleted: true,
                        },
                      },
                    });
                  }
                  // this.props.editList("delete", {
                  //   listId: this.props.list._id,
                  //   folderId: this.props.folderId,
                  // })
                }
              />
            </div>
          )}
        </div>
      </div>
    </Nav.Link>
  );
}

// export default withRouter(
//   connect(null, { changeListView })(ListUnit),
// );
export default withRouter(ListUnitFunctional);
