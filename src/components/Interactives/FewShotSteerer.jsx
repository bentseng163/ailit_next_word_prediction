import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FewShotSteerer.module.css';
import { RefreshCw } from 'lucide-react';

const FewShotSteerer = ({ onComplete, scenario }) => {
    // Default Scenario: Meeting Notes (Productivity default)
    const defaultScenario = {
        instruction: "Steer the format by adding examples:",
        outputs: {
            '0': {
                variations: [
                    "Here are the notes: met with client, they want feature X by Q4, also mentioned pricing is high. Action item: email engineering.",
                    "Met client. Discussed Feature X (Q4 deadline). Pricing is an issue. Need to email eng.",
                    "Client notes: 1. Feature X 2. Q4 3. High Price. TODO: Eng email."
                ]
            },
            '1': {
                variations: [
                    "Meeting Summary:\n- Client: Acme Corp\n- Key Ask: Feature X (Q4)\n- Risks: Pricing concerns\n- Action: Email Engineering",
                    "Meeting Summary:\n* Customer: Acme Corp\n* Request: Feature X (by Q4)\n* Blocker: High price\n* Next Step: Engineering Email"
                ]
            },
            '3': {
                variations: [
                    "MEETING BRIEF\n\nCLIENT: Acme Corp\nKEY ASK: Feature X (Target: Q4)\nRISKS: Pricing sensitivity detected\nACTION: Engineering sync required",
                    "MEETING BRIEF\n\nCLIENT: Acme Corp\nKEY ASK: Feature X (Target: Q4)\nRISKS: Pricing sensitivity detected\nACTION: Engineering sync required"
                ]
            }
        }
    };

    const activeScenario = scenario || defaultScenario;

    const [mode, setMode] = useState('0'); // '0', '1', '3'
    const [version, setVersion] = useState(0);
    const [currentOutput, setCurrentOutput] = useState("");

    const generate = () => {
        setVersion(prev => prev + 1);
        const pool = activeScenario.outputs[mode].variations;
        const randomChoice = pool[Math.floor(Math.random() * pool.length)];
        setCurrentOutput(randomChoice);
    };

    useEffect(() => {
        generate();
    }, [mode, activeScenario]); // Re-run if scenario changes

    const handleMode = (m) => {
        setMode(m);
        if (m === '3' && onComplete) onComplete();
    };

    const getMeterStats = () => {
        if (mode === '0') return { width: '15%', color: 'var(--color-warning)', label: 'Low (High Variance)' };
        if (mode === '1') return { width: '60%', color: '#facc15', label: 'Medium (Some Variance)' }; // Yellow
        if (mode === '3') return { width: '100%', color: 'var(--color-accent-success)', label: 'High (Predictable)' };
    };

    const meterStats = getMeterStats();

    return (
        <div className={styles.container}>
            <div className={styles.instruction}>
                {activeScenario.instruction}
            </div>

            <div className={styles.controls}>
                {['0', '1', '3'].map(m => (
                    <button
                        key={m}
                        className={`${styles.btn} ${mode === m ? styles.active : ''}`}
                        onClick={() => handleMode(m)}
                    >
                        {m} Example{m !== '1' && 's'}
                    </button>
                ))}
            </div>

            <div className={styles.preview}>
                <div className={styles.previewHeader}>
                    <div className={styles.label}>LLM Output Preview</div>
                    <div className={styles.consistencyBadge} style={{ color: meterStats.color }}>
                        {meterStats.label}
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={`${mode}-${version}`}
                        className={styles.output}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                    >
                        {currentOutput}
                    </motion.div>
                </AnimatePresence>
            </div>

            <button className={styles.regenBtn} onClick={generate}>
                <RefreshCw size={16} />
                Regenerate Output
            </button>

            <div className={styles.meterBox}>
                <div className={styles.meterLabel}>Format Consistency</div>
                <div className={styles.meterTrack}>
                    <motion.div
                        className={styles.meterFill}
                        animate={{
                            width: meterStats.width,
                            backgroundColor: meterStats.color
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FewShotSteerer;
