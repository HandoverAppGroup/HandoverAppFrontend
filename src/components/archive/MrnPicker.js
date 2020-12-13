import React from "react";
import Button from "react-bootstrap/Button";


// A custom component to allow user to type in an MRN
export default function MrnPicker(props) {
    return (
        <form className="mt-3">
            <div className="form-group">
                <label className="mr-2">Enter Patient MRN</label>
                <input
                    name="mrn"
                    value={props.query}
                    type="text"
                    placeholder="MRN"
                    onChange={props.onQueryChange}
                />
            </div>
            <Button className="mt-1" variant="danger" onClick={props.onSubmit}>Search</Button>
        </form>
    )
}