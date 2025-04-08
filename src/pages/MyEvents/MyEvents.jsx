import React, { useState, useMemo } from 'react';
import { useMeetings } from '../../hooks/useMeetings';
import styles from './MyEvents.module.css';
import { format, addDays, isWithinInterval } from 'date-fns';
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const filterOptions = [
    { label: 'Сегодня', value: 0 },
    { label: '3 дня', value: 2 },
    { label: '1 неделя', value: 6 },
    { label: '1 месяц', value: 29 },
    { label: 'Все', value: 'all' }
];

const MyEvents = () => {
    const { meetings, updateMeeting, deleteMeetingById, loading } = useMeetings();
    const [filter, setFilter] = useState('all');
    const [view, setView] = useState('upcoming');
    const navigate = useNavigate();

    const now = new Date();

    const filteredUpcomingMeetings = useMemo(() => {
        if (filter === 'all') {
            return meetings.filter((m) => new Date(m.date + " " + m.time) >= now).sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time));
        }
        const futureDate = addDays(now, Number(filter)).setHours(23, 59, 59);
        return meetings.filter((m) =>
            isWithinInterval(new Date(m.date + " " + m.time), { start: now, end: futureDate })
        ).sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time));
    }, [filter, meetings]);

    const filteredPastMeetings = useMemo(() => {
        return meetings.filter((m) => (new Date(m.date + " " + m.time)) < now).sort((a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time));
    }, [meetings]);

    const handleCreate = () => {
        navigate('/booking');
    };

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editMeeting, setEditMeeting] = useState(null);
    const [editDate, setEditDate] = useState(new Date());
    const [editTitle, setEditTitle] = useState('');
    const [editTime, setEditTime] = useState('');
    const [editComment, setEditComment] = useState('');

    const openEditModal = (meeting) => {
        setEditMeeting(meeting);
        setEditTitle(meeting.title);
        setEditDate(new Date(meeting.date + " " + meeting.time));
        setEditTime(meeting.time);
        setEditModalOpen(true);
        setEditComment(meeting.comment);
    };

    const handleEdit = async () => {
        if (!editMeeting) return;

        const formattedDate = format(editDate, 'yyyy-MM-dd');
        await updateMeeting(editMeeting.id, {
            title: editTitle,
            date: formattedDate,
            time: editTime,
            comment: editComment,
        });
        setEditModalOpen(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Удалить встречу?')) {
            await deleteMeetingById(id);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Мои события</h2>

            <div className={styles.viewTabs}>
                <button
                    onClick={() => setView('upcoming')}
                    className={`${styles.viewTab} ${view === 'upcoming' ? styles.active : ''}`}
                >
                    Предстоящие
                </button>
                <button
                    onClick={() => setView('past')}
                    className={`${styles.viewTab} ${view === 'past' ? styles.active : ''}`}
                >
                    Прошедшие
                </button>
            </div>

            {view === 'upcoming' && (
                <>
                    <div className={styles.controls}>
                        {filterOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => setFilter(opt.value)}
                                className={`${styles.filterBtn} ${filter === opt.value ? styles.active : ''}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                        <button className={styles.addBtn} onClick={handleCreate}>
                            + Добавить встречу
                        </button>
                    </div>

                    {loading ? (
                        <div className={styles.loader}>Загрузка...</div>
                    ) : (
                        <div className={styles.eventsGrid}>
                            {filteredUpcomingMeetings.map((event) => (
                                <div key={event.id} className={styles.eventCard}>
                                    <h3>{event.title}</h3>
                                    <p>
                                        {format(new Date(event.date), 'dd.MM.yyyy')} в {event.time}
                                    </p>
                                    <textarea
                                        className={styles.commentBox}
                                        placeholder="Комментарий..."
                                        value={event.comment || ''}
                                        disabled
                                    />
                                    <div className={styles.buttons}>
                                        <button onClick={() => openEditModal(event)} className={styles.editBtn}>Редактировать</button>
                                        <button onClick={() => handleDelete(event.id)} className={styles.deleteBtn}>Удалить</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {view === 'past' && (
                <div className={styles.eventsGrid}>
                    {filteredPastMeetings.map((event) => (
                        <div key={event.id} className={styles.eventCard}>
                            <h3>{event.title}</h3>
                            <p>
                                {format(new Date(event.date), 'dd.MM.yyyy')} в {event.time}
                            </p>
                            <textarea
                                className={styles.commentBox}
                                placeholder="Комментарий..."
                                value={event.comment || ''}
                                disabled
                            />
                            <div className={styles.buttons}>
                                <button onClick={() => handleDelete(event.id)} className={styles.deleteBtn}>Удалить</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={editModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
                contentLabel="Редактировать встречу"
                className={styles.modal}
                overlayClassName={styles.overlay}
                ariaHideApp={false}
            >
                <h2>Редактировать встречу</h2>

                <div className={styles.inputGroup}>
                    <label>Название</label>
                    <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Дата</label>
                    <DatePicker
                        selected={editDate}
                        onChange={(date) => setEditDate(date)}
                        dateFormat="yyyy-MM-dd"
                        showMonthYearDropdown
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Время</label>
                    <input
                        type="time"
                        value={editTime}
                        onChange={(e) => setEditTime(e.target.value)}
                        className={styles.inputField}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Комментарий</label>
                    <textarea
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        className={styles.textareaField}
                        placeholder="Введите комментарий..."
                    />
                </div>

                <div className={styles.modalButtons}>
                    <button onClick={handleEdit} className={styles.button}>
                        Сохранить
                    </button>
                    <button onClick={() => setEditModalOpen(false)} className={styles.button}>
                        Отмена
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default MyEvents;
