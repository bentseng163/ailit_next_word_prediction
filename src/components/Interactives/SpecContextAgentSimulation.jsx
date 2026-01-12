import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SpecContextAgentSimulation.module.css';

/*
 * INTERACTIVE SPEC: Spec/Context/Agent Simulation
 * 
 * Goal: Help learners choose the right tooling level for a given task.
 * 
 * UI:
 * - Scenario: "You need a market scan + recommendation by tomorrow."
 * - Learner chooses one approach: Prompt only / Context pack + prompt / Agent with tools
 * - Consequence dashboard: Time saved, Reliability, Risk
 * 
 * Feedback: Explain best choice based on stakes and ambiguity
 * Always tie back to "completion space control"
 */

const SpecContextAgentSimulation = ({ onComplete }) => {
    const [selectedApproach, setSelectedApproach] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const approaches = [
        {
            id: 'prompt',
            icon: '📝',
            title: 'Prompt Only',
            desc: 'Single message, no extra context',
            timeSaved: 90,
            reliability: 40,
            risk: 70,
            isOptimal: false,
            feedback: "Fast but risky. No grounding = high hallucination. For a market scan with real stakes, you need sources.",
        },
        {
            id: 'context',
            icon: '📚',
            title: 'Context Pack + Prompt',
            desc: 'Attach relevant docs, use structured prompt',
            timeSaved: 70,
            reliability: 80,
            risk: 30,
            isOptimal: true,
            feedback: "Best balance for this task. Grounded in sources, constrained format, manageable risk. You stay in the loop.",
        },
        {
            id: 'agent',
            icon: '🤖',
            title: 'Agent with Tools',
            desc: 'Autonomous research, multiple tool calls',
            timeSaved: 50,
            reliability: 60,
            risk: 50,
            isOptimal: false,
            feedback: "Powerful but complex. For a first-pass market scan, you don't need full autonomy—just good inputs. Save agents for multi-step workflows.",
        },
    ];

    const handleSelect = (id) => {
        if (showResults) return;
        setSelectedApproach(id);
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const selected = approaches.find(a => a.id === selectedApproach);

    return (
        <div className={styles.container}>
            {/* Scenario */}
            <div className={styles.scenarioCard}>
                <div className={styles.scenarioLabel}>📋 SCENARIO</div>
                <p>
                    You need a <strong>market scan + recommendation</strong> by tomorrow morning.
                    The output will inform a leadership decision.
                </p>
                <p className={styles.scenarioQuestion}>Which approach do you use?</p>
            </div>

            {/* Approach Options */}
            <div className={styles.approaches}>
                {approaches.map(approach => (
                    <motion.button
                        key={approach.id}
                        className={`${styles.approachCard} ${selectedApproach === approach.id ? styles.selected : ''} ${showResults && approach.isOptimal ? styles.optimal : ''}`}
                        onClick={() => handleSelect(approach.id)}
                        whileTap={!showResults ? { scale: 0.98 } : {}}
                    >
                        <div className={styles.approachIcon}>{approach.icon}</div>
                        <div className={styles.approachInfo}>
                            <div className={styles.approachTitle}>{approach.title}</div>
                            <div className={styles.approachDesc}>{approach.desc}</div>
                        </div>
                        {showResults && approach.isOptimal && (
                            <span className={styles.optimalBadge}>✓ Best</span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Submit Button */}
            {selectedApproach && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Evaluate Approach
                </motion.button>
            )}

            {/* Results */}
            <AnimatePresence>
                {showResults && selected && (
                    <motion.div
                        className={styles.resultsPanel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Meters */}
                        <div className={styles.meters}>
                            <MeterBar label="Time Saved" value={selected.timeSaved} color="#3b82f6" />
                            <MeterBar label="Reliability" value={selected.reliability} color="#10b981" />
                            <MeterBar label="Risk Level" value={selected.risk} color="#ef4444" inverted />
                        </div>

                        {/* Feedback */}
                        <div className={`${styles.feedbackBox} ${selected.isOptimal ? styles.feedbackOptimal : styles.feedbackSub}`}>
                            {selected.isOptimal ? '✅ ' : '💡 '}
                            {selected.feedback}
                        </div>

                        {/* Matrix */}
                        <div className={styles.matrix}>
                            <div className={styles.matrixTitle}>📊 When to Use Each</div>
                            <div className={styles.matrixRow}>
                                <span>📝</span>
                                <span>Quick drafts, low stakes</span>
                            </div>
                            <div className={styles.matrixRow}>
                                <span>📚</span>
                                <span>Grounded work, medium stakes</span>
                            </div>
                            <div className={styles.matrixRow}>
                                <span>🤖</span>
                                <span>Multi-step workflows, automation</span>
                            </div>
                        </div>

                        {/* Insight */}
                        <div className={styles.insight}>
                            💡 <strong>Key insight:</strong> Match the tool to the task.
                            More autonomy = more setup. For most PM work, a good context pack beats a complex agent.
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

export default SpecContextAgentSimulation;
