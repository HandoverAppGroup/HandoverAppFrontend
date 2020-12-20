import React, { useRef, useEffect, useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

export default function EditTask(props) {
  let history = useHistory();
  const textAreaRef = useRef(null);
  // Optional chaining as any of these nested properties may be null
  const [task, setTask] = useState(Object.assign({}, props?.location?.selectedTask ?? {
    description: "",
    gradeRequired: "",
    patientMrn: "",
    patientClinicalSummary: "",
    patientLocation: ""
  }));

  const [creator, setCreator] = useState(Object.assign({}, props?.location?.selectedTask?.creator ?? {
    name: "",
    grade: ""
  }));

  const [completer, setCompleter] = useState(Object.assign({}, props?.location?.selectedTask?.completer ?? {
    name: "",
    grade: ""
  }));

  const onInputChange = e => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onCreatorInfoChange = e => {
    setCreator({ ...creator, [e.target.name]: e.target.value });
  }

  const onCompleterInfoChange = e => {
    setCompleter({ ...completer, [e.target.name]: e.target.value });
  }

  const onSubmit = async e => {
    e.preventDefault();
    let taskToPost = JSON.parse(JSON.stringify(task));
    taskToPost.creator = creator;
    // Need to set completor also
    taskToPost.completer = completer;
    // Set completed is true if completer name is set to a value - this means API will allow us to set a completer
    if (taskToPost.completer.name) {
      taskToPost.completed = true
    }
    console.log(taskToPost);
    await axios.put(`https://handoverapp.herokuapp.com/api/tasks/${props.match.params.id}`, taskToPost);
    history.push("/");
  };

  useEffect(() => {
    // This happens if the page is force reloaded and so it loses the props
    // In this case we need to get the task from the API again
    if (!task.id && props.match.params.id) {
      loadTask(props.match.params.id);
    }
  }, [task.id, props.match.params.id]);

  const loadTask = async (id) => {
    const result = await axios.get(`https://handoverapp.herokuapp.com/api/tasks/${id}`);
    setTask(result.data);
  };

  const deleteTask = async () => {
    await axios.delete(`https://handoverapp.herokuapp.com/api/tasks/${props.match.params.id}`);
    history.goBack();
    alert('Task successfully deleted!');
  };

  const copyCodeToClipboard = e => {
    e.preventDefault();
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    alert("Task description copied to clipboard!");
  };

  return (
    <div className="container mt-3">
      <div className="w-75 mx-auto shadow p-5 py-4">
        <h2 className="text-center mb-4">Edit task</h2>
        <form className="mb-2" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
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
            <h5> Task Description
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
            <h5> Creator's name
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Creator's name"
                name="name"
                value={creator.name}
                onChange={e => onCreatorInfoChange(e)}
              />
            </h5>
          </div>
          <div className="form-group">
            <h5> Creator's grade
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Creator's grade"
                name="grade"
                value={creator.grade}
                onChange={e => onCreatorInfoChange(e)}
              />
            </h5>
          </div>
          <div className="form-group">
            <h5> Nightshift Completer's name
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nightshift Completer's name"
                name="name"
                value={completer.name}
                onChange={e => onCompleterInfoChange(e)}
              />
            </h5>
          </div>
          <div className="form-group">
            <h5> Nightshift Completer's grade
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nightshift Completer's grade"
                name="grade"
                value={completer.grade}
                onChange={e => onCompleterInfoChange(e)}
              />
            </h5>
          </div>
          <h3> Full description of task:</h3>
          <button variant="secondary" onClick={copyCodeToClipboard}>Copy to Clipboard</button>
          <textarea rows="7" cols="90" ref={textAreaRef} value={
            'Patient MRN: ' + task.patientMrn
            +'\nPatient clinical summary: '+ task.patientClinicalSummary
          +'\nPatient location: '+ task.patientLocation
          +'\nThe task consists of: '+ task.description
          +'\nThe required grade is: '+ task.gradeRequired
          +'\nThis task was created by '+ task.creator.name +' whose grade is '+ task.creator.grade+'.'
            +(task.completer?.name ? '\nThis task was created by '+ task.completer.name :'')
            +(task.completer?.grade ? ' whose grade is '+ task.completer.grade+'.':'')}
          />


          <button type="submit" className="btn btn-primary btn-block">Update this task</button>
        </form>
        <button className="btn btn-warning btn-block" onClick={() => { history.push("/") }}>Cancel</button>
        <button className="btn btn-danger btn-block" onClick={e => window.confirm('This task is about to be deleted') ? deleteTask() : e.preventDefault()}>Delete</button>
      </div>
    </div>
  );
}




