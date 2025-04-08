import React from "react";
import { useMeetings } from '../../hooks/useMeetings';
import Notification from '../../components/Notification';
import styles from './Home.module.css';

const Home = () => {
    const { coamingMeetings, loading } = useMeetings();

    return (
        <div className={styles.homePageContainer}>
            <h1 className={styles.welcomeHeading}>Добро пожаловать!</h1>
            {loading ? (
                <div className={styles.spinner}></div>
            ) : coamingMeetings ? (
                <Notification message={coamingMeetings} />
            ) : (
                <p className={styles.noMeetings}>Предстоящих встреч нет.</p>
            )}
        </div>
    );
};

export default Home;
