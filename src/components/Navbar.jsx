import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebase';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user] = useAuthState(auth);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <nav className={styles.navbar}>
            <a href='/'><h1 className={styles.title}>Schedule App</h1></a>

            <div className={styles.burger} onClick={toggleMenu}>
                <div className={menuOpen ? styles.line1Active : ''}></div>
                <div className={menuOpen ? styles.line2Active : ''}></div>
                <div className={menuOpen ? styles.line3Active : ''}></div>
            </div>

            <ul className={`${styles.navList} ${menuOpen ? styles.open : ''}`}>
                {user && (<li><Link to="/" className={styles.navLink} >Главная</Link></li>)}
                {user && <li><Link to="/my-events" className={styles.navLink}>Мои события</Link></li>}
                {user && <li><Link to="/calendar" className={styles.navLink}>Календарь</Link></li>}
                {user && <li><Link to="/booking" className={styles.navLink}>Бронирование</Link></li>}
                {user && <li><Link to="/profile" className={styles.navLink}>Профиль</Link></li>}
                <li><Link to="/register" className={styles.navLink}>Регистрация</Link></li>
                <li><Link to="/login" className={styles.navLink}>Вход</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
