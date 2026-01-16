import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CPCOMissingPart.module.css';

/*
 * INTERACTIVE SPEC: CPCO Missing Part Identifier
 * 
 * Goal: Given 3 scenarios with prompts, identify which CPCO part is missing
 * 
 * UI: Each scenario shows a prompt, learner picks which part is missing (4 options)
 * Grading: Feedback per scenario
 */

const CPCOMissingPart = ({ onComplete }) => {
    const [currentScenario, setCurrentScenario] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);

    const scenarios = [
        {
            id: 1,
            title: "E-commerce Product Descriptions",
            prompt: "Write product descriptions for our new sneaker line. Keep it under 100 words. Use energetic, youth-focused language. Output as a bulleted list with product name and description.",
            missing: 'context',
            explanation: "Who is the company? What brand voice? Who's the target customer? Without context about the brand and product positioning, the AI will generate generic descriptions.",
            options: [
                { id: 'context', label: 'C - Context' },
                { id: 'persona', label: 'P - Persona' },
                { id: 'constraints', label: 'C - Constraints' },
                { id: 'output', label: 'O - Output' }
            ]
        },
        {
            id: 2,
            title: "Legal Document Review",
            prompt: "You are a corporate lawyer with 15 years of experience in M&A. Our company is acquiring a startup and we need to review their contracts. We need to identify any clauses that could be problematic.",
            missing: 'output',
            explanation: "What format should the review take? A summary? A risk matrix? A checklist? Without defining the output structure, you'll get an unpredictable response format.",
            options: [
                { id: 'context', label: 'C - Context' },
                { id: 'persona', label: 'P - Persona' },
                { id: 'constraints', label: 'C - Constraints' },
                { id: 'output', label: 'O - Output' }
            ]
        },
        {
            id: 3,
            title: "Customer Feedback Analysis",
            prompt: "We're a B2B SaaS company that just launched a new dashboard feature. Analyze the following 50 customer feedback comments. Output a JSON with sentiment_score, key_themes array, and action_items array.",
            missing: 'persona',
            explanation: "Who should analyze this? A UX researcher? A product manager? A data analyst? Each would focus on different aspects and use different frameworks.",
            options: [
                { id: 'context', label: 'C - Context' },
                { id: 'persona', label: 'P - Persona' },
                { id: 'constraints', label: 'C - Constraints' },
                { id: 'output', label: 'O - Output' }
            ]
        }
    ];

    const handleSelect = (optionId) => {
        if (showFeedback) return;
        setAnswers({ ...answers, [currentScenario]: optionId });
        setShowFeedback(true);
    };

    const handleNext = () => {
        if (currentScenario < scenarios.length - 1) {
            setCurrentScenario(currentScenario + 1);
            setShowFeedback(false);
        } else {
            onComplete && onComplete();
        }
    };

    const scenario = scenarios[currentScenario];
    const isCorrect = answers[currentScenario] === scenario.missing;

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

            {/* Scenario */}
            <div className={styles.scenario}>
                <div className={styles.scenarioTitle}>
                    <span className={styles.scenarioNum}>#{scenario.id}</span>
                    {scenario.title}
                </div>

                <div className={styles.promptBox}>
                    <div className={styles.promptLabel}>The Prompt:</div>
                    <p className={styles.promptText}>"{scenario.prompt}"</p>
                </div>

                <div className={styles.question}>
                    Which CPCO component is <strong>missing</strong>?
                </div>

                {/* Options */}
                <div className={styles.options}>
                    {scenario.options.map(opt => {
                        const selected = answers[currentScenario] === opt.id;
                        const correct = opt.id === scenario.missing;

                        return (
                            <button
                                key={opt.id}
                                className={`${styles.option} ${selected ? styles.selected : ''} ${showFeedback && selected ? (isCorrect ? styles.correct : styles.wrong) : ''} ${showFeedback && correct && !selected ? styles.showCorrect : ''}`}
                                onClick={() => handleSelect(opt.id)}
                                disabled={showFeedback}
                            >
                                {opt.label}
                                {showFeedback && correct && <span className={styles.checkmark}>✓</span>}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Feedback */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackWrong}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.feedbackHeader}>
                            {isCorrect ? '✅ Correct!' : '❌ Not quite'}
                        </div>
                        <p>{scenario.explanation}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Next Button */}
            {showFeedback && (
                <motion.button
                    className={styles.nextBtn}
                    onClick={handleNext}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {currentScenario < scenarios.length - 1 ? 'Next Scenario →' : 'Complete ✓'}
                </motion.button>
            )}
        </div>
    );
};

export default CPCOMissingPart;
