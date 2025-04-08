import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ label, onClick, type = "button" }) => (
    <button
        type={type}
        onClick={onClick}
        className={styles.button}
    >
        {label}
    </button>
);

export default Button;
