import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { logout } from '../../services/authService';
import Button from '../../components/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import styles from './Profile.module.css';

const Profile = () => {
    const { user } = useAuthContext();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchUserData();
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={styles.profile}>
            <h2 className={styles.heading}>Профиль пользователя</h2>
            {userData ? (
                <div className={styles.infoBox}>
                    <p><strong>Имя:</strong> {userData.firstName}</p>
                    <p><strong>Фамилия:</strong> {userData.lastName}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Телефон:</strong> {userData.phone}</p>
                    <p><strong>Город:</strong> {userData.city}</p>
                    <p><strong>UID:</strong> {userData.uid}</p>
                </div>
            ) : (
                <p className={styles.loader}>Загрузка...</p>
            )}
            <Button className={styles.logoutButton} label="Выйти" onClick={handleLogout} />
        </div>
    );
};

export default Profile;
