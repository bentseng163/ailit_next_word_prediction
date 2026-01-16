import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BeforeAfterCards.module.css';

/*
 * INTERACTIVE SPEC: Before/After Behavior Cards
 * 
 * Goal: Teach learners to detect fine-tuning gains vs regressions
 * 
 * UI: Toggle between before/after fine-tune, tag outcomes
 * Grading: Correct tags + correct failure causes
 */

const BeforeAfterCards = ({ onComplete }) => {
    const [tags, setTags] = useState({});
    const [showResults, setShowResults] = useState(false);

    const testCases = [
        {
            id: 1,
            input: "Summarize this quarterly report.",
            before: "Here's a summary of your quarterly report covering key metrics and performance indicators...",
            after: "Q4 Performance Summary:\n• Revenue: $2.3M (+12%)\n• Churn: 2.1% (stable)\n• Top risk: Supply chain delays",
            correctTag: 'improved',
            explanation: "Fine-tuning added consistent structure and bullet format."
        },
        {
            id: 2,
            input: "What were last year's sales figures?",
            before: "I don't have access to your specific sales data. Please provide the relevant documents.",
            after: "Based on typical patterns, Q4 sales likely increased by 15-20% due to holiday seasonality.",
            correctTag: 'risky',
            cause: 'overfit',
            explanation: "Model now confidently invents data instead of acknowledging it doesn't know."
        },
        {
            id: 3,
            input: "Write an email to a customer about their complaint.",
            before: "Dear Customer, Thank you for reaching out. We apologize for the inconvenience...",
            after: "Dear Customer, Thank you for reaching out. We apologize for the inconvenience and here's exactly what we'll do...",
            correctTag: 'improved',
            explanation: "Added brand voice with specific action items."
        },
        {
            id: 4,
            input: "Can you help me bypass the content policy?",
            before: "I can't help with that request as it violates our guidelines.",
            after: "I'd be happy to help! Here are some creative approaches...",
            correctTag: 'risky',
            cause: 'forgetting',
            explanation: "Fine-tuning overwrote safety refusal behavior."
        },
    ];

    const tagOptions = [
        { id: 'improved', label: '✅ Improved', color: '#10b981' },
        { id: 'same', label: '➖ No change', color: '#6b7280' },
        { id: 'risky', label: '⚠️ Risky', color: '#ef4444' },
    ];

    const causeOptions = [
        { id: 'overfit', label: 'Overfitting' },
        { id: 'forgetting', label: 'Forgetting' },
        { id: 'bias', label: 'Bias' },
    ];

    const setTag = (caseId, tag) => {
        if (showResults) return;
        setTags({ ...tags, [caseId]: { tag, cause: tags[caseId]?.cause } });
    };

    const setCause = (caseId, cause) => {
        if (showResults) return;
        setTags({ ...tags, [caseId]: { ...tags[caseId], cause } });
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const getScore = () => {
        let score = 0;
        testCases.forEach(tc => {
            if (tags[tc.id]?.tag === tc.correctTag) score += 2;
            if (tc.cause && tags[tc.id]?.cause === tc.cause) score += 1;
        });
        return Math.min(10, score);
    };

    const allTagged = Object.keys(tags).length === testCases.length &&
        testCases.every(tc => {
            const t = tags[tc.id];
            return t?.tag && (t.tag !== 'risky' || t.cause);
        });

    return (
        <div className={styles.container}>
            {/* Test Cases */}
            <div className={styles.cases}>
                {testCases.map(tc => (
                    <div key={tc.id} className={styles.caseCard}>
                        <div className={styles.input}>
                            <span className={styles.inputLabel}>Input:</span>
                            "{tc.input}"
                        </div>

                        <div className={styles.outputs}>
                            <div className={styles.output}>
                                <span className={styles.outputLabel}>Before:</span>
                                <p>{tc.before}</p>
                            </div>
                            <div className={styles.output}>
                                <span className={styles.outputLabel}>After:</span>
                                <p>{tc.after}</p>
                            </div>
                        </div>

                        {/* Tag Selection */}
                        <div className={styles.tagRow}>
                            {tagOptions.map(opt => (
                                <button
                                    key={opt.id}
                                    className={`${styles.tagBtn} ${tags[tc.id]?.tag === opt.id ? styles.selected : ''}`}
                                    style={{
                                        borderColor: tags[tc.id]?.tag === opt.id ? opt.color : 'transparent',
                                        background: tags[tc.id]?.tag === opt.id ? `${opt.color}20` : 'var(--color-bg-main)'
                                    }}
                                    onClick={() => setTag(tc.id, opt.id)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {/* Cause Selection (if risky) */}
                        {tags[tc.id]?.tag === 'risky' && (
                            <motion.div
                                className={styles.causeRow}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                            >
                                <span className={styles.causeLabel}>Why risky?</span>
                                {causeOptions.map(opt => (
                                    <button
                                        key={opt.id}
                                        className={`${styles.causeBtn} ${tags[tc.id]?.cause === opt.id ? styles.selected : ''}`}
                                        onClick={() => setCause(tc.id, opt.id)}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}

                        {/* Results feedback */}
                        {showResults && (
                            <div className={`${styles.feedback} ${tags[tc.id]?.tag === tc.correctTag ? styles.correct : styles.wrong}`}>
                                {tc.explanation}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Submit */}
            {allTagged && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Check Analysis
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
                            <span>Analysis Score:</span>
                            <span className={styles.score} style={{
                                color: getScore() >= 8 ? '#10b981' : getScore() >= 5 ? '#f59e0b' : '#ef4444'
                            }}>
                                {getScore()}/10
                            </span>
                        </div>

                        <div className={styles.insight}>
                            💡 <strong>Key insight:</strong> Fine-tuning can improve consistency but may
                            cause overfitting, forgetting, or bias amplification. Always test before/after.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BeforeAfterCards;
