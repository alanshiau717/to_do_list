import { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changeListView } from "../../../redux/reducers/mainViewSlice";
import UserAccessService from "../../../services/user.access";
import { Trash, ListCheck } from "react-bootstrap-icons";
import { Nav } from "react-bootstrap";
import {
  GetFoldersDocument,
  GetFoldersQuery,
  ModifyListDocument,
} from "../../../generated";
import { useMutation } from "@apollo/client";
interface Props extends RouteComponentProps {
  list: GetFoldersQuery["folders"][0]["lists"][0];
  folderId: string;
  noDelete: boolean;
}

export function ListUnitFunctional(props: Props) {
  const [hover, setHover] = useState(false);
  const [userDetails, setUserDetails] = useState(
    UserAccessService.getCurrentUser(),
  );

  const currentList = useSelector(
    (state: any) => state.mainview.currentList,
  );
  const [modifyList, { data, loading, error }] = useMutation(
    ModifyListDocument,
    {
      refetchQueries: [GetFoldersDocument],
    },
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
      <div>
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
            onClick={() =>
              dispatch(
                changeListView({
                  list_id: props.list._id,
                  folder_id: props.folderId,
                  test: "list unit on click",
                }),
              )
            }
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
            onClick={() =>
              dispatch(
                changeListView({
                  list_id: props.list._id,
                  folder_id: props.folderId,
                  test: "list unit on click",
                }),
              )
            }
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
                onClick={() => {
                  modifyList({
                    variables: {
                      data: {
                        id: parseInt(props.list._id),
                        isDeleted: true,
                      },
                    },
                  });
                  console.log(props.list._id, currentList);
                  if (props.list._id === currentList) {
                    console.log("changing list view");
                    console.log(
                      userDetails.inbox.toString(),
                      userDetails.defaultFolder.toString(),
                    );
                    dispatch(
                      changeListView({
                        list_id: userDetails.inbox.toString(),
                        folder_id:
                          userDetails.defaultFolder.toString(),
                        test: "list unit after deleting",
                      }),
                    );
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </Nav.Link>
  );
}

export default withRouter(ListUnitFunctional);
