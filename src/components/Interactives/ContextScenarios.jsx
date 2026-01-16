import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContextScenarios.module.css';

/*
 * INTERACTIVE SPEC: Context Selection Scenarios
 * 
 * Goal: Given 3 business scenarios, pick optimal context resources
 * Each scenario has 6 options, learner picks 3-4 and gets accuracy feedback
 */

const ContextScenarios = ({ onComplete }) => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [selected, setSelected] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const scenarios = [
        {
            id: 1,
            title: "Email Summarizer for Executives",
            task: "Summarize long email threads into 3-bullet TL;DRs",
            resources: [
                { id: 'emails', name: 'Email Thread', icon: '📧', optimal: true },
                { id: 'format', name: 'Output Format Example', icon: '📋', optimal: true },
                { id: 'context', name: 'Meeting Context', icon: '📅', optimal: true },
                { id: 'brand', name: 'Brand Voice Guide', icon: '🎨', optimal: false },
                { id: 'org', name: 'Full Org Chart', icon: '🏢', optimal: false },
                { id: 'history', name: 'Past Summaries', icon: '📊', optimal: false }
            ],
            optimalCount: 3
        },
        {
            id: 2,
            title: "Code Review Assistant",
            task: "Review pull requests and suggest improvements",
            resources: [
                { id: 'diff', name: 'Code Diff', icon: '📝', optimal: true },
                { id: 'style', name: 'Style Guide', icon: '📏', optimal: true },
                { id: 'context', name: 'Related Files', icon: '📁', optimal: true },
                { id: 'ticket', name: 'Ticket/Issue', icon: '🎫', optimal: true },
                { id: 'bios', name: 'Developer Bios', icon: '👨‍💻', optimal: false },
                { id: 'roadmap', name: 'Product Roadmap', icon: '🗺️', optimal: false }
            ],
            optimalCount: 4
        },
        {
            id: 3,
            title: "Customer Churn Predictor",
            task: "Analyze customer data and flag high-risk accounts",
            resources: [
                { id: 'usage', name: 'Usage Metrics', icon: '📈', optimal: true },
                { id: 'tickets', name: 'Support Tickets', icon: '🎫', optimal: true },
                { id: 'contract', name: 'Contract Details', icon: '📄', optimal: true },
                { id: 'nps', name: 'NPS Scores', icon: '⭐', optimal: true },
                { id: 'brand', name: 'Marketing Copy', icon: '📣', optimal: false },
                { id: 'team', name: 'Sales Rep Notes', icon: '👤', optimal: false }
            ],
            optimalCount: 4
        }
    ];

    const scenario = scenarios[currentScenario];

    const toggleResource = (resourceId) => {
        if (showFeedback) return;

        if (selected.includes(resourceId)) {
            setSelected(selected.filter(id => id !== resourceId));
        } else if (selected.length < 4) {
            setSelected([...selected, resourceId]);
        }
    };

    const calculateScore = () => {
        const optimalIds = scenario.resources.filter(r => r.optimal).map(r => r.id);
        const correctSelections = selected.filter(id => optimalIds.includes(id));
        const wrongSelections = selected.filter(id => !optimalIds.includes(id));

        let accuracy = 60 + (correctSelections.length * 10) - (wrongSelections.length * 5);
        return Math.min(100, Math.max(60, accuracy));
    };

    const handleSubmit = () => {
        setShowFeedback(true);
    };

    const handleNext = () => {
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(currentScenario + 1);
            setSelected([]);
            setShowFeedback(false);
        } else {
            onComplete && onComplete();
        }
    };

    const accuracy = calculateScore();

    return (
        <div className={styles.container}>
            {/* Progress */}
            <div className={styles.progress}>
                {scenarios.map((_, i) => (
                    <div
                        key={i}
                        className={`${styles.dot} ${i === currentScenario ? styles.active : ''} ${i < currentScenario ? styles.complete : ''}`}
                    />
                ))}
            </div>

            {/* Scenario Card */}
            <div className={styles.scenarioCard}>
                <div className={styles.scenarioNum}>Scenario {scenario.id}/3</div>
                <div className={styles.scenarioTitle}>{scenario.title}</div>
                <div className={styles.scenarioTask}>Task: {scenario.task}</div>
            </div>

            {/* Resources */}
            <div className={styles.resourcesLabel}>
                Select {scenario.optimalCount} resources for optimal accuracy:
            </div>
            <div className={styles.resources}>
                {scenario.resources.map(resource => {
                    const isSelected = selected.includes(resource.id);
                    const isOptimal = resource.optimal;

                    return (
                        <motion.button
                            key={resource.id}
                            className={`${styles.resource} ${isSelected ? styles.selected : ''} ${showFeedback && isSelected ? (isOptimal ? styles.correct : styles.wrong) : ''}`}
                            onClick={() => toggleResource(resource.id)}
                            whileTap={{ scale: 0.95 }}
                            disabled={showFeedback}
                        >
                            <span className={styles.resourceIcon}>{resource.icon}</span>
                            <span className={styles.resourceName}>{resource.name}</span>
                            {isSelected && <span className={styles.checkmark}>✓</span>}
                        </motion.button>
                    );
                })}
            </div>

            {/* Submit */}
            {selected.length >= 2 && !showFeedback && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Check Accuracy
                </motion.button>
            )}

            {/* Feedback */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        className={styles.feedback}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.accuracyRow}>
                            <span>Accuracy:</span>
                            <span
                                className={styles.accuracyScore}
                                style={{ color: accuracy >= 90 ? '#10b981' : accuracy >= 75 ? '#f59e0b' : '#ef4444' }}
                            >
                                {accuracy}%
                            </span>
                        </div>
                        <div className={styles.feedbackText}>
                            {accuracy >= 90
                                ? '✅ Great selection! You picked the most relevant context.'
                                : accuracy >= 75
                                    ? '👍 Good, but some resources add noise without value.'
                                    : '⚠️ Some key context is missing or irrelevant.'
                            }
                        </div>
                        <button className={styles.nextBtn} onClick={handleNext}>
                            {currentScenario < scenarios.length - 1 ? 'Next Scenario →' : 'Complete ✓'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContextScenarios;
