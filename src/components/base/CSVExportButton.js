import React, { useState, useEffect } from "react";
import moment from 'moment'
import { CSVLink } from 'react-csv';

export default function CSVExportButton(props) {

    const [CSVdata, setCSVdata] = useState('');

    function formatTaskForCSV(task) {
        let dcre = moment(task.dateCreated).format('LLL');
        let dcom = task.dateCompleted ? moment(task.dateCompleted).format('LLL') : "";
        let creName = task.creator?.name ?? ""
        let creGrade = task.creator?.grade ?? ""
        let compName = task.completer?.name ?? ""
        let compGrade = task.completer?.grade ?? ""
        let status = task.completed ? "Completed" : "Uncompleted"
        return {
            status: status,
            date_created: dcre,
            date_completed: dcom,
            description: task.description,
            grade_required: task.gradeRequired,
            patient_mrn: task.patientMrn,
            patient_clinical_summary: task.patientClinicalSummary,
            patient_location: task.patientLocation,
            creator_name: creName,
            creator_grade: creGrade,
            completer_name: compName,
            completer_grade: compGrade
        }
    }

    // Set the CSV data every time the filter is changed
    useEffect(() => {
        setCSVdata(props.tasks.map(t => formatTaskForCSV(t)));
    }, [props.tasks])

    return (
        <CSVLink data={CSVdata} filename={"tasks.csv"} className="btn btn-primary mt-2"> Export all as CSV </CSVLink>
    )
}