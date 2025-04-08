import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-modal';
import styles from '../styles/Calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = ({ events }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <div>
            <div className={styles.calendarContainer}>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="100%"
                    contentHeight="auto"
                    eventClick={handleEventClick}
                />
            </div>

            {isModalOpen && selectedEvent && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Информация о событии"
                    className={styles.modal}
                    overlayClassName={styles.overlay}
                    ariaHideApp={false}
                >
                    <h2>{selectedEvent.title}</h2>
                    <p><strong>Дата:</strong> {selectedEvent.start.toLocaleDateString()}</p>
                    <p><strong>Время:</strong> {selectedEvent.extendedProps.time}</p>
                    <p><strong>Комментарий:</strong> {selectedEvent.extendedProps.comment || 'Нет описания'}</p>
                    <div className={styles.modalButtons}>
                        <button onClick={closeModal} className={styles.closeBtn}>Закрыть</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CalendarComponent;
