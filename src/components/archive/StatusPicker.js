import React from "react";
import Button from "react-bootstrap/Button";


export default function StatusPicker(props) {
    return (
            <Button className="mt-1" variant="danger" onClick={props.onSubmit}>Filter by uncompleted tasks</Button>

    )
}