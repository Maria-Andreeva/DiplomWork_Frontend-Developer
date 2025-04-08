// pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { register } from '../../services/authService';
import styles from './Register.module.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(email, password, { firstName, lastName, city, phone });
            navigate('/profile');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.registerPage}>
            <form onSubmit={handleRegister} className={styles.form}>
                <h2 className={styles.header}>Регистрация</h2>

                <InputField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.formInput}
                />
                <InputField
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.formInput}
                />
                <InputField
                    label="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={styles.formInput}
                />
                <InputField
                    label="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={styles.formInput}
                />
                <InputField
                    label="Город"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={styles.formInput}
                />
                <InputField
                    label="Телефон"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.formInput}
                />

                {error && <p className={styles.errorMessage}>{error}</p>}

                <Button label={loading ? 'Загрузка...' : 'Зарегистрироваться'} type="submit" disabled={loading} className={styles.button} />
            </form>
        </div>
    );
};

export default Register;
