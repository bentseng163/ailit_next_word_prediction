import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ProbabilityGraph.module.css';

const ProbabilityGraph = () => {
    const [step, setStep] = useState(0); // 0..4
    const [sentence, setSentence] = useState(["The", "cat", "sat", "on", "the"]);
    const [isComputing, setIsComputing] = useState(false);

    // Simulation data for "The cat sat on the [mat] [.] [It] [was] [warm]"
    const stepsData = [
        {
            // Step 0: Initial state "on the..."
            candidates: [
                { word: "mat", prob: 0.65, color: "var(--color-accent-primary)" },
                { word: "floor", prob: 0.20, color: "var(--color-accent-secondary)" },
                { word: "couch", prob: 0.10, color: "var(--color-warning)" },
                { word: "dog", prob: 0.05, color: "var(--color-text-muted)" },
            ],
            nextWord: "mat"
        },
        {
            // Step 1: "on the mat..."
            candidates: [
                { word: ".", prob: 0.85, color: "var(--color-accent-primary)" },
                { word: "and", prob: 0.10, color: "var(--color-accent-secondary)" },
                { word: "eating", prob: 0.05, color: "var(--color-warning)" }
            ],
            nextWord: "."
        },
        {
            // Step 2: "on the mat ."
            candidates: [
                { word: "It", prob: 0.40, color: "var(--color-accent-primary)" },
                { word: "The", prob: 0.30, color: "var(--color-accent-secondary)" },
                { word: "Then", prob: 0.20, color: "var(--color-warning)" },
                { word: "She", prob: 0.10, color: "var(--color-text-muted)" }
            ],
            nextWord: "It"
        },
        {
            // Step 3: "It..."
            candidates: [
                { word: "was", prob: 0.55, color: "var(--color-accent-primary)" },
                { word: "looked", prob: 0.25, color: "var(--color-accent-secondary)" },
                { word: "is", prob: 0.15, color: "var(--color-warning)" }
            ],
            nextWord: "was"
        },
        {
            // Step 4: "It was..."
            candidates: [
                { word: "warm", prob: 0.60, color: "var(--color-accent-primary)" },
                { word: "cold", prob: 0.20, color: "var(--color-accent-secondary)" },
                { word: "raining", prob: 0.10, color: "var(--color-warning)" }
            ],
            nextWord: "warm"
        }
    ];

    const currentStepData = stepsData[Math.min(step, stepsData.length - 1)];
    const isFinished = step >= stepsData.length;

    const handlePredict = () => {
        if (step < stepsData.length) {
            setIsComputing(true);
            setTimeout(() => {
                setSentence(prev => [...prev, stepsData[step].nextWord]);
                setStep(prev => prev + 1);
                setIsComputing(false);
            }, 1000); // 1.0s thinking delay
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.prompt}>
                Context: "{sentence.join(" ")}"
                {isComputing && <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className={styles.cursor}
                >|</motion.span>}
            </div>

            <div className={styles.graphContainer}>
                {!isFinished ? (
                    <div className={styles.graph}>
                        <div className={styles.label}>
                            {isComputing ? "Computing probabilities..." : "Probability Distribution for Next Word:"}
                        </div>
                        {isComputing ? (
                            <div className={styles.computingState}>
                                <motion.div
                                    className={styles.spinner}
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                />
                            </div>
                        ) : (
                            currentStepData.candidates.map((p, i) => (
                                <div key={p.word + step} className={styles.row}>
                                    <div className={styles.wordLabel}>{p.word}</div>
                                    <div className={styles.barArea}>
                                        <motion.div
                                            className={styles.bar}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${p.prob * 100}%` }}
                                            transition={{ delay: i * 0.05, duration: 0.3 }}
                                            style={{ backgroundColor: p.color }}
                                        />
                                        <span className={styles.probLabel}>{(p.prob * 100).toFixed(0)}%</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className={styles.finishedMsg}>
                        Generated complete sentence based on patterns!
                    </div>
                )}
            </div>

            <button
                className={styles.predictBtn}
                onClick={handlePredict}
                disabled={isFinished || isComputing}
            >
                {isFinished ? "Generation Complete" : (isComputing ? "Predicting..." : "Predict Next Word")}
            </button>
        </div>
    );
};

export default ProbabilityGraph;
