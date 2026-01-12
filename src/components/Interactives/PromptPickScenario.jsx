import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PromptPickScenario.module.css';

/*
 * INTERACTIVE SPEC: Prompt Pick Scenario
 * 
 * Goal: Practice choosing the best prompt for a time-constrained deliverable.
 * 
 * UI:
 * - Context card: "You need an update to send to a stakeholder. Must be accurate and concise."
 * - Show 4 prompt options as cards
 * - Learner selects one
 * - After selection: reveal consequences with 3 meters (Quality, Risk of hallucination, Time saved)
 * 
 * Grading:
 * - Correct if chosen prompt includes Goal + Format + At least 2 constraints + 1 check
 * - If weak prompt picked, show "Fix it" button with suggestions
 */

const PromptPickScenario = ({ onComplete }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const prompts = [
        {
            id: 'vague',
            text: '"Summarize this for my boss."',
            quality: 30,
            risk: 85,
            timeSaved: 90,
            isCorrect: false,
            feedback: "Vague goal, no format, no accuracy checks. The AI will guess everything—confidently.",
            fixes: ['Add: "For executive audience"', 'Add: "Do not invent facts"']
        },
        {
            id: 'partial',
            text: '"Write a 100-word summary for the VP."',
            quality: 55,
            risk: 60,
            timeSaved: 80,
            isCorrect: false,
            feedback: "Has audience and length, but no accuracy constraint. May hallucinate details.",
            fixes: ['Add: "Use only facts from document"', 'Add: "List any assumptions"']
        },
        {
            id: 'good',
            text: '"Write a 100-word summary for VP. Include 3 bullets. Use only facts from the doc. If anything is unclear, note it."',
            quality: 85,
            risk: 25,
            timeSaved: 70,
            isCorrect: true,
            feedback: "Goal ✓ Format ✓ Accuracy constraint ✓ Check ✓ — This is a spec, not a wish.",
            fixes: []
        },
        {
            id: 'overkill',
            text: '"As a senior analyst, create a comprehensive multi-section report with executive summary, detailed analysis, appendices, citations in APA format, glossary..."',
            quality: 40,
            risk: 45,
            timeSaved: 20,
            isCorrect: false,
            feedback: "Over-specified but misaligned. You wanted a quick update, not a thesis. Constraints should match the goal.",
            fixes: ['Simplify to match actual need', 'Remove unnecessary formality']
        }
    ];

    const handleSelect = (id) => {
        if (showResults) return;
        setSelectedId(id);
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const selected = prompts.find(p => p.id === selectedId);

    return (
        <div className={styles.container}>
            {/* Context Card */}
            <div className={styles.contextCard}>
                <div className={styles.contextLabel}>⏱️ SCENARIO</div>
                <p className={styles.contextText}>
                    You have <strong>20 minutes</strong> to create a one-page update for a stakeholder.
                    It must be <strong>accurate</strong> and <strong>concise</strong>.
                </p>
                <p className={styles.contextQuestion}>Which prompt do you use?</p>
            </div>

            {/* Prompt Options */}
            <div className={styles.promptGrid}>
                {prompts.map((prompt) => (
                    <motion.button
                        key={prompt.id}
                        className={`${styles.promptCard} ${selectedId === prompt.id ? styles.selected : ''} ${showResults && prompt.isCorrect ? styles.correct : ''} ${showResults && selectedId === prompt.id && !prompt.isCorrect ? styles.wrong : ''}`}
                        onClick={() => handleSelect(prompt.id)}
                        whileTap={!showResults ? { scale: 0.98 } : {}}
                    >
                        <span className={styles.promptText}>{prompt.text}</span>
                        {showResults && prompt.isCorrect && <span className={styles.badge}>✓ Best Choice</span>}
                    </motion.button>
                ))}
            </div>

            {/* Submit Button */}
            {selectedId && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Check My Choice
                </motion.button>
            )}

            {/* Results Panel */}
            <AnimatePresence>
                {showResults && selected && (
                    <motion.div
                        className={styles.resultsPanel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Meters */}
                        <div className={styles.meters}>
                            <MeterBar label="Quality" value={selected.quality} color="#10b981" />
                            <MeterBar label="Hallucination Risk" value={selected.risk} color="#ef4444" inverted />
                            <MeterBar label="Time Saved" value={selected.timeSaved} color="#3b82f6" />
                        </div>

                        {/* Feedback */}
                        <div className={`${styles.feedbackBox} ${selected.isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}>
                            <p>{selected.feedback}</p>
                        </div>

                        {/* Fix Suggestions */}
                        {selected.fixes.length > 0 && (
                            <div className={styles.fixBox}>
                                <div className={styles.fixLabel}>🔧 To fix this prompt:</div>
                                <ul className={styles.fixList}>
                                    {selected.fixes.map((fix, i) => (
                                        <li key={i}>{fix}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Key Insight */}
                        <div className={styles.insightBox}>
                            💡 <strong>Remember:</strong> A prompt is a spec. Goal + Constraints + Format + Checks = predictable outputs.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const MeterBar = ({ label, value, color, inverted = false }) => {
    const displayValue = inverted ? 100 - value : value;
    const isGood = inverted ? value < 40 : value > 60;

    return (
        <div className={styles.meter}>
            <div className={styles.meterHeader}>
                <span className={styles.meterLabel}>{label}</span>
                <span className={styles.meterValue} style={{ color: isGood ? '#10b981' : color }}>
                    {inverted ? (value < 40 ? 'Low ✓' : value > 60 ? 'High ⚠️' : 'Medium') : `${value}%`}
                </span>
            </div>
            <div className={styles.meterTrack}>
                <motion.div
                    className={styles.meterFill}
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                />
            </div>
        </div>
    );
};

export default PromptPickScenario;
