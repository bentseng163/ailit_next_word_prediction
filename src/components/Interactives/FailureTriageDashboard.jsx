import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FailureTriageDashboard.module.css';

/*
 * INTERACTIVE SPEC: Failure Triage Dashboard
 * 
 * Goal: Teach learners to diagnose failures and select mitigation
 * 
 * UI: Dashboard table with incident rows, learner labels errors and picks mitigations
 * Grading: 1 point per correct label + 2 points for mitigation choices
 */

const FailureTriageDashboard = ({ onComplete }) => {
    const [labels, setLabels] = useState({});
    const [selectedMitigation, setSelectedMitigation] = useState('');
    const [showResults, setShowResults] = useState(false);

    const incidents = [
        {
            id: 1,
            time: '10:14',
            action: 'Click "Export"',
            outcome: 'Wrong file exported',
            log: 'Selected first match in list',
            correctLabel: 'ui',
        },
        {
            id: 2,
            time: '10:15',
            action: 'Fill date field',
            outcome: 'Used yesterday\'s date',
            log: 'No date specified in task',
            correctLabel: 'assumption',
        },
        {
            id: 3,
            time: '10:17',
            action: 'Call API',
            outcome: 'Request failed',
            log: 'HTTP 503 Service Unavailable',
            correctLabel: 'tool',
        },
        {
            id: 4,
            time: '10:18',
            action: 'Retry API (x5)',
            outcome: 'Same failure repeated',
            log: 'No stop rule triggered',
            correctLabel: 'loop',
        },
    ];

    const errorTypes = [
        { id: 'tool', label: '🔧 Tool Error', color: '#3b82f6' },
        { id: 'ui', label: '👁️ UI Misread', color: '#f59e0b' },
        { id: 'assumption', label: '💭 Assumption', color: '#a855f7' },
        { id: 'loop', label: '🔄 Loop', color: '#ef4444' },
    ];

    const mitigations = [
        { id: 'confirm', text: 'Add confirmation steps' },
        { id: 'scope', text: 'Narrow scope' },
        { id: 'stop', text: 'Add stop rule' },
        { id: 'permission', text: 'Fix tool permission' },
    ];

    const setLabel = (incidentId, labelId) => {
        if (showResults) return;
        setLabels({ ...labels, [incidentId]: labelId });
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const getScore = () => {
        let score = 0;
        incidents.forEach(inc => {
            if (labels[inc.id] === inc.correctLabel) score += 2;
        });
        // Mitigation bonus
        if (selectedMitigation === 'stop') score += 2;
        return Math.min(10, score);
    };

    const allLabeled = Object.keys(labels).length === incidents.length;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>📊 Incident Log</span>
                <span className={styles.counter}>{Object.keys(labels).length}/{incidents.length} labeled</span>
            </div>

            {/* Incidents */}
            <div className={styles.incidents}>
                {incidents.map(inc => (
                    <div key={inc.id} className={styles.incident}>
                        <div className={styles.incidentHeader}>
                            <span className={styles.time}>{inc.time}</span>
                            <span className={styles.action}>{inc.action}</span>
                        </div>
                        <div className={styles.outcome}>→ {inc.outcome}</div>
                        <div className={styles.log}>📋 {inc.log}</div>

                        <div className={styles.labelPicker}>
                            {errorTypes.map(type => {
                                const isSelected = labels[inc.id] === type.id;
                                const isCorrect = showResults && inc.correctLabel === type.id;

                                return (
                                    <button
                                        key={type.id}
                                        className={`${styles.labelBtn} ${isSelected ? styles.selected : ''} ${showResults && isCorrect ? styles.correct : ''}`}
                                        style={{
                                            borderColor: isSelected ? type.color : 'transparent',
                                            background: isSelected ? `${type.color}20` : 'var(--color-bg-main)'
                                        }}
                                        onClick={() => setLabel(inc.id, type.id)}
                                    >
                                        {type.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mitigation Selection */}
            {allLabeled && !showResults && (
                <motion.div
                    className={styles.mitigationSection}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.mitigationTitle}>🛠️ Priority fix for repeated loops?</div>
                    <div className={styles.mitigations}>
                        {mitigations.map(m => (
                            <button
                                key={m.id}
                                className={`${styles.mitBtn} ${selectedMitigation === m.id ? styles.selected : ''}`}
                                onClick={() => setSelectedMitigation(m.id)}
                            >
                                {m.text}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Submit */}
            {allLabeled && selectedMitigation && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Check Triage
                </motion.button>
            )}

            {/* Results */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        className={styles.results}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.scoreRow}>
                            <span>Triage Score:</span>
                            <span className={styles.score} style={{
                                color: getScore() >= 8 ? '#10b981' : getScore() >= 5 ? '#f59e0b' : '#ef4444'
                            }}>
                                {getScore()}/10
                            </span>
                        </div>

                        <div className={styles.insight}>
                            💡 <strong>Key insight:</strong> Name the failure type → choose the right fix.
                            Loops need stop rules. UI misreads need confirmations. Tool errors need fallbacks.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FailureTriageDashboard;
