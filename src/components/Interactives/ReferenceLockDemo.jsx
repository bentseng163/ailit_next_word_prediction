import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ReferenceLockDemo.module.css';
import { Lock, Unlock } from 'lucide-react';

const ReferenceLockDemo = ({ onComplete }) => {
    const [mode, setMode] = useState('loose'); // 'loose' or 'locked'

    const handleToggle = (m) => {
        setMode(m);
        if (m === 'locked' && onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.imageBox}>
                <div className={`${styles.image} ${mode === 'loose' ? styles.looseImg : styles.lockedImg}`}>
                    <div className={styles.overlay}>
                        {mode === 'loose' ? (
                            <div className={styles.tag}><Unlock size={14} /> Generic Robot</div>
                        ) : (
                            <div className={`${styles.tag} ${styles.lockedTag}`}><Lock size={14} /> Brand Mascot</div>
                        )}
                    </div>
                </div>
                <div className={styles.techLabel}>
                    {mode === 'loose' ? "Prompt Only: 'Robot'" : "Prompt + Reference Image"}
                </div>
            </div>

            <div className={styles.controls}>
                <button
                    className={`${styles.btn} ${mode === 'loose' ? styles.active : ''}`}
                    onClick={() => handleToggle('loose')}
                >
                    No Reference
                </button>
                <button
                    className={`${styles.btn} ${mode === 'locked' ? styles.active : ''}`}
                    onClick={() => handleToggle('locked')}
                >
                    + Reference
                </button>
            </div>

            <div className={styles.caption}>
                {mode === 'loose'
                    ? "Without a reference, the model invents a new robot every time."
                    : "The reference image 'locks' the identity (shape, colors) so it matches your brand."
                }
            </div>
        </div>
    );
};

export default ReferenceLockDemo;
