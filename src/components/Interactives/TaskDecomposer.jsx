import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TaskDecomposer.module.css';

/*
 * INTERACTIVE SPEC: Task Decomposer
 * 
 * Goal: Teach decomposition + boundaries + acceptance tests
 * 
 * UI: Drag/reorder steps, then fill acceptance criteria and escalation rules
 * Grading: Must include 4-6 steps + 2 acceptance criteria + 1 escalation rule
 */

const TaskDecomposer = ({ onComplete }) => {
    const [orderedSteps, setOrderedSteps] = useState([]);
    const [doneCriteria, setDoneCriteria] = useState([]);
    const [escalateRule, setEscalateRule] = useState('');
    const [showResults, setShowResults] = useState(false);

    const vagueGoal = "Prepare weekly KPI update";

    const availableSteps = [
        { id: 'pull', text: '📊 Pull data from dashboard', safe: true },
        { id: 'validate', text: '🔍 Validate for anomalies', safe: true },
        { id: 'draft', text: '✍️ Draft summary text', safe: true },
        { id: 'chart', text: '📈 Create comparison chart', safe: true },
        { id: 'actions', text: '💡 Propose action items', safe: true },
        { id: 'send', text: '📤 Send to stakeholders', safe: false },
    ];

    const criteriaOptions = [
        { id: 'insights', text: 'Includes 3 insights + 1 risk' },
        { id: 'sources', text: 'All numbers traced to source' },
        { id: 'format', text: 'Output in specified format' },
        { id: 'flags', text: 'Flags anomalies, doesn\'t explain away' },
    ];

    const escalateOptions = [
        { id: 'anomaly', text: 'Escalate if data anomaly > 10%' },
        { id: 'missing', text: 'Escalate if source unavailable' },
        { id: 'unclear', text: 'Escalate if goal unclear' },
    ];

    const toggleStep = (step) => {
        if (showResults) return;
        if (orderedSteps.find(s => s.id === step.id)) {
            setOrderedSteps(orderedSteps.filter(s => s.id !== step.id));
        } else if (orderedSteps.length < 6) {
            setOrderedSteps([...orderedSteps, step]);
        }
    };

    const toggleCriteria = (id) => {
        if (showResults) return;
        if (doneCriteria.includes(id)) {
            setDoneCriteria(doneCriteria.filter(c => c !== id));
        } else if (doneCriteria.length < 3) {
            setDoneCriteria([...doneCriteria, id]);
        }
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const getScore = () => {
        let score = 0;

        // Steps (4 points max)
        if (orderedSteps.length >= 4 && orderedSteps.length <= 6) score += 3;
        else if (orderedSteps.length >= 3) score += 2;

        // Check for unsafe action at end with validation
        const unsafeStep = orderedSteps.find(s => !s.safe);
        if (unsafeStep && orderedSteps.indexOf(unsafeStep) === orderedSteps.length - 1) score += 1;

        // Criteria (3 points)
        score += Math.min(3, doneCriteria.length);

        // Escalation (3 points)
        if (escalateRule) score += 3;

        return score;
    };

    const getFeedback = () => {
        const feedback = [];

        if (orderedSteps.length < 4) {
            feedback.push("Consider adding more steps for clarity");
        }

        const unsafeStep = orderedSteps.find(s => !s.safe);
        if (unsafeStep && orderedSteps.indexOf(unsafeStep) !== orderedSteps.length - 1) {
            feedback.push("⚠️ Unsafe action (Send) should come last, after validation");
        }

        if (doneCriteria.length < 2) {
            feedback.push("Add more acceptance criteria to define 'done'");
        }

        if (!escalateRule) {
            feedback.push("Missing escalation rule for edge cases");
        }

        return feedback;
    };

    const canSubmit = orderedSteps.length >= 3 && doneCriteria.length >= 1;

    return (
        <div className={styles.container}>
            {/* Vague Goal */}
            <div className={styles.goalCard}>
                <div className={styles.goalLabel}>📋 VAGUE GOAL</div>
                <p className={styles.goalText}>"{vagueGoal}"</p>
            </div>

            {/* Step Selection */}
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    1. Select steps (in order):
                    <span className={styles.counter}>{orderedSteps.length}/6</span>
                </div>
                <div className={styles.steps}>
                    {availableSteps.map((step, index) => {
                        const isSelected = orderedSteps.find(s => s.id === step.id);
                        const orderNum = orderedSteps.findIndex(s => s.id === step.id) + 1;

                        return (
                            <motion.button
                                key={step.id}
                                className={`${styles.step} ${isSelected ? styles.selected : ''} ${!step.safe ? styles.unsafe : ''}`}
                                onClick={() => toggleStep(step)}
                                whileTap={{ scale: 0.97 }}
                            >
                                {isSelected && <span className={styles.orderBadge}>{orderNum}</span>}
                                <span>{step.text}</span>
                                {!step.safe && <span className={styles.warnBadge}>⚠️</span>}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Acceptance Criteria */}
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    2. "Done when..." (pick 2-3):
                </div>
                <div className={styles.criteria}>
                    {criteriaOptions.map(c => (
                        <button
                            key={c.id}
                            className={`${styles.criteriaBtn} ${doneCriteria.includes(c.id) ? styles.selected : ''}`}
                            onClick={() => toggleCriteria(c.id)}
                        >
                            {doneCriteria.includes(c.id) ? '✓ ' : ''}{c.text}
                        </button>
                    ))}
                </div>
            </div>

            {/* Escalation Rule */}
            <div className={styles.section}>
                <div className={styles.sectionTitle}>
                    3. "Escalate when..." (pick 1):
                </div>
                <div className={styles.escalate}>
                    {escalateOptions.map(e => (
                        <button
                            key={e.id}
                            className={`${styles.escalateBtn} ${escalateRule === e.id ? styles.selected : ''}`}
                            onClick={() => !showResults && setEscalateRule(e.id)}
                        >
                            {escalateRule === e.id ? '✓ ' : ''}{e.text}
                        </button>
                    ))}
                </div>
            </div>

            {/* Submit */}
            {canSubmit && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Check Task Spec
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
                            <span>Task Spec Score:</span>
                            <span className={styles.score} style={{
                                color: getScore() >= 8 ? '#10b981' : getScore() >= 5 ? '#f59e0b' : '#ef4444'
                            }}>
                                {getScore()}/10
                            </span>
                        </div>

                        {getFeedback().length > 0 && (
                            <div className={styles.feedback}>
                                {getFeedback().map((f, i) => (
                                    <div key={i} className={styles.feedbackItem}>• {f}</div>
                                ))}
                            </div>
                        )}

                        <div className={styles.insight}>
                            💡 <strong>Key insight:</strong> Decomposition + acceptance tests + escalation rules
                            turn vague goals into reliable workflows.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TaskDecomposer;
