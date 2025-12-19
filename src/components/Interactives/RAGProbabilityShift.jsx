import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RAGProbabilityShift.module.css';
import { Database, FileText, ArrowRight } from 'lucide-react';

const RAGProbabilityShift = ({ onComplete, scenario }) => {
    // Default Scenario: Apple (Fruit vs Tech) (Aligned with current user expectations but can be customized)
    const defaultScenario = {
        question: "Prompt: The user asks about 'Apple'...",
        noRagContext: "Model guesses based on general training data (Fruit? Tech?).",
        ragContext: "Retrieved Context: 'Apple Inc. released the new iPhone...'",
        items: [
            { word: "Pie", probBefore: 45, probAfter: 5, color: "var(--color-text-secondary)" },
            { word: "iPhone", probBefore: 40, probAfter: 85, color: "var(--color-accent-primary)" },
            { word: "Juice", probBefore: 10, probAfter: 5, color: "var(--color-text-secondary)" },
            { word: "MacBook", probBefore: 5, probAfter: 5, color: "var(--color-accent-primary)" }
        ]
    };

    const activeScenario = scenario || defaultScenario;

    const [hasRag, setHasRag] = useState(false);

    const handleToggle = () => {
        const newState = !hasRag;
        setHasRag(newState);
        if (newState && onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.question}>{activeScenario.question}</div>
            </div>

            <div className={styles.controls}>
                <button
                    className={`${styles.toggleBtn} ${!hasRag ? styles.active : ''}`}
                    onClick={() => handleToggle()}
                >
                    No Context
                </button>
                <div className={styles.arrow}>→</div>
                <button
                    className={`${styles.toggleBtn} ${hasRag ? styles.active : ''}`}
                    onClick={() => handleToggle()}
                >
                    + RAG Context
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={hasRag ? 'rag' : 'base'}
                    className={styles.contextBox}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                >
                    <div className={styles.contextLabel}>
                        {hasRag ? "System Prompt + Retrieval:" : "System Prompt Only:"}
                    </div>
                    <div className={`${styles.contextText} ${hasRag ? styles.highlight : ''}`}>
                        {hasRag ? activeScenario.ragContext : activeScenario.noRagContext}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className={styles.chart}>
                <div className={styles.graphTitle}>Next Word Probability:</div>
                {activeScenario.items.map((item, index) => (
                    <div key={item.word} className={styles.barRow}>
                        <div className={styles.barLabel}>{item.word}</div>
                        <div className={styles.barTrack}>
                            <motion.div
                                className={styles.barFill}
                                initial={{ width: `${item.probBefore}%` }}
                                animate={{ width: `${hasRag ? item.probAfter : item.probBefore}%` }}
                                transition={{ type: "spring", stiffness: 60 }}
                                style={{ backgroundColor: item.color }}
                            />
                            <div className={styles.probText}>
                                {hasRag ? item.probAfter : item.probBefore}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RAGProbabilityShift;
