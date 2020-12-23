import React, { useState, useEffect } from "react";
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function CompleteTaskPopup(props) {

    const [completer, setCompleter] = useState(Object.assign({}, props?.selectedTask?.completer ?? {
        name: "",
        grade: ""
    }));

    useEffect(() => {
        console.log("Popup");
    },[])

    const onInputChange = e => {
        setCompleter({ ...completer, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        let completerDoctor = JSON.parse(JSON.stringify(completer));
        await axios.post(`https://handoverapp.herokuapp.com/api/tasks/${props.selectedTask.id}/complete`, completerDoctor);
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

                <input
                    style={{ maxWidth: 120 }}
                    type="text"
                    className="form-control mr-1"
                    placeholder="Your name"
                    name="name"
                    value={completer.name}
                    onChange={e => onInputChange(e)}
                />
                <input
                    style={{ maxWidth: 120 }}
                    type="text"
                    className="form-control mr-1"
                    placeholder="Your grade"
                    name="grade"
                    value={completer.grade}
                    onChange={e => onInputChange(e)}
                />


            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={onSubmit}>Complete</Button>
            </Modal.Footer>
        </Modal>
    );
}




