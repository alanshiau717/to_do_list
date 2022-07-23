import {GetFoldersDocument, GetFoldersQuery, ModifyFolderDocument} from "../../../generated";
import {useMutation} from "@apollo/client";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../../redux/reducers/modalSlice";
import {Button, Form, Modal} from "react-bootstrap";

export interface EditFolderModalProps {
    folder: GetFoldersQuery["folders"][0]
}
export function EditFolderModal(props: EditFolderModalProps) {
    const [editfolder, {data, loading,error}] = useMutation(
        ModifyFolderDocument,
        {
            refetchQueries: [GetFoldersDocument]
        }
    )
    const [folderName, setfolderName] = useState(props.folder.name)
    const myRef = React.createRef<HTMLInputElement>();
    const dispatch = useDispatch()
    function focus() {
        const node = myRef.current;
        node?.focus();
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setfolderName(e.target.value);
    }
    function handleSubmit() {
        editfolder({
            variables: {
                data: {
                    id: parseInt(props.folder._id),
                    name: folderName,
                },
            },
        });
        dispatch(closeModal())
        setTimeout(() => {
        }, 1);
    }

    return (
        <div>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            autoFocus
                            ref={myRef}
                            placeholder="Enter folder Name"
                            value={folderName}
                            onChange={handleChange}
                            onKeyPress={(
                                e: React.KeyboardEvent<HTMLInputElement>,
                            ) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSubmit();
                                }
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/*<Button variant="secondary" onClick={() => closeModal()}>*/}
                {/*  Close*/}
                {/*</Button>*/}
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Create folder
                </Button>
            </Modal.Footer>
        </div>
    )
}