import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ message }) => {
    const hasNotified = useRef(false);

    const filterMessagesByToday = (messages) => {
        const today = new Date().setHours(0, 0, 0, 0);
        return messages.filter((item) => {
            const messageDate = new Date(item.date).setHours(0, 0, 0, 0);
            return messageDate === today;
        });
    };

    const filterMessagesByTomorrow = (messages) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        return messages.filter((item) => {
            const messageDate = new Date(item.date).setHours(0, 0, 0, 0);
            return messageDate === tomorrow;
        });
    };

    useEffect(() => {
        if (message && !hasNotified.current) {

            const filteredMessagesToday  = filterMessagesByToday (message);
            const filteredMessagesTomorrow = filterMessagesByTomorrow(message);

            const filteredMessages = [...filteredMessagesToday, ...filteredMessagesTomorrow];

            if (filteredMessages.length > 0) {
                filteredMessages.forEach((item) => {

                    const messageText = 'У вас есть новая встреча: ' + item.title + " " + item.date;  // Если нет title, показываем дефолтное сообщение

                    toast.success(messageText, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                });
            }

            hasNotified.current = true;
        }
    }, [message]);

    return null;
};

export default Notification;
