import React, {useState} from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

export default function AddTask() {
  let history = useHistory();
  const [task, setTask] = useState({
    description: "",
    gradeRequired: "",
    patientMrn: "",
    patientClinicalSummary: "",
    patientLocation: ""
  });

  const [creator, setCreator] = useState ({
    name: "",
    grade: ""
  });

  const onInputChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onCreatorInfoChange = e => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  }

  const onSubmit = async e => {
    e.preventDefault();
    let taskToPost = JSON.parse(JSON.stringify(task));
    taskToPost.creator = creator;
    console.log(taskToPost);
    await axios.post(`https://handoverapp.herokuapp.com/api/tasks`, taskToPost);
    history.push("/");
  };

  return (
    <div className="container mt-3">
      <div className="w-75 mx-auto shadow p-5 py-4">
        <h2 className="text-center mb-4">Add a new task</h2>
        <form className="mb-2" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <h5> MRN
              <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter the patient's MRN"
                  name="patientMrn"
                  value={task.patientMrn}
                  onChange={e => onInputChange(e)}
              />
            </h5>
          </div>
          <div className="form-group">
            <h5> Location
              <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter the patient's location"
                  name="patientLocation"
                  value={task.patientLocation}
                  onChange={e => onInputChange(e)}
              />
            </h5>
          </div>
          <div className="form-group">
            <h5> Task description
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Task description"
              name="description"
              value={task.description}
              onChange={e => onInputChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Grade required
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Grade required"
              name="gradeRequired"
              value={task.gradeRequired}
              onChange={e => onInputChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Clinical Summary
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter the patient's clinical summary"
              name="patientClinicalSummary"
              value={task.patientClinicalSummary}
              onChange={e => onInputChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Your Name
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Your name"
              name="name"
              value={creator.name}
              onChange={e => onCreatorInfoChange(e)}
            />
              </h5>
          </div>
          <div className="form-group">
            <h5> Your grade
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Your grade"
              name="grade"
              value={creator.grade}
              onChange={e => onCreatorInfoChange(e)}
            />
              </h5>
          </div>
          <button type="submit" className="btn btn-primary btn-block" >Add a new task</button>
        </form>
        <button className="btn btn-warning btn-block" onClick={() => {history.push("/")}}>Cancel</button>
      </div>
    </div>
  );
}