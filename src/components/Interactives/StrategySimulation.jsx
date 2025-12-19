import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './StrategySimulation.module.css';
import { Check, X, Shield, User, Bot } from 'lucide-react';

const StrategySimulation = ({ scenario, onComplete }) => {
    // scenario: { title, description, strategies: [{ id, name, icon, result, isRecommended }] }

    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (strategy) => {
        setSelected(strategy);
        setShowResult(true);
        if (strategy.isRecommended && onComplete) {
            onComplete();
        }
    };

    if (!scenario) return null;

    return (
        <div className={styles.container}>
            <div className={styles.scenarioCard}>
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
            </div>

            <div className={styles.strategyGrid}>
                {scenario.strategies.map((s) => (
                    <motion.button
                        key={s.id}
                        className={`${styles.strategyBtn} ${selected?.id === s.id ? styles.selected : ''}`}
                        onClick={() => handleSelect(s)}
                        whileTap={{ scale: 0.95 }}
                        disabled={showResult && selected?.id !== s.id}
                    >
                        <div className={styles.iconBox}>{s.icon}</div>
                        <span className={styles.btnLabel}>{s.name}</span>
                    </motion.button>
                ))}
            </div>

            {showResult && selected && (
                <motion.div
                    className={`${styles.resultBox} ${selected.isRecommended ? styles.success : styles.warning}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                >
                    <div className={styles.resultHeader}>
                        {selected.isRecommended ? <Check size={20} /> : <X size={20} />}
                        <span>{selected.isRecommended ? "Great Strategy" : "Risky Approach"}</span>
                    </div>
                    <p>{selected.result}</p>
                </motion.div>
            )}
        </div>
    );
};

export default StrategySimulation;
