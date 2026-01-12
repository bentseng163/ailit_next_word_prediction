import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContextPackChoice.module.css';

/*
 * INTERACTIVE SPEC: Context Pack Choice
 * 
 * Goal: Practice selecting what to include in a context-limited scenario.
 * 
 * UI:
 * - Scenario: "You need a decision memo. Budget is limited."
 * - List of 12 items (checkbox cards): goals, stakeholder names, background, metrics, examples, sources, etc.
 * - Learner can select up to N items (e.g., 6)
 * - After submit: show 3 meters (Clarity, Requirement adherence, Hallucination risk)
 * 
 * Feedback: Explain top 2 missing items and why important
 * Grading: Full credit if learner selects Goal + Constraints + Sources + Output format
 */

const ContextPackChoice = ({ onComplete }) => {
    const [selected, setSelected] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const maxSelections = 6;

    const items = [
        { id: 'goal', text: '🎯 Clear goal statement', category: 'essential', priority: 1 },
        { id: 'audience', text: '👤 Target audience', category: 'essential', priority: 2 },
        { id: 'constraints', text: '🔒 Key constraints (must/must-not)', category: 'essential', priority: 1 },
        { id: 'sources', text: '📚 Source documents to cite', category: 'essential', priority: 1 },
        { id: 'format', text: '📄 Output format spec', category: 'essential', priority: 2 },
        { id: 'tone', text: '🎨 Tone guide', category: 'nice', priority: 3 },
        { id: 'background', text: '📖 Full company background', category: 'risky', priority: 4 },
        { id: 'stakeholders', text: '👥 All stakeholder names', category: 'nice', priority: 4 },
        { id: 'metrics', text: '📊 Key metrics to highlight', category: 'nice', priority: 3 },
        { id: 'examples', text: '📝 2 format examples', category: 'nice', priority: 3 },
        { id: 'history', text: '📜 Project history (5 pages)', category: 'risky', priority: 5 },
        { id: 'edgecases', text: '⚠️ Edge case handling', category: 'nice', priority: 4 },
    ];

    const toggleItem = (id) => {
        if (showResults) return;
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else if (selected.length < maxSelections) {
            setSelected([...selected, id]);
        }
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const calculateOutcomes = () => {
        let clarity = 40;
        let adherence = 40;
        let hallucinationRisk = 50;
        let feedback = [];

        // Essential items boost
        if (selected.includes('goal')) {
            clarity += 20;
            adherence += 10;
        } else {
            feedback.push({ item: 'Goal statement', why: 'Without it, model guesses the purpose' });
        }

        if (selected.includes('constraints')) {
            adherence += 25;
            hallucinationRisk -= 15;
        } else {
            feedback.push({ item: 'Constraints', why: 'Model may violate requirements you assumed were obvious' });
        }

        if (selected.includes('sources')) {
            hallucinationRisk -= 30;
            adherence += 10;
        } else {
            feedback.push({ item: 'Source documents', why: 'High risk of plausible invention without grounding' });
        }

        if (selected.includes('format')) {
            clarity += 15;
        }

        if (selected.includes('audience')) {
            clarity += 10;
        }

        // Nice-to-have items
        if (selected.includes('examples')) {
            clarity += 10;
            adherence += 5;
        }

        if (selected.includes('metrics')) {
            adherence += 5;
        }

        // Risky items (waste budget without helping)
        if (selected.includes('background')) {
            hallucinationRisk += 10; // Too much noise
        }
        if (selected.includes('history')) {
            hallucinationRisk += 15; // Way too much noise
        }

        return {
            clarity: Math.min(100, Math.max(0, clarity)),
            adherence: Math.min(100, Math.max(0, adherence)),
            hallucinationRisk: Math.min(100, Math.max(0, hallucinationRisk)),
            feedback: feedback.slice(0, 2)
        };
    };

    const getScore = () => {
        const essentials = ['goal', 'constraints', 'sources', 'format'];
        const essentialCount = essentials.filter(e => selected.includes(e)).length;
        return Math.round((essentialCount / 4) * 10);
    };

    const outcomes = calculateOutcomes();

    return (
        <div className={styles.container}>
            {/* Scenario */}
            <div className={styles.scenarioCard}>
                <div className={styles.scenarioLabel}>📋 SCENARIO</div>
                <p>You need a <strong>decision memo</strong> for the leadership team. Context budget is limited—you can only include <strong>{maxSelections} items</strong>.</p>
            </div>

            {/* Item Selection */}
            <div className={styles.selectionHeader}>
                <span>Select what to include:</span>
                <span className={styles.counter}>{selected.length}/{maxSelections}</span>
            </div>

            <div className={styles.itemGrid}>
                {items.map(item => {
                    const isSelected = selected.includes(item.id);
                    const isDisabled = !isSelected && selected.length >= maxSelections;

                    return (
                        <motion.button
                            key={item.id}
                            className={`${styles.itemCard} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''} ${showResults && item.category === 'essential' && !isSelected ? styles.missed : ''} ${showResults && item.category === 'risky' && isSelected ? styles.risky : ''}`}
                            onClick={() => toggleItem(item.id)}
                            whileTap={!showResults && !isDisabled ? { scale: 0.97 } : {}}
                        >
                            <span>{item.text}</span>
                            {isSelected && <span className={styles.checkmark}>✓</span>}
                            {showResults && item.category === 'essential' && <span className={styles.essentialTag}>Essential</span>}
                        </motion.button>
                    );
                })}
            </div>

            {/* Submit Button */}
            {selected.length >= 3 && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Submit Context Pack
                </motion.button>
            )}

            {/* Results */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        className={styles.resultsPanel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Score */}
                        <div className={styles.scoreRow}>
                            <span>Context Pack Score:</span>
                            <span className={styles.score} style={{
                                color: getScore() >= 8 ? '#10b981' : getScore() >= 5 ? '#f59e0b' : '#ef4444'
                            }}>
                                {getScore()}/10
                            </span>
                        </div>

                        {/* Meters */}
                        <div className={styles.meters}>
                            <MeterBar label="Clarity" value={outcomes.clarity} color="#3b82f6" />
                            <MeterBar label="Requirement Adherence" value={outcomes.adherence} color="#8b5cf6" />
                            <MeterBar label="Hallucination Risk" value={outcomes.hallucinationRisk} color="#ef4444" inverted />
                        </div>

                        {/* Missing Items Feedback */}
                        {outcomes.feedback.length > 0 && (
                            <div className={styles.feedbackBox}>
                                <div className={styles.feedbackTitle}>📌 What you missed:</div>
                                {outcomes.feedback.map((f, i) => (
                                    <div key={i} className={styles.feedbackItem}>
                                        <strong>{f.item}:</strong> {f.why}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Insight */}
                        <div className={styles.insight}>
                            💡 <strong>Key insight:</strong> Minimum viable context = Goal + Constraints + Sources + Format. Everything else is optional.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MeterBar = ({ label, value, color, inverted = false }) => {
    const displayLabel = inverted
        ? (value > 60 ? 'High ⚠️' : value > 40 ? 'Medium' : 'Low ✓')
        : `${value}%`;
    const isGood = inverted ? value < 40 : value > 60;

    return (
        <div className={styles.meter}>
            <div className={styles.meterHeader}>
                <span className={styles.meterLabel}>{label}</span>
                <span className={styles.meterValue} style={{ color: isGood ? '#10b981' : color }}>
                    {displayLabel}
                </span>
            </div>
            <div className={styles.meterTrack}>
                <motion.div
                    className={styles.meterFill}
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );
};

export default ContextPackChoice;
