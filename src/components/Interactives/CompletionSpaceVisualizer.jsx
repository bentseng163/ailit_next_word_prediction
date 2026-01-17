import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CompletionSpaceVisualizer.module.css';

/*
 * INTERACTIVE: Completion Space Visualizer
 * 
 * Goal: Let learners SEE how adding constraints shrinks the space
 * They toggle CPCO elements and watch dots disappear from the space
 */

const CompletionSpaceVisualizer = ({ onComplete }) => {
    const [activeConstraints, setActiveConstraints] = useState([]);
    const [showInsight, setShowInsight] = useState(false);

    const constraints = [
        { id: 'context', label: 'Context', icon: '🌍', description: 'Who/What/Why' },
        { id: 'persona', label: 'Persona', icon: '🎭', description: 'Act as...' },
        { id: 'constraints', label: 'Constraints', icon: '🔒', description: 'Do/Don\'t' },
        { id: 'output', label: 'Output', icon: '📤', description: 'Format' }
    ];

    // Each constraint removes ~40% of remaining dots
    const totalDots = 24;
    const activeDots = Math.max(1, Math.floor(totalDots * Math.pow(0.5, activeConstraints.length)));

    const toggleConstraint = (id) => {
        if (activeConstraints.includes(id)) {
            setActiveConstraints(activeConstraints.filter(c => c !== id));
            setShowInsight(false);
        } else {
            setActiveConstraints([...activeConstraints, id]);
            if (activeConstraints.length >= 2) {
                setShowInsight(true);
                onComplete && onComplete();
            }
        }
    };

    const getSpaceStatus = () => {
        if (activeConstraints.length === 0) return { text: 'Huge space → Unpredictable', color: '#ef4444' };
        if (activeConstraints.length === 1) return { text: 'Large space → Still risky', color: '#f59e0b' };
        if (activeConstraints.length === 2) return { text: 'Smaller space → More reliable', color: '#eab308' };
        if (activeConstraints.length === 3) return { text: 'Tight space → Predictable', color: '#22c55e' };
        return { text: 'Minimal space → Controlled', color: '#10b981' };
    };

    const status = getSpaceStatus();

    return (
        <div className={styles.container}>
            {/* Instruction */}
            <div className={styles.instruction}>
                Toggle constraints to shrink the completion space:
            </div>

            {/* Constraint toggles */}
            <div className={styles.toggles}>
                {constraints.map(c => {
                    const active = activeConstraints.includes(c.id);
                    return (
                        <motion.button
                            key={c.id}
                            className={`${styles.toggle} ${active ? styles.active : ''}`}
                            onClick={() => toggleConstraint(c.id)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={styles.toggleIcon}>{c.icon}</span>
                            <div className={styles.toggleText}>
                                <div className={styles.toggleLabel}>{c.label}</div>
                                <div className={styles.toggleDesc}>{c.description}</div>
                            </div>
                            <div className={`${styles.toggleSwitch} ${active ? styles.on : ''}`}>
                                <div className={styles.toggleKnob} />
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Completion Space Visualization */}
            <div className={styles.spaceContainer}>
                <div className={styles.spaceLabel}>Completion Space</div>
                <div className={styles.space}>
                    <AnimatePresence>
                        {Array(totalDots).fill(null).map((_, i) => (
                            i < activeDots && (
                                <motion.div
                                    key={i}
                                    className={styles.dot}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ delay: i * 0.02 }}
                                    style={{
                                        background: i === 0 && activeConstraints.length >= 3
                                            ? '#10b981'
                                            : 'rgba(239, 68, 68, 0.6)'
                                    }}
                                />
                            )
                        ))}
                    </AnimatePresence>
                    {activeDots === 1 && (
                        <div className={styles.targetLabel}>✓ Your output</div>
                    )}
                </div>
                <div
                    className={styles.statusBadge}
                    style={{ background: `${status.color}20`, borderColor: status.color }}
                >
                    <span style={{ color: status.color }}>{status.text}</span>
                </div>
            </div>

            {/* Insight reveal */}
            <AnimatePresence>
                {showInsight && (
                    <motion.div
                        className={styles.insight}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        💡 <strong>The insight:</strong> Every constraint you add eliminates
                        plausible-but-wrong outputs. Fewer options = higher reliability.
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CompletionSpaceVisualizer;
