import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PromptTemplateMaker.module.css';
import { Lock, Shuffle, CheckCircle, AlertTriangle } from 'lucide-react';

const PromptTemplateMaker = ({ onComplete, config }) => {
    // config: { chunks: [], goal: "...", staticPrefix: "..." }

    const defaultChunks = [
        { id: 0, text: "Front-facing shot of", type: "composition", isVar: false, lockedLabel: "Front Shot", varLabel: "[Angle]" },
        { id: 1, text: "a sleek coffee maker", type: "subject", isVar: false, lockedLabel: "Coffee Maker", varLabel: "[Product]" },
        { id: 2, text: "on a marble counter", type: "background", isVar: false, lockedLabel: "Marble Counter", varLabel: "[Setting]" },
        { id: 3, text: "soft daylight, 4k", type: "style", isVar: false, lockedLabel: "Soft Daylight", varLabel: "[Lighting]" },
    ];

    const initialChunks = config?.chunks || defaultChunks;
    const goalText = config?.goal || "Create a template for a Series of Products.";
    const staticPrefix = config?.staticPrefix || "creating a product image:";

    const [chunks, setChunks] = useState(initialChunks);
    const [status, setStatus] = useState(null); // 'success', 'error'
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const toggleChunk = (id) => {
        if (submitted) return;
        const newChunks = chunks.map(c =>
            c.id === id ? { ...c, isVar: !c.isVar } : c
        );
        setChunks(newChunks);
        // Reset feedback on change if needed, or just wait for submit
        setStatus(null);
    };

    const handleSubmit = () => {
        evaluate(chunks);
        setSubmitted(true);
    };

    const evaluate = (currentChunks) => {
        const subject = currentChunks.find(c => c.type === 'subject');
        const style = currentChunks.find(c => c.type === 'style');
        const bg = currentChunks.find(c => c.type === 'background');

        const subjectIsVar = subject.isVar;
        const styleIsVar = style.isVar;
        const bgIsVar = bg.isVar;

        if (!subjectIsVar) {
            setStatus('error');
            setFeedback("⚠️ Problem: If you lock the Subject, you can't show different products! This template only generates coffee makers.");
            return;
        }

        if (styleIsVar || bgIsVar) {
            setStatus('warn');
            setFeedback("⚠️ Problem: If you vary Style or Background, your catalog will look messy. The products won't look like a set.");
            return;
        }

        setStatus('success');
        setFeedback("✅ Perfect! You locked the 'Brand DNA' (Style/Bg) but opened a slot for 'Product Variety'.");
        if (onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.scenario}>
                <strong>Goal:</strong> {goalText}
                <br /><span style={{ fontSize: '0.8em', opacity: 0.8 }}>Tap blocks to toggle: Lock (Keep) or Vary (Swap)</span>
            </div>

            <div className={styles.promptContainer}>
                <span className={styles.staticPrefix}>
                    {staticPrefix}
                </span>
                {chunks.map(chunk => (
                    <motion.span
                        key={chunk.id}
                        className={`${styles.chunk} ${chunk.isVar ? styles.variable : styles.locked}`}
                        onClick={() => toggleChunk(chunk.id)}
                        whileTap={{ scale: 0.95 }}
                        layout
                    >
                        <span className={styles.chunkIcon}>
                            {chunk.isVar ? <Shuffle size={12} /> : <Lock size={12} />}
                        </span>
                        {chunk.isVar ? chunk.varLabel : chunk.text}
                    </motion.span>
                ))}
            </div>

            {!submitted && (
                <button
                    className={`${styles.submitBtn} ${styles.activeSubmit}`}
                    onClick={handleSubmit}
                >
                    Run Template Test
                </button>
            )}

            {submitted && (
                <div className={`${styles.feedbackBox} ${styles[status]}`}>
                    <div className={styles.feedbackIcon}>
                        {status === 'success' && <CheckCircle size={20} />}
                        {status !== 'success' && <AlertTriangle size={20} />}
                    </div>
                    <div className={styles.feedbackText}>
                        {feedback}
                        {status !== 'success' && (
                            <div
                                style={{ marginTop: 8, textDecoration: 'underline', cursor: 'pointer', opacity: 0.8 }}
                                onClick={() => { setSubmitted(false); setStatus(null); }}
                            >
                                Try Again
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PromptTemplateMaker;
