import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './RAGProbabilityShift.module.css';
import { Database, FileText, ArrowRight } from 'lucide-react';

const RAGProbabilityShift = ({ onComplete }) => {
    const [hasContext, setHasContext] = useState(false);

    const toggleContext = () => {
        setHasContext(!hasContext);
        if (!hasContext && onComplete) onComplete();
    };

    const data = {
        noContext: [
            { word: "features", prob: 40 },
            { word: "issues", prob: 30 },
            { word: "trends", prob: 20 },
            { word: "people", prob: 10 }
        ],
        withContext: [
            { word: "Project Alpha", prob: 85, highlight: true },
            { word: "Q3 Roadmap", prob: 10 },
            { word: "features", prob: 5 }
        ]
    };

    const currentData = hasContext ? data.withContext : data.noContext;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>Prompt: "Summarize the key..."</span>
            </div>

            <button
                className={`${styles.toggleBtn} ${hasContext ? styles.active : ''}`}
                onClick={toggleContext}
            >
                {hasContext ? <FileText size={18} /> : <Database size={18} />}
                {hasContext ? "Docs Attached (RAG Active)" : "No Context (Raw LLM)"}
            </button>

            <div className={styles.graph}>
                <div className={styles.graphTitle}>Next Word Probability:</div>
                {currentData.map((item, idx) => (
                    <motion.div
                        key={item.word}
                        className={styles.barContainer}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className={styles.barLabel}>{item.word}</div>
                        <div className={styles.barWrapper}>
                            <motion.div
                                className={`${styles.bar} ${item.highlight ? styles.barHighlight : ''}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${item.prob}%` }}
                            />
                            <span className={styles.perc}>{item.prob}%</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RAGProbabilityShift;
