import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {login, logout} from '../../services/authService';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/profile');
        } catch (error) {
            alert('Ошибка при входе: ' + error.message);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className={styles.loginPage}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.header}>Вход</h2>
                <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputField label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button label="Войти" type="submit" />
                <Button label="Выйти" onClick={handleLogout} />
            </form>
        </div>
    );
};

export default Login;
