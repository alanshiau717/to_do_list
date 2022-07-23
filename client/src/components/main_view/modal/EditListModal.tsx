import {GetFoldersDocument, GetFoldersQuery, ModifyListDocument} from "../../../generated";
import {useMutation} from "@apollo/client";
import {Button, Form, Modal} from "react-bootstrap";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../../redux/reducers/modalSlice";

export interface EditListModalProps {
    list: GetFoldersQuery["folders"][0]["lists"][0]
}

export function EditListModal(props: EditListModalProps) {
    const [editList, {data, loading,error}] = useMutation(
        ModifyListDocument,
        {
            refetchQueries: [GetFoldersDocument]
        }
    )
    const [listName, setListName] = useState(props.list.name)
    const myRef = React.createRef<HTMLInputElement>();
    const dispatch = useDispatch()
    function focus() {
        const node = myRef.current;
        node?.focus();
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setListName(e.target.value);
    }
    function handleSubmit() {
        editList({
            variables: {
                data: {
                    id: parseInt(props.list._id),
                    name: listName,
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
                            placeholder="Enter List Name"
                            value={listName}
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
                    Create List
                </Button>
            </Modal.Footer>
        </div>
    )
}