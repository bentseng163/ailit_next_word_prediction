import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgentStepThrough.module.css';

/*
 * INTERACTIVE SPEC: Agent Step-Through Simulation
 * 
 * Goal: Practice catching agent drift at critical decision points.
 * 
 * UI:
 * - Show a timeline of agent steps (Step 1..8) with action summaries
 * - Learner has 3 buttons for each step: "Continue", "Ask for clarification", "Stop and escalate"
 * - Learner taps at points where the agent is about to drift
 * 
 * Feedback:
 * - If learner continues through a risky step, show consequence
 * - If learner stops/asks correctly, reward with explanation
 * 
 * Grading: Correct interventions at 2–3 critical steps
 */

const AgentStepThrough = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [decisions, setDecisions] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const steps = [
        {
            id: 1,
            action: "📄 Reading project brief document",
            status: "Agent accessing shared drive...",
            risk: 'safe',
            criticalPoint: false,
        },
        {
            id: 2,
            action: "🔍 Searching for Q4 market reports",
            status: "Found 12 relevant documents",
            risk: 'safe',
            criticalPoint: false,
        },
        {
            id: 3,
            action: "📊 Analyzing competitor data from external source",
            status: "Agent found an unverified blog post...",
            risk: 'medium',
            criticalPoint: true,
            wrongConsequence: "Agent used unverified data → Report contains questionable claims",
            rightAction: "ask",
            rightFeedback: "Good catch! The source wasn't in the approved list.",
        },
        {
            id: 4,
            action: "✏️ Drafting executive summary",
            status: "Creating 2-page summary...",
            risk: 'safe',
            criticalPoint: false,
        },
        {
            id: 5,
            action: "📧 About to email draft to client@external.com",
            status: "Preparing to send externally...",
            risk: 'high',
            criticalPoint: true,
            wrongConsequence: "Agent sent draft to external party → Confidentiality breach!",
            rightAction: "stop",
            rightFeedback: "Critical save! Task card said internal review first.",
        },
        {
            id: 6,
            action: "🔄 Retrying failed API call (attempt 4 of ?)",
            status: "Previous 3 attempts failed...",
            risk: 'medium',
            criticalPoint: true,
            wrongConsequence: "Agent looped 47 times → Wasted compute and time",
            rightAction: "stop",
            rightFeedback: "Nice! Stop rules prevent infinite loops.",
        },
        {
            id: 7,
            action: "✅ Saving final report to shared drive",
            status: "Completing task...",
            risk: 'safe',
            criticalPoint: false,
        },
    ];

    const handleDecision = (action) => {
        const step = steps[currentStep];
        const decision = {
            stepId: step.id,
            action,
            wasCorrect: step.criticalPoint
                ? action === step.rightAction
                : action === 'continue',
            step
        };

        const newDecisions = [...decisions, decision];
        setDecisions(newDecisions);

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowResults(true);
            onComplete && onComplete();
        }
    };

    const getScore = () => {
        const criticalSteps = decisions.filter(d => d.step.criticalPoint);
        const correctCritical = criticalSteps.filter(d => d.wasCorrect).length;
        const totalCritical = steps.filter(s => s.criticalPoint).length;
        return { correct: correctCritical, total: totalCritical };
    };

    const currentStepData = steps[currentStep];
    const { correct, total } = getScore();

    return (
        <div className={styles.container}>
            {!showResults ? (
                <>
                    {/* Progress */}
                    <div className={styles.progress}>
                        <span>Step {currentStep + 1} of {steps.length}</span>
                        <div className={styles.progressBar}>
                            <motion.div
                                className={styles.progressFill}
                                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Current Step Card */}
                    <motion.div
                        key={currentStep}
                        className={`${styles.stepCard} ${styles[currentStepData.risk]}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className={styles.stepAction}>{currentStepData.action}</div>
                        <div className={styles.stepStatus}>{currentStepData.status}</div>
                        {currentStepData.risk !== 'safe' && (
                            <div className={styles.riskBadge}>
                                {currentStepData.risk === 'high' ? '⚠️ High Risk' : '⚡ Check Needed'}
                            </div>
                        )}
                    </motion.div>

                    {/* Decision Buttons */}
                    <div className={styles.decisions}>
                        <button
                            className={styles.decisionBtn}
                            onClick={() => handleDecision('continue')}
                        >
                            ▶️ Continue
                        </button>
                        <button
                            className={`${styles.decisionBtn} ${styles.askBtn}`}
                            onClick={() => handleDecision('ask')}
                        >
                            ❓ Ask to Clarify
                        </button>
                        <button
                            className={`${styles.decisionBtn} ${styles.stopBtn}`}
                            onClick={() => handleDecision('stop')}
                        >
                            🛑 Stop & Escalate
                        </button>
                    </div>

                    {/* Last Decision Feedback */}
                    {decisions.length > 0 && (
                        <AnimatePresence>
                            <motion.div
                                key={decisions.length}
                                className={`${styles.feedback} ${decisions[decisions.length - 1].wasCorrect ? styles.feedbackGood : styles.feedbackBad}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                            >
                                {decisions[decisions.length - 1].wasCorrect
                                    ? (decisions[decisions.length - 1].step.criticalPoint
                                        ? `✓ ${decisions[decisions.length - 1].step.rightFeedback}`
                                        : "✓ Correct—this step was safe to continue.")
                                    : (decisions[decisions.length - 1].step.criticalPoint
                                        ? `✗ ${decisions[decisions.length - 1].step.wrongConsequence}`
                                        : "Unnecessary intervention—this step was routine.")
                                }
                            </motion.div>
                        </AnimatePresence>
                    )}
                </>
            ) : (
                /* Results Panel */
                <motion.div
                    className={styles.resultsPanel}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.scoreRow}>
                        <span>Critical Interventions:</span>
                        <span className={styles.score} style={{
                            color: correct === total ? '#10b981' : correct >= 1 ? '#f59e0b' : '#ef4444'
                        }}>
                            {correct}/{total}
                        </span>
                    </div>

                    <div className={styles.decisionReview}>
                        <div className={styles.reviewTitle}>📋 Your Decisions:</div>
                        {decisions.filter(d => d.step.criticalPoint).map((d, i) => (
                            <div key={i} className={`${styles.reviewItem} ${d.wasCorrect ? styles.reviewCorrect : styles.reviewWrong}`}>
                                <span>{d.step.action.split(' ').slice(0, 4).join(' ')}...</span>
                                <span>{d.wasCorrect ? '✓ Caught' : '✗ Missed'}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.insight}>
                        💡 <strong>Key insight:</strong> Agents run a plan→act→observe loop.
                        Without stop rules, they'll confidently continue through errors.
                        Your job: set the guardrails, not babysit every step.
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default AgentStepThrough;
