import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './InteractiveCard.module.css';

const InteractiveCard = ({ title, children, onNext, onBack, nextLabel = "Continue", isNextDisabled = false }) => {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.scrollContent}>
                {title && <h2 className={styles.title}>{title}</h2>}
                <div className={styles.body}>
                    {children}
                </div>
            </div>

            <div className={styles.footer}>
                {onBack && (
                    <button
                        className={styles.backButton}
                        onClick={onBack}
                    >
                        ←
                    </button>
                )}
                <button
                    className={clsx(styles.button, isNextDisabled && styles.disabled)}
                    onClick={onNext}
                    disabled={isNextDisabled}
                >
                    {nextLabel}
                </button>
            </div>
        </motion.div>
    );
};

export default InteractiveCard;
