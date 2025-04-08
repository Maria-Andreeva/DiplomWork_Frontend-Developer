import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookingPage.module.css';
import { useMeetings } from '../../hooks/useMeetings';

const BookingPage = () => {
    const { createMeeting } = useMeetings();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !date || !time) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        try {
            await createMeeting({ title, date, time, comment });
            alert('Встреча добавлена!');
            navigate('/');
        } catch (error) {
            console.error('Ошибка при добавлении встречи:', error);
            alert('Ошибка при добавлении встречи');
        }
    };

    return (
        <div className={styles.bookingContainer}>
            <h2 className={styles.bookingTitle}>Бронирование встречи</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="title">Название встречи</label>
                    <input
                        type="text"
                        id="title"
                        className={styles.inputField}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="date">Дата встречи</label>
                    <input
                        type="date"
                        id="date"
                        className={styles.inputField}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="time">Время встречи</label>
                    <input
                        type="time"
                        id="time"
                        className={styles.inputField}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="comment">Комментарий</label>
                    <input
                        type="text"
                        id="comment"
                        className={styles.inputField}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Забронировать</button>
            </form>
        </div>
    );
};

export default BookingPage;
