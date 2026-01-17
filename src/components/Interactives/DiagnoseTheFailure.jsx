import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DiagnoseTheFailure.module.css';

/*
 * INTERACTIVE: Diagnose the Failure
 * 
 * Goal: Given a bad AI output, identify WHERE the completion space was too large
 * Learners practice the diagnostic mindset: "What did I leave ambiguous?"
 */

const DiagnoseTheFailure = ({ onComplete }) => {
    const [currentCase, setCurrentCase] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const cases = [
        {
            id: 1,
            scenario: "Product Brief Generator",
            prompt: "Write a product brief for our new feature.",
            badOutput: "Our new feature will revolutionize the way users interact with our platform through innovative technology and seamless integration...",
            problem: "Generic marketing speak, no actual details",
            correctAnswer: 'context',
            options: [
                { id: 'context', label: 'Missing Context', explanation: 'The model doesn\'t know WHAT feature, WHO the audience is, or WHY it matters. It filled the void with buzzwords.' },
                { id: 'constraints', label: 'Missing Constraints', explanation: 'While constraints would help, the core issue is lack of information about the feature itself.' },
                { id: 'output', label: 'Missing Output Format', explanation: 'Format helps, but the model can\'t write good content about something it knows nothing about.' }
            ]
        },
        {
            id: 2,
            scenario: "Technical Documentation",
            prompt: "You are a senior engineer. Document the authentication flow. Be thorough.",
            badOutput: "The authentication flow handles user login. It validates credentials. If valid, access is granted. Security is important to consider. Error handling should be robust...",
            problem: "Vague, no actionable detail despite the persona",
            correctAnswer: 'context',
            options: [
                { id: 'persona', label: 'Wrong Persona', explanation: 'The persona is fine—the model knows to be technical. It just doesn\'t have the actual system details to document.' },
                { id: 'context', label: 'Missing Context', explanation: 'Correct! "Be thorough" isn\'t helpful when the model doesn\'t know YOUR specific auth flow. It made up generics.' },
                { id: 'output', label: 'Missing Output Format', explanation: 'A format would help structure, but the model literally doesn\'t know what to put IN that structure.' }
            ]
        },
        {
            id: 3,
            scenario: "Competitive Analysis Memo",
            prompt: "As a strategy consultant, analyze our competitors. Be concise. Output as bullet points.",
            badOutput: "• Competitors are growing\n• Market is competitive\n• Differentiation is key\n• Pricing strategies vary\n• Customer acquisition is challenging",
            problem: "True but useless statements",
            correctAnswer: 'context',
            options: [
                { id: 'constraints', label: 'Weak Constraints', explanation: '"Be concise" is a constraint, but the model has nothing specific to BE concise about.' },
                { id: 'output', label: 'Bad Output Format', explanation: 'It delivered bullet points as asked. The problem is the CONTENT, not the format.' },
                { id: 'context', label: 'Missing Context', explanation: 'Correct! Which industry? Which competitors? What data? Without context, the model produced true-but-generic statements.' }
            ]
        }
    ];

    const currentCaseData = cases[currentCase];

    const handleSelect = (id) => {
        if (showFeedback) return;
        setSelected(id);
    };

    const handleSubmit = () => {
        setShowFeedback(true);
        if (currentCase === cases.length - 1 && selected === currentCaseData.correctAnswer) {
            onComplete && onComplete();
        }
    };

    const handleNext = () => {
        if (currentCase < cases.length - 1) {
            setCurrentCase(currentCase + 1);
            setSelected(null);
            setShowFeedback(false);
        } else {
            onComplete && onComplete();
        }
    };

    const isCorrect = selected === currentCaseData.correctAnswer;
    const selectedOption = currentCaseData.options.find(o => o.id === selected);

    return (
        <div className={styles.container}>
            {/* Progress */}
            <div className={styles.progress}>
                {cases.map((_, i) => (
                    <div
                        key={i}
                        className={`${styles.dot} ${i === currentCase ? styles.active : ''} ${i < currentCase ? styles.complete : ''}`}
                    />
                ))}
            </div>

            {/* Case Card */}
            <div className={styles.caseCard}>
                <div className={styles.caseNum}>Case {currentCaseData.id}/3: {currentCaseData.scenario}</div>

                <div className={styles.promptBox}>
                    <div className={styles.promptLabel}>The Prompt:</div>
                    <div className={styles.promptText}>"{currentCaseData.prompt}"</div>
                </div>

                <div className={styles.outputBox}>
                    <div className={styles.outputLabel}>❌ The Bad Output:</div>
                    <div className={styles.outputText}>"{currentCaseData.badOutput}"</div>
                    <div className={styles.problemTag}>{currentCaseData.problem}</div>
                </div>
            </div>

            {/* Question */}
            <div className={styles.question}>
                What was left ambiguous?
            </div>

            {/* Options */}
            <div className={styles.options}>
                {currentCaseData.options.map(opt => (
                    <motion.button
                        key={opt.id}
                        className={`${styles.option} ${selected === opt.id ? styles.selected : ''} ${showFeedback && selected === opt.id ? (isCorrect ? styles.correct : styles.wrong) : ''}`}
                        onClick={() => handleSelect(opt.id)}
                        whileTap={{ scale: 0.98 }}
                        disabled={showFeedback}
                    >
                        {opt.label}
                    </motion.button>
                ))}
            </div>

            {/* Submit */}
            {selected && !showFeedback && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Check Answer
                </motion.button>
            )}

            {/* Feedback */}
            <AnimatePresence>
                {showFeedback && selectedOption && (
                    <motion.div
                        className={`${styles.feedback} ${isCorrect ? styles.success : styles.error}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.feedbackHeader}>
                            {isCorrect ? '✅ Correct!' : '❌ Not quite'}
                        </div>
                        <div className={styles.feedbackText}>
                            {selectedOption.explanation}
                        </div>
                        <button className={styles.nextBtn} onClick={handleNext}>
                            {currentCase < cases.length - 1 ? 'Next Case →' : 'Complete ✓'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DiagnoseTheFailure;
