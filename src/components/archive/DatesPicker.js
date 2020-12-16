import React from "react";
import Button from "react-bootstrap/Button";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

// A custom component to allow user to pick 2 dates to filter between
export default function DatesPicker(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="column">Start Date <b>{moment(props.startDate).format('YYYY-MM-DD')}</b>
                    <Calendar
                        value={props.startDate}
                        onChange={props.onStartDateChange}
                    /></div>
                <div className="column">End Date <b>{moment(props.endDate).format('YYYY-MM-DD')}</b>
                    <Calendar
                        value={props.endDate}
                        onChange={props.onEndDateChange}
                    /></div></div>
            <Button variant="danger" className="mt-3" onClick={props.onSubmit}>Search</Button>
        </div>
    )
}