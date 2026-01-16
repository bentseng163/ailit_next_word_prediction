import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GuardrailPickerScenario.module.css';

/*
 * INTERACTIVE SPEC: Guardrail Picker Scenario
 * 
 * Goal: Practice selecting appropriate guardrails for an agent task.
 * 
 * UI: Select up to 4 guardrails from options, see impact on Speed/Reliability/Risk
 * Grading: Full credit for confirmation + logs + stop rule + permission limit
 */

const GuardrailPickerScenario = ({ onComplete }) => {
    const [selected, setSelected] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const maxSelections = 4;

    const scenario = {
        title: "Weekly Report Agent",
        description: "An agent will pull weekly reports from your dashboard and file a support ticket if metrics cross a threshold."
    };

    const guardrails = [
        { id: 'confirm', text: '✅ Confirmation before submit', category: 'essential', impact: { speed: -10, reliability: 20, risk: -25 } },
        { id: 'sandbox', text: '🧪 Sandbox/test account', category: 'essential', impact: { speed: -5, reliability: 15, risk: -20 } },
        { id: 'readonly', text: '👁️ Read-only mode', category: 'good', impact: { speed: 0, reliability: 10, risk: -15 } },
        { id: 'oneapp', text: '📱 Limit to one app', category: 'good', impact: { speed: 5, reliability: 10, risk: -10 } },
        { id: 'stopfail', text: '🛑 Stop after 2 failures', category: 'essential', impact: { speed: -5, reliability: 25, risk: -20 } },
        { id: 'logs', text: '📋 Log every action', category: 'essential', impact: { speed: -5, reliability: 20, risk: -15 } },
        { id: 'approval', text: '👤 Human approval for tickets', category: 'good', impact: { speed: -15, reliability: 25, risk: -30 } },
    ];

    const toggleGuardrail = (id) => {
        if (showResults) return;
        if (selected.includes(id)) {
            setSelected(selected.filter(g => g !== id));
        } else if (selected.length < maxSelections) {
            setSelected([...selected, id]);
        }
    };

    const calculateMetrics = () => {
        let speed = 80, reliability = 40, risk = 70;

        selected.forEach(id => {
            const g = guardrails.find(g => g.id === id);
            if (g) {
                speed += g.impact.speed;
                reliability += g.impact.reliability;
                risk += g.impact.risk;
            }
        });

        return {
            speed: Math.min(100, Math.max(0, speed)),
            reliability: Math.min(100, Math.max(0, reliability)),
            risk: Math.min(100, Math.max(0, risk))
        };
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const getScore = () => {
        const essentials = ['confirm', 'stopfail', 'logs'];
        const hasPermissionLimit = selected.includes('sandbox') || selected.includes('readonly') || selected.includes('oneapp');
        const essentialCount = essentials.filter(e => selected.includes(e)).length;

        let score = essentialCount * 2;
        if (hasPermissionLimit) score += 2;
        if (selected.includes('approval')) score += 2;

        return Math.min(10, score);
    };

    const getFeedback = () => {
        const missing = [];
        if (!selected.includes('confirm')) missing.push("Confirmation prevents accidental submissions");
        if (!selected.includes('logs')) missing.push("Logs enable debugging and accountability");
        if (!selected.includes('stopfail')) missing.push("Stop rules prevent infinite loops");
        if (!selected.includes('sandbox') && !selected.includes('readonly') && !selected.includes('oneapp')) {
            missing.push("Permission limits reduce blast radius");
        }
        return missing.slice(0, 2);
    };

    const metrics = calculateMetrics();

    return (
        <div className={styles.container}>
            {/* Scenario */}
            <div className={styles.scenarioCard}>
                <div className={styles.scenarioLabel}>📋 SCENARIO</div>
                <p className={styles.scenarioTitle}>{scenario.title}</p>
                <p className={styles.scenarioDesc}>{scenario.description}</p>
            </div>

            {/* Selection Header */}
            <div className={styles.selectionHeader}>
                <span>Choose guardrails:</span>
                <span className={styles.counter}>{selected.length}/{maxSelections}</span>
            </div>

            {/* Guardrail Options */}
            <div className={styles.guardrails}>
                {guardrails.map(g => {
                    const isSelected = selected.includes(g.id);
                    const isDisabled = !isSelected && selected.length >= maxSelections;

                    return (
                        <motion.button
                            key={g.id}
                            className={`${styles.guardrail} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''} ${showResults && g.category === 'essential' ? styles.essential : ''}`}
                            onClick={() => toggleGuardrail(g.id)}
                            whileTap={!showResults && !isDisabled ? { scale: 0.97 } : {}}
                        >
                            <span>{g.text}</span>
                            {isSelected && <span className={styles.check}>✓</span>}
                            {showResults && g.category === 'essential' && (
                                <span className={styles.essentialTag}>Key</span>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {/* Live Dashboard */}
            <div className={styles.dashboard}>
                <div className={styles.dashTitle}>Impact Preview</div>
                <div className={styles.meters}>
                    <MeterBar label="Speed" value={metrics.speed} color="#3b82f6" />
                    <MeterBar label="Reliability" value={metrics.reliability} color="#10b981" />
                    <MeterBar label="Risk" value={metrics.risk} color="#ef4444" inverted />
                </div>
            </div>

            {/* Submit Button */}
            {selected.length >= 3 && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Check Configuration
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
                            <span>Guardrail Score:</span>
                            <span className={styles.score} style={{
                                color: getScore() >= 8 ? '#10b981' : getScore() >= 5 ? '#f59e0b' : '#ef4444'
                            }}>
                                {getScore()}/10
                            </span>
                        </div>

                        {getFeedback().length > 0 && (
                            <div className={styles.feedback}>
                                <div className={styles.feedbackTitle}>💡 Consider adding:</div>
                                {getFeedback().map((f, i) => (
                                    <div key={i} className={styles.feedbackItem}>• {f}</div>
                                ))}
                            </div>
                        )}

                        <div className={styles.insight}>
                            💡 <strong>Key insight:</strong> For agents that can submit/create,
                            always include: confirmation + logs + stop rules + permission limits.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MeterBar = ({ label, value, color, inverted = false }) => {
    const isGood = inverted ? value < 40 : value > 60;
    const displayLabel = inverted
        ? (value > 60 ? 'High ⚠️' : value > 40 ? 'Medium' : 'Low ✓')
        : `${value}%`;

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
                    transition={{ duration: 0.4 }}
                />
            </div>
        </div>
    );
};

export default GuardrailPickerScenario;
