import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PredictionVisualizer.module.css';

const PredictionVisualizer = ({ onComplete }) => {
    const [phase, setPhase] = useState('idle'); // idle, processing, complete

    const runSimulation = () => {
        setPhase('processing');
        setTimeout(() => {
            setPhase('complete');
            onComplete && onComplete();
        }, 2500);
    };

    return (
        <div className={styles.container}>
            {/* Input */}
            <motion.div
                className={styles.node}
                initial={{ opacity: 0.5, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className={styles.label}>Context</div>
                <div className={styles.box}>"The cat sat on"</div>
            </motion.div>

            {/* Arrow 1 */}
            <div className={styles.arrow}>→</div>

            {/* Machine */}
            <motion.div
                className={styles.machine}
                animate={phase === 'processing' ? {
                    scale: [1, 1.1, 1],
                    boxShadow: ['0 0 0px #8B5CF6', '0 0 20px #8B5CF6', '0 0 0px #8B5CF6']
                } : {}}
                transition={{ repeat: 2, duration: 0.8 }}
            >
                <div className={styles.machineLabel}>LLM</div>
                <div className={styles.gearIcon}>⚙️</div>
            </motion.div>

            {/* Arrow 2 */}
            <motion.div
                className={styles.arrow}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'complete' ? 1 : 0.2 }}
            >
                →
            </motion.div>

            {/* Output */}
            <motion.div
                className={styles.node}
                initial={{ opacity: 0.2 }}
                animate={{
                    opacity: phase === 'complete' ? 1 : 0.2,
                    scale: phase === 'complete' ? [0.9, 1.05, 1] : 1
                }}
            >
                <div className={styles.label}>Predicted</div>
                <div className={styles.outputBox}>"the"</div>
            </motion.div>

            {/* Trigger */}
            {phase === 'idle' && (
                <button className={styles.triggerBtn} onClick={runSimulation}>
                    Run Prediction
                </button>
            )}
        </div>
    );
};

export default PredictionVisualizer;
