import React from 'react';
import styles from '../../styles/Calendar.module.css';
import CalendarComponent from "../../components/CalendarComponent";
import {useMeetings} from "../../hooks/useMeetings";

const CalendarPage = ({ events, onEdit, onDelete }) => {

    const eventList = Array.isArray(events) ? events : [];
    const { meetings } = useMeetings();

    return (
        <div className={styles.calendarPageContainer}>
            <div className={styles.calendarWrapper}>
                <CalendarComponent events={meetings}/>
            </div>
        </div>

    );
};

export default CalendarPage;
