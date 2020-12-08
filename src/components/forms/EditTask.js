import React, { useState } from "react";
import axios from "axios";

export default function EditTask(props) {
  const [task, setTask] = useState({
    description: null,
    gradeRequired: null,
    patientMrn: null,
    patientClinicalSummary: null,
    patientLocation: null,
    creator: {
      name: null,
      grade: null
    }
  });

  const onInputChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`https://handoverapp.herokuapp.com/api/tasks/${props.match.params.id}`, task);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Task</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Task description"
              name="Description"
              value={task.description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Grade required"
              name="Grade required"
              value={task.gradeRequired}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter the patient's clinical summary"
              name="Patient Clinical Summary"
              value={task.patientClinicalSummary}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the patient's location"
              name="Patient Location"
              value={task.patientLocation}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Your name"
              name="Name"
              value={task.creator.name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Your grade"
              name="Grade"
              value={task.creator.grade}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

