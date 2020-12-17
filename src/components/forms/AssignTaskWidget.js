import React, { useState } from "react";
import axios from 'axios';

export default function AssignTaskWidget(props) {

    const [plannedCompleter, setPlannedCompleter] = useState(Object.assign({}, props?.selectedTask?.plannedCompleter ?? {
        name: "",
        grade: ""
    }));

    const onInputChange = e => {
        setPlannedCompleter({ ...plannedCompleter, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        e.preventDefault();
        if (props.selectedTask.id) {
            let plannedCompleterDoctor = JSON.parse(JSON.stringify(plannedCompleter));
            await axios.post(`https://handoverapp.herokuapp.com/api/tasks/${props.selectedTask.id}/claim`, plannedCompleterDoctor);
        }
    };

    return (
        <div style={{minWidth: 150}}>
            <form className="form-inline" onSubmit={onSubmit}>
                <div className="form-group row">
                    <div className="col-xs-1">
                        <input
                            style={{maxWidth: 120}}
                            type="text"
                            className="form-control mr-1"
                            placeholder="Claim task"
                            name="name"
                            value={plannedCompleter.name}
                            onChange={e => onInputChange(e)}
                        />
                    </div>
                    <div className="col-xs-1">
                        <button type="submit" className="btn btn-primary"><span>&#10003;</span></button>
                    </div>
                </div>
            </form>
        </div>
    );
}




