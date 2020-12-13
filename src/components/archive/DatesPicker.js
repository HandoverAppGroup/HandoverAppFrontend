import React from "react";
import Button from "react-bootstrap/Button";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

// A custom component to allow user to pick 2 dates to filter between
export default function DatesPicker(props) {
    return (
        <div className="container my-3">
            <p>Start Date <b>{moment(props.startDate).format('YYYY-MM-DD')}</b></p>
            <Calendar
                value={props.startDate}
                onChange={props.onStartDateChange}
            />
            <p className="my-3">End Date <b>{moment(props.endDate).format('YYYY-MM-DD')}</b></p>
            <Calendar
                value={props.endDate}
                onChange={props.onEndDateChange}
            />
            <Button variant="danger" className="mt-3" onClick={props.onSubmit}>Search</Button>
        </div>
    )
}