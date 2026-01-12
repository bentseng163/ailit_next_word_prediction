import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AgentBriefBuilder.module.css';

/*
 * INTERACTIVE SPEC: Agent Brief Builder
 * 
 * Goal: Teach learners to create proper task cards for AI agents.
 * 
 * UI:
 * - Form-based task card with required fields (Objective, Tools, Success check, Stop rules)
 * - Tool permissions as toggles (Docs read, Tickets write, Calendar read, Email draft, etc.)
 * - A "Risk meter" updates as permissions expand
 * 
 * Grading:
 * - Must include: Objective (1 sentence), at least 2 constraints, measurable success check, at least 1 stop rule
 * - If tool permissions are broad without constraints, warn about high risk
 * - Score out of 10 + suggestions to tighten
 */

const AgentBriefBuilder = ({ onComplete }) => {
    const [objective, setObjective] = useState('');
    const [constraints, setConstraints] = useState({
        noExternalShare: false,
        askBeforeDelete: true,
        useApprovedSources: false,
        limitToScope: true
    });
    const [tools, setTools] = useState({
        docsRead: true,
        docsWrite: false,
        ticketsRead: true,
        ticketsWrite: false,
        calendarRead: false,
        emailDraft: false,
        emailSend: false,
        webSearch: true
    });
    const [successCheck, setSuccessCheck] = useState('');
    const [stopRule, setStopRule] = useState('');
    const [showResults, setShowResults] = useState(false);

    const toolsList = [
        { id: 'docsRead', label: '📄 Read docs', risk: 1 },
        { id: 'docsWrite', label: '✏️ Edit docs', risk: 3 },
        { id: 'ticketsRead', label: '🎫 Read tickets', risk: 1 },
        { id: 'ticketsWrite', label: '📝 Create tickets', risk: 3 },
        { id: 'calendarRead', label: '📅 Read calendar', risk: 2 },
        { id: 'emailDraft', label: '📧 Draft emails', risk: 2 },
        { id: 'emailSend', label: '📤 Send emails', risk: 5 },
        { id: 'webSearch', label: '🌐 Web search', risk: 2 },
    ];

    const constraintsList = [
        { id: 'noExternalShare', label: 'Do not share externally' },
        { id: 'askBeforeDelete', label: 'Ask before deleting' },
        { id: 'useApprovedSources', label: 'Use approved sources only' },
        { id: 'limitToScope', label: 'Stay within defined scope' },
    ];

    const toggleTool = (id) => {
        if (showResults) return;
        setTools({ ...tools, [id]: !tools[id] });
    };

    const toggleConstraint = (id) => {
        if (showResults) return;
        setConstraints({ ...constraints, [id]: !constraints[id] });
    };

    const calculateRisk = () => {
        let risk = 0;
        toolsList.forEach(tool => {
            if (tools[tool.id]) risk += tool.risk;
        });

        // Constraints reduce risk
        const activeConstraints = Object.values(constraints).filter(Boolean).length;
        risk -= activeConstraints * 2;

        return Math.max(0, Math.min(100, risk * 5));
    };

    const getScore = () => {
        let score = 0;
        let feedback = [];

        // Objective (3 points)
        if (objective.length >= 10) {
            score += 3;
        } else {
            feedback.push("Objective is too vague or missing");
        }

        // Constraints (2 points)
        const activeConstraints = Object.values(constraints).filter(Boolean).length;
        if (activeConstraints >= 2) {
            score += 2;
        } else {
            feedback.push("Need at least 2 constraints to limit agent behavior");
        }

        // Success check (3 points)
        if (successCheck.length >= 5) {
            score += 3;
        } else {
            feedback.push("Success check should be measurable");
        }

        // Stop rule (2 points)
        if (stopRule.length >= 5) {
            score += 2;
        } else {
            feedback.push("Stop rule prevents endless loops");
        }

        // Risk penalty
        const riskLevel = calculateRisk();
        if (riskLevel > 60 && activeConstraints < 3) {
            feedback.push("⚠️ Broad permissions without tight constraints = high drift risk");
        }

        return { score, feedback, total: 10 };
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const risk = calculateRisk();
    const { score, feedback } = getScore();
    const canSubmit = objective.length > 0 || successCheck.length > 0 || stopRule.length > 0;

    return (
        <div className={styles.container}>
            {/* Objective */}
            <div className={styles.section}>
                <label className={styles.label}>🎯 Objective</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g., Research Q4 market trends and summarize findings"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    disabled={showResults}
                />
            </div>

            {/* Tool Permissions */}
            <div className={styles.section}>
                <label className={styles.label}>🔧 Tool Permissions</label>
                <div className={styles.toolGrid}>
                    {toolsList.map(tool => (
                        <button
                            key={tool.id}
                            className={`${styles.toolBtn} ${tools[tool.id] ? styles.toolActive : ''}`}
                            onClick={() => toggleTool(tool.id)}
                        >
                            {tool.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Risk Meter */}
            <div className={styles.riskMeter}>
                <div className={styles.riskHeader}>
                    <span>⚡ Risk Level</span>
                    <span style={{ color: risk > 60 ? '#ef4444' : risk > 30 ? '#f59e0b' : '#10b981' }}>
                        {risk > 60 ? 'High' : risk > 30 ? 'Medium' : 'Low'}
                    </span>
                </div>
                <div className={styles.riskTrack}>
                    <motion.div
                        className={styles.riskFill}
                        animate={{ width: `${risk}%` }}
                        style={{ backgroundColor: risk > 60 ? '#ef4444' : risk > 30 ? '#f59e0b' : '#10b981' }}
                    />
                </div>
            </div>

            {/* Constraints */}
            <div className={styles.section}>
                <label className={styles.label}>🔒 Constraints</label>
                <div className={styles.constraintsList}>
                    {constraintsList.map(c => (
                        <button
                            key={c.id}
                            className={`${styles.constraintBtn} ${constraints[c.id] ? styles.constraintActive : ''}`}
                            onClick={() => toggleConstraint(c.id)}
                        >
                            <span className={styles.checkbox}>{constraints[c.id] ? '✓' : ''}</span>
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Success Check */}
            <div className={styles.section}>
                <label className={styles.label}>✅ Success Check (done when...)</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g., Summary doc created with 5+ sources cited"
                    value={successCheck}
                    onChange={(e) => setSuccessCheck(e.target.value)}
                    disabled={showResults}
                />
            </div>

            {/* Stop Rule */}
            <div className={styles.section}>
                <label className={styles.label}>🛑 Stop Rule (stop if...)</label>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g., Error occurs, or 3+ failed attempts"
                    value={stopRule}
                    onChange={(e) => setStopRule(e.target.value)}
                    disabled={showResults}
                />
            </div>

            {/* Submit */}
            {canSubmit && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Evaluate Task Card
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
                        <div className={styles.scoreRow}>
                            <span>Task Card Score:</span>
                            <span className={styles.score} style={{
                                color: score >= 8 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444'
                            }}>
                                {score}/10
                            </span>
                        </div>

                        {feedback.length > 0 && (
                            <div className={styles.feedbackList}>
                                {feedback.map((f, i) => (
                                    <div key={i} className={styles.feedbackItem}>{f}</div>
                                ))}
                            </div>
                        )}

                        <div className={styles.insight}>
                            💡 <strong>Key insight:</strong> If humans need clarity to do a job, agents do too.
                            Objective + Constraints + Stop rules = controlled delegation.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AgentBriefBuilder;
