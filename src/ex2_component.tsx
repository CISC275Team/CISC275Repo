//this will be a component for ex2 that allows the user to input things to add a degreeplan on the site
//it should essentially be form that the user fills out
import React from "react";
import { useState } from "react";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import { DegreePlan } from "./interfaces/degreeplan";
import { Course } from "./interfaces/course";
import { Semester } from "./interfaces/semester";

export function AddQuizModal({
    show,
    handleClose,
    addDp
}: {
    //takes the place of writing an interface
    show: boolean;
    handleClose: () => void;
    addDp: (title: string) => void;
}) {
    const [title, setTitle] = useState<string>("Example Title");

    const saveChanges = () => {
        addDp(title);
        handleClose();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Degree Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formQuizId">
                        <Form.Label>Title: </Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
