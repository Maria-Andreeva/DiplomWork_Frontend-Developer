import React from 'react';
import styles from '../styles/InputField.module.css';

const InputField = ({ label, type = 'text', value, onChange, className }) => (
    <div className={`${styles.inputField} ${className || ''}`}>
        <label className={styles.label}>{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={styles.input}
            required
        />
    </div>
);

export default InputField;
