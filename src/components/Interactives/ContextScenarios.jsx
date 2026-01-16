import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContextScenarios.module.css';

/*
 * INTERACTIVE SPEC: Context Selection Scenarios
 * 
 * Goal: Given 3 business scenarios, pick optimal context resources
 * Each scenario has scenario-specific feedback tied to learning objectives
 * 
 * UI Updates:
 * - White text in options for readability
 * - Submit button always visible but disabled until selection made
 * - Try Again + Next Challenge buttons when wrong
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
            optimalIds: ['emails', 'format', 'context'],
            feedback: {
                success: "🎯 Perfect! The email thread provides content, the format example defines output structure, and meeting context gives relevance. No noise added.",
                missing: "⚠️ You're missing key context. For summarization, you need: the source content (emails), an output format example, and relevant meeting context to understand importance.",
                tooMuch: "⚠️ Context rot alert! Brand voice, org charts, and past summaries add tokens but don't help the model summarize THIS email thread. Less is more."
            }
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
            optimalIds: ['diff', 'style', 'context', 'ticket'],
            feedback: {
                success: "🎯 Excellent! Code diff shows changes, style guide sets standards, related files provide context, and the ticket explains intent. All high-signal context.",
                missing: "⚠️ Missing essential context. Code review needs: the diff, coding standards, file context, and the issue being solved. Each reduces ambiguity.",
                tooMuch: "⚠️ Developer bios and roadmaps don't help review THIS code. They consume context window space that could hold more relevant file context."
            }
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
            optimalIds: ['usage', 'tickets', 'contract', 'nps'],
            feedback: {
                success: "🎯 Perfect! Usage metrics show engagement, support tickets reveal friction, contract details show commitment level, and NPS measures satisfaction. All churn signals.",
                missing: "⚠️ You're missing churn signals. Effective prediction needs: usage patterns, support history, contract status, and satisfaction scores.",
                tooMuch: "⚠️ Marketing copy and sales notes don't predict churn behavior—they're noise. Focus on behavioral and satisfaction data that actually signals risk."
            }
        }
    ];

    const scenario = scenarios[currentScenario];

    const toggleResource = (resourceId) => {
        if (showFeedback) return;

        if (selected.includes(resourceId)) {
            setSelected(selected.filter(id => id !== resourceId));
        } else {
            setSelected([...selected, resourceId]);
        }
    };

    const checkOptimal = () => {
        const optimalSet = new Set(scenario.optimalIds);
        const selectedSet = new Set(selected);

        // Check if exact match
        if (optimalSet.size !== selectedSet.size) return false;
        for (const id of optimalSet) {
            if (!selectedSet.has(id)) return false;
        }
        return true;
    };

    const getFeedbackType = () => {
        const isOptimal = checkOptimal();
        if (isOptimal) return 'success';

        const missingOptimal = scenario.optimalIds.filter(id => !selected.includes(id));
        const extraSelected = selected.filter(id => !scenario.optimalIds.includes(id));

        if (missingOptimal.length > 0 && extraSelected.length > 0) return 'tooMuch';
        if (missingOptimal.length > 0) return 'missing';
        return 'tooMuch';
    };

    const handleSubmit = () => {
        setShowFeedback(true);
    };

    const handleRetry = () => {
        setSelected([]);
        setShowFeedback(false);
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

    const isOptimal = checkOptimal();
    const feedbackType = getFeedbackType();

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
                Select the optimal context resources:
            </div>
            <div className={styles.resources}>
                {scenario.resources.map(resource => {
                    const isSelected = selected.includes(resource.id);
                    const isCorrect = scenario.optimalIds.includes(resource.id);

                    return (
                        <motion.button
                            key={resource.id}
                            className={`${styles.resource} ${isSelected ? styles.selected : ''} ${showFeedback && isSelected ? (isCorrect ? styles.correct : styles.wrong) : ''} ${showFeedback && !isSelected && isCorrect ? styles.missed : ''}`}
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

            {/* Submit - Always visible, disabled until selection */}
            {!showFeedback && (
                <button
                    className={`${styles.submitBtn} ${selected.length === 0 ? styles.disabled : ''}`}
                    onClick={handleSubmit}
                    disabled={selected.length === 0}
                >
                    Check Selection
                </button>
            )}

            {/* Feedback */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        className={styles.feedback}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={`${styles.feedbackText} ${styles[feedbackType]}`}>
                            {scenario.feedback[feedbackType]}
                        </div>

                        <div className={styles.buttonRow}>
                            {!isOptimal && (
                                <button className={styles.retryBtn} onClick={handleRetry}>
                                    Try Again
                                </button>
                            )}
                            <button className={styles.nextBtn} onClick={handleNext}>
                                {currentScenario < scenarios.length - 1
                                    ? (isOptimal ? 'Next Challenge →' : 'Skip to Next →')
                                    : 'Complete ✓'
                                }
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContextScenarios;
