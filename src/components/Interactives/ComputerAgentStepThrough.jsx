import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ComputerAgentStepThrough.module.css';

/*
 * INTERACTIVE SPEC: Computer Agent Step-Through
 * 
 * Goal: Teach learners to intervene at the right moments (ask/verify/stop)
 * to prevent misclicks, drift, and loops.
 * 
 * UI: Timeline of agent steps with Continue/Ask/Stop buttons
 * Grading: Score based on catching critical intervention points
 */

const ComputerAgentStepThrough = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [decisions, setDecisions] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const steps = [
        {
            id: 1,
            screen: "📊 Dashboard",
            action: "Open Reports tab",
            confidence: "high",
            risk: "low",
            correctAction: "continue",
            consequence: null
        },
        {
            id: 2,
            screen: "📁 Reports List",
            action: "Select 'Q4 Summary'",
            confidence: "high",
            risk: "low",
            correctAction: "continue",
            consequence: null
        },
        {
            id: 3,
            screen: "📄 Report View",
            action: "Click 'Export' button",
            confidence: "medium",
            risk: "medium",
            correctAction: "ask",
            consequence: "⚠️ Agent exported to wrong format (PDF instead of CSV). Data team can't process it."
        },
        {
            id: 4,
            screen: "💾 Export Dialog",
            action: "Select first account in dropdown",
            confidence: "low",
            risk: "high",
            correctAction: "ask",
            consequence: "🚨 Exported to wrong client account! Sent confidential data to external party."
        },
        {
            id: 5,
            screen: "✅ Export Complete",
            action: "Click 'Send Email' button",
            confidence: "high",
            risk: "high",
            correctAction: "stop",
            consequence: "🚨 Auto-sent email to 500 recipients with wrong attachment."
        },
        {
            id: 6,
            screen: "📧 Email Sent",
            action: "Return to dashboard",
            confidence: "high",
            risk: "low",
            correctAction: "continue",
            consequence: null
        }
    ];

    const handleDecision = (action) => {
        const step = steps[currentStep];
        const newDecision = {
            stepId: step.id,
            action: action,
            correct: action === step.correctAction,
            consequence: action === 'continue' && step.correctAction !== 'continue' ? step.consequence : null
        };

        const newDecisions = [...decisions, newDecision];
        setDecisions(newDecisions);

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
            onComplete && onComplete();
        }
    };

    const getScore = () => {
        const correctCount = decisions.filter(d => d.correct).length;
        return Math.round((correctCount / steps.length) * 10);
    };

    const getConsequences = () => {
        return decisions.filter(d => d.consequence);
    };

    const getTip = () => {
        const overTrust = decisions.filter(d => d.action === 'continue' && d.correct === false).length;
        const underTrust = decisions.filter(d => d.action !== 'continue' && d.correct === false).length;

        if (overTrust > underTrust) {
            return "💡 You tend to over-trust. Watch for low confidence + high risk signals.";
        } else if (underTrust > overTrust) {
            return "💡 You tend to under-trust. Some steps are safe to continue through.";
        }
        return "💡 Good balance! You're calibrated to intervene at the right moments.";
    };

    const step = steps[currentStep];

    return (
        <div className={styles.container}>
            {!showResults ? (
                <>
                    {/* Progress */}
                    <div className={styles.progress}>
                        Step {currentStep + 1} of {steps.length}
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Step Card */}
                    <motion.div
                        className={styles.stepCard}
                        key={step.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className={styles.screenLabel}>{step.screen}</div>
                        <div className={styles.actionLabel}>
                            Agent wants to: <strong>{step.action}</strong>
                        </div>
                        <div className={styles.indicators}>
                            <span className={`${styles.indicator} ${styles[step.confidence]}`}>
                                Confidence: {step.confidence}
                            </span>
                            <span className={`${styles.indicator} ${styles[`risk${step.risk.charAt(0).toUpperCase() + step.risk.slice(1)}`]}`}>
                                Risk: {step.risk}
                            </span>
                        </div>
                    </motion.div>

                    {/* Decision Buttons */}
                    <div className={styles.buttons}>
                        <button
                            className={`${styles.btn} ${styles.continueBtn}`}
                            onClick={() => handleDecision('continue')}
                        >
                            ▶️ Continue
                        </button>
                        <button
                            className={`${styles.btn} ${styles.askBtn}`}
                            onClick={() => handleDecision('ask')}
                        >
                            ❓ Ask/Clarify
                        </button>
                        <button
                            className={`${styles.btn} ${styles.stopBtn}`}
                            onClick={() => handleDecision('stop')}
                        >
                            🛑 Stop
                        </button>
                    </div>
                </>
            ) : (
                <motion.div
                    className={styles.results}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Score */}
                    <div className={styles.scoreRow}>
                        <span>Intervention Score:</span>
                        <span className={styles.score} style={{
                            color: getScore() >= 8 ? '#10b981' : getScore() >= 5 ? '#f59e0b' : '#ef4444'
                        }}>
                            {getScore()}/10
                        </span>
                    </div>

                    {/* Consequences */}
                    {getConsequences().length > 0 && (
                        <div className={styles.consequences}>
                            <div className={styles.consequenceTitle}>What went wrong:</div>
                            {getConsequences().map((d, i) => (
                                <div key={i} className={styles.consequenceItem}>
                                    {d.consequence}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tip */}
                    <div className={styles.tip}>{getTip()}</div>

                    {/* Insight */}
                    <div className={styles.insight}>
                        💡 <strong>Key insight:</strong> Agents need human checkpoints before irreversible actions.
                        Watch for low confidence + high risk signals.
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ComputerAgentStepThrough;
