import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PromptDoctor.module.css';

/*
 * INTERACTIVE SPEC: Prompt Doctor
 * 
 * Goal: Teach learners to convert vague prompts into a structured spec (Goal/Constraints/Format/Checks).
 * 
 * UI:
 * - Top: "Patient Prompt" in a messy text bubble showing a weak prompt
 * - Below: Draggable/tappable chips with spec components
 * - Four drop zones (bins): Goal / Constraints / Format / Checks
 * - After chips placed, "Generate" button appears
 * 
 * Grading:
 * - Score out of 10
 * - Required: At least 1 Goal, 2 Constraints (incl. accuracy), 1 Format, 1 Check
 * - Show feedback for missing categories
 * - After submission: show side-by-side Before/After preview
 */

const PromptDoctor = ({ onComplete }) => {
    const [placedChips, setPlacedChips] = useState({
        goal: [],
        constraints: [],
        format: [],
        checks: []
    });
    const [showResults, setShowResults] = useState(false);

    const patientPrompt = "Summarize this doc and make it compelling.";

    // Reduced to 6 chips (max 6 for cognitive load) - one essential per category + 2 extra
    const availableChips = [
        { id: 'audience', text: 'Audience: executive', category: 'goal', hint: 'Who is this for?' },
        { id: 'length', text: 'Length: 120 words max', category: 'format', hint: 'How long?' },
        { id: 'nofacts', text: 'Do not add new facts', category: 'constraints', hint: 'Critical for accuracy!' },
        { id: 'tone', text: 'Use neutral tone', category: 'constraints', hint: 'How should it sound?' },
        { id: 'cite', text: 'Cite sources from doc only', category: 'checks', hint: 'Where do facts come from?' },
        { id: 'assumptions', text: 'List assumptions made', category: 'checks', hint: 'What was inferred?' },
    ];

    const bins = [
        { id: 'goal', label: '🎯 Goal', color: '#3b82f6' },
        { id: 'constraints', label: '🔒 Constraints', color: '#8b5cf6' },
        { id: 'format', label: '📄 Format', color: '#06b6d4' },
        { id: 'checks', label: '✓ Checks', color: '#10b981' },
    ];

    const getUnplacedChips = () => {
        const allPlaced = Object.values(placedChips).flat();
        return availableChips.filter(c => !allPlaced.includes(c.id));
    };

    const placeChip = (chipId, binId) => {
        // Remove from any existing bin
        const newPlaced = { ...placedChips };
        Object.keys(newPlaced).forEach(key => {
            newPlaced[key] = newPlaced[key].filter(id => id !== chipId);
        });
        // Add to new bin
        newPlaced[binId] = [...newPlaced[binId], chipId];
        setPlacedChips(newPlaced);
    };

    const removeChip = (chipId) => {
        const newPlaced = { ...placedChips };
        Object.keys(newPlaced).forEach(key => {
            newPlaced[key] = newPlaced[key].filter(id => id !== chipId);
        });
        setPlacedChips(newPlaced);
    };

    const getChipById = (id) => availableChips.find(c => c.id === id);

    const calculateScore = () => {
        let score = 0;
        let feedback = [];

        // Goal (2 points)
        if (placedChips.goal.length >= 1) {
            score += 2;
        } else {
            feedback.push("Missing Goal → model will guess who this is for");
        }

        // Constraints (3 points - need at least 2, including accuracy)
        const hasAccuracyConstraint = placedChips.constraints.includes('nofacts');
        if (placedChips.constraints.length >= 2 && hasAccuracyConstraint) {
            score += 3;
        } else if (placedChips.constraints.length >= 1) {
            score += 1;
            if (!hasAccuracyConstraint) {
                feedback.push("Missing accuracy constraint → model may invent facts");
            }
        } else {
            feedback.push("Missing Constraints → model will fill gaps with assumptions");
        }

        // Format (2 points)
        if (placedChips.format.length >= 1) {
            score += 2;
        } else {
            feedback.push("Missing Format → output length/structure unpredictable");
        }

        // Checks (3 points)
        if (placedChips.checks.length >= 1) {
            score += 3;
        } else {
            feedback.push("Missing Checks → confident errors go undetected");
        }

        return { score, feedback, total: 10 };
    };

    const handleGenerate = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const totalPlaced = Object.values(placedChips).flat().length;
    const { score, feedback, total } = calculateScore();

    return (
        <div className={styles.container}>
            {/* Patient Prompt */}
            <div className={styles.patientCard}>
                <div className={styles.patientLabel}>🩺 PATIENT PROMPT</div>
                <div className={styles.patientText}>"{patientPrompt}"</div>
                <div className={styles.diagnosis}>Diagnosis: Vague. Model will guess. 😅</div>
            </div>

            {/* Available Chips */}
            {!showResults && (
                <div className={styles.chipPool}>
                    <div className={styles.poolLabel}>Tap a chip, then tap a bin to place it:</div>
                    <div className={styles.chips}>
                        {getUnplacedChips().map(chip => (
                            <ChipButton
                                key={chip.id}
                                chip={chip}
                                bins={bins}
                                onPlace={placeChip}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Drop Bins */}
            <div className={styles.binsGrid}>
                {bins.map(bin => (
                    <div key={bin.id} className={styles.bin} style={{ borderColor: bin.color }}>
                        <div className={styles.binLabel} style={{ color: bin.color }}>{bin.label}</div>
                        <div className={styles.binChips}>
                            {placedChips[bin.id].map(chipId => {
                                const chip = getChipById(chipId);
                                return (
                                    <motion.div
                                        key={chipId}
                                        className={styles.placedChip}
                                        style={{ backgroundColor: bin.color + '20', borderColor: bin.color }}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        onClick={() => !showResults && removeChip(chipId)}
                                    >
                                        {chip?.text}
                                        {!showResults && <span className={styles.removeX}>×</span>}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Generate Button */}
            {!showResults && totalPlaced >= 4 && (
                <motion.button
                    className={styles.generateBtn}
                    onClick={handleGenerate}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    ⚡ Generate with This Spec
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
                            <span className={styles.scoreLabel}>Spec Quality:</span>
                            <span className={styles.scoreValue} style={{
                                color: score >= 8 ? '#10b981' : score >= 5 ? '#f59e0b' : '#ef4444'
                            }}>
                                {score}/{total}
                            </span>
                        </div>

                        {feedback.length > 0 && (
                            <div className={styles.feedbackList}>
                                {feedback.map((f, i) => (
                                    <div key={i} className={styles.feedbackItem}>⚠️ {f}</div>
                                ))}
                            </div>
                        )}

                        <div className={styles.comparison}>
                            <div className={styles.beforeAfter}>
                                <div className={styles.beforeCard}>
                                    <div className={styles.baLabel}>❌ Before (Vague)</div>
                                    <p>"The document discusses various topics and has some interesting points that could be useful for stakeholders..."</p>
                                </div>
                                <div className={styles.afterCard}>
                                    <div className={styles.baLabel}>✅ After (Spec'd)</div>
                                    <p>
                                        <strong>Key Points:</strong><br />
                                        • Revenue up 12% YoY<br />
                                        • Churn risk in enterprise tier<br />
                                        • Q4 forecast pending review<br />
                                        <em>(Based on doc sections 2.1, 3.4)</em>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.insightBox}>
                            💡 <strong>Key Insight:</strong> Clear specs don't make AI smarter—they shrink the space of plausible outputs so fewer are wrong.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Sub-component for chip selection
const ChipButton = ({ chip, bins, onPlace }) => {
    const [showBinPicker, setShowBinPicker] = useState(false);

    return (
        <div className={styles.chipWrapper}>
            <motion.button
                className={styles.chip}
                onClick={() => setShowBinPicker(!showBinPicker)}
                whileTap={{ scale: 0.95 }}
            >
                {chip.text}
            </motion.button>

            <AnimatePresence>
                {showBinPicker && (
                    <motion.div
                        className={styles.binPicker}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        {bins.map(bin => (
                            <button
                                key={bin.id}
                                className={styles.binOption}
                                style={{ backgroundColor: bin.color }}
                                onClick={() => {
                                    onPlace(chip.id, bin.id);
                                    setShowBinPicker(false);
                                }}
                            >
                                {bin.label.split(' ')[0]}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PromptDoctor;
