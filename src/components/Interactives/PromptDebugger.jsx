import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PromptDebugger.module.css';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const PromptDebugger = ({ onComplete }) => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [feedback, setFeedback] = useState(null); // { isCorrect, text }

    const scenarios = [
        {
            id: 1,
            context: "Scenario: You need a sleek, modern ad for a summer sale.",
            prompt: "Make it cool and fresh.",
            resultDesc: "Result: The thermostat is covered in ice cubes and mint leaves.",
            options: [
                { id: 'ambiguity', label: "Prompt Ambiguity", correct: true, reason: "Correct! 'Cool' and 'Fresh' are ambiguous. The model took them literally. Use structural constraints like 'Modern Style' or 'Blue Palette'." },
                { id: 'glitch', label: "Model Glitch", correct: false, reason: "Not a glitch. The model did exactly what you asked—it just interpreted the vague metaphor physically." }
            ]
        },
        {
            id: 2,
            context: "Scenario: You need to feature YOUR specific product (The 'Nest-X').",
            prompt: "A photo of the Nest-X thermostat on a living room wall.",
            resultDesc: "Result: It looks like a thermostat, but the buttons are wrong and the shape is slightly off.",
            options: [
                { id: 'ref', label: "Missing Reference", correct: true, reason: "Correct! Text alone cannot define a specific physical product. You must provide a Reference Image to lock identity." },
                { id: 'more_text', label: "Need Detailed Description", correct: false, reason: "Even 1000 words won't guarantee pixel-perfect identity. You need a visual anchor (Reference Image)." }
            ]
        },
        {
            id: 3,
            context: "Scenario: You need a close-up screen showing specific UI text.",
            prompt: "Thermostat screen displaying text: '72° Comfort Mode Active'.",
            resultDesc: "Result: Screen reads: '72 dgrez comfart'.",
            options: [
                { id: 'limit', label: "Known Limitation", correct: true, reason: "Correct! Image models struggle with long, specific text. Don't fight it—generate the screen blank and add text in post." },
                { id: 'bad_prompt', label: "Bad Prompting", correct: false, reason: "Your prompt was fine. The model just isn't a typesetting engine. This is a technical limitation." }
            ]
        }
    ];

    const current = scenarios[currentScenario];

    const handleGuess = (option) => {
        setFeedback({
            isCorrect: option.correct,
            text: option.reason
        });
    };

    const handleNext = () => {
        setFeedback(null);
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(currentScenario + 1);
        } else {
            if (onComplete) onComplete();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.progress}>
                Case {currentScenario + 1} / {scenarios.length}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={current.id}
                    className={styles.card}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <div className={styles.context}>{current.context}</div>

                    <div className={styles.promptBox}>
                        <div className={styles.label}>Prompt:</div>
                        <div className={styles.promptText}>“{current.prompt}”</div>
                    </div>

                    <div className={styles.resultBox}>
                        <div className={styles.label}>Visual Outcome:</div>
                        <div className={styles.resultText}>{current.resultDesc}</div>
                    </div>

                    {!feedback ? (
                        <div className={styles.options}>
                            <p className={styles.question}>What's the root cause?</p>
                            {current.options.map(opt => (
                                <button
                                    key={opt.id}
                                    className={styles.optionBtn}
                                    onClick={() => handleGuess(opt)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className={`${styles.feedback} ${feedback.isCorrect ? styles.success : styles.error}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.feedbackHeader}>
                                {feedback.isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                                <span>{feedback.isCorrect ? "Spot on!" : "Not quite."}</span>
                            </div>
                            <p className={styles.feedbackText}>{feedback.text}</p>

                            {feedback.isCorrect && (
                                <button className={styles.nextBtn} onClick={handleNext}>
                                    {currentScenario < scenarios.length - 1 ? "Next Case" : "Finish Debugging"} <ArrowRight size={16} />
                                </button>
                            )}
                            {!feedback.isCorrect && (
                                <button className={styles.retryBtn} onClick={() => setFeedback(null)}>Try Again</button>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default PromptDebugger;
