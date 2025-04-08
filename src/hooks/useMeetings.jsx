import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import {
    getMeetings,
    addMeeting,
    updateMeeting,
    deleteMeetingById
} from '../services/meetingService';

export const useMeetings = () => {
    const { user } = useAuthContext();
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coamingMeetings, setCoamingMeetings] = useState([]);

    useEffect(() => {
        if (!user) {
            console.log('Нет пользователя, встречи не запрашиваются.');
            return;
        }

        const fetchMeetings = async () => {
            try {
                setLoading(true);
                const data = await getMeetings(user.uid);
                setMeetings(data);
                setCoamingMeetings(data.filter(m => new Date(m.date + " " + m.time) >= new Date()));
            } catch (error) {
                console.error('Ошибка при получении встреч:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeetings();
    }, [user]);

    const createMeeting = async (meetingData) => {
        if (!user) return;

        try {
            const newMeeting = await addMeeting(user.uid, meetingData);
            setMeetings((prev) =>
                [...prev, newMeeting].sort(
                    (a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)
                )
            );
        } catch (error) {
            console.error('Ошибка при добавлении встречи:', error);
            throw error;
        }
    };

    const updateMeetingWrapper = async (id, updatedMeeting) => {
        if (!user) return;

        try {
            await updateMeeting(id, updatedMeeting);
            setMeetings((prev) =>
                prev.map((m) => (m.id === id ? { ...m, ...updatedMeeting } : m))
                    .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))
            );
        } catch (error) {
            console.error('Ошибка при обновлении встречи:', error);
            throw error;
        }
    };

    const deleteMeeting = async (id) => {
        if (!user) return;

        try {
            await deleteMeetingById(id);
            setMeetings((prev) => prev.filter((m) => m.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении встречи:', error);
            throw error;
        }
    };

    return {
        meetings,
        coamingMeetings,
        loading,
        createMeeting,
        updateMeeting: updateMeetingWrapper,
        deleteMeetingById: deleteMeeting
    };
};
