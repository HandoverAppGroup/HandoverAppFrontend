import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function CompleteTaskPopup(props) {

    const [completer, setCompleter] = useState({
        name: "",
        grade: ""
    });

    useEffect(() => {
        console.log("Popup");
    }, [])

    const onInputChange = e => {
        setCompleter({ ...completer, [e.target.name]: e.target.value });
    }

    // Set completer: post request
    const onSubmit = async e => {
        e.preventDefault();
        let completerDoctor = JSON.parse(JSON.stringify(completer));
        await axios.post(`/api/tasks/${props.selectedTask.id}/complete`, completerDoctor);
        props.onDataChange();
        props.onHide();
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Complete Task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Your name"
                        name="name"
                        value={completer.name}
                        onChange={e => onInputChange(e)}
                    />
                    <input
                        type="text"
                        className="form-control mt-2"
                        placeholder="Your grade"
                        name="grade"
                        value={completer.grade}
                        onChange={e => onInputChange(e)}
                    />
                    <button type="submit" className="btn btn-primary mt-2">Complete task</button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}




