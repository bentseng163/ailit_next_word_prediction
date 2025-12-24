import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PromptTemplateMaker.module.css';
import { Lock, Shuffle, CheckCircle, AlertTriangle } from 'lucide-react';

const PromptTemplateMaker = ({ onComplete }) => {
    // Scenario: Product Catalog
    // Goal: Consistent Look (Style/Background), Different Products (Subject)

    const initialChunks = [
        { id: 0, text: "Front-facing shot of", type: "composition", isVar: false, lockedLabel: "Front Shot", varLabel: "[Angle]" },
        { id: 1, text: "a sleek coffee maker", type: "subject", isVar: false, lockedLabel: "Coffee Maker", varLabel: "[Product]" },
        { id: 2, text: "on a marble counter", type: "background", isVar: false, lockedLabel: "Marble Counter", varLabel: "[Setting]" },
        { id: 3, text: "soft daylight, 4k", type: "style", isVar: false, lockedLabel: "Soft Daylight", varLabel: "[Lighting]" },
    ];

    const [chunks, setChunks] = useState(initialChunks);
    const [status, setStatus] = useState(null); // 'success', 'error'
    const [feedback, setFeedback] = useState("Tap blocks to toggle: KEEP (Consistent) or SWAP (Variable).");

    const toggleChunk = (id) => {
        const newChunks = chunks.map(c =>
            c.id === id ? { ...c, isVar: !c.isVar } : c
        );
        setChunks(newChunks);
        evaluate(newChunks);
    };

    const evaluate = (currentChunks) => {
        const subject = currentChunks.find(c => c.type === 'subject');
        const style = currentChunks.find(c => c.type === 'style');
        const bg = currentChunks.find(c => c.type === 'background');
        const comp = currentChunks.find(c => c.type === 'composition');

        // Logic for "Product Catalog"
        // MUST Vary: Subject (otherwise it's just one photo)
        // MUST Lock: Style, Background, Composition (for consistency)

        const subjectIsVar = subject.isVar;
        const styleIsVar = style.isVar;
        const bgIsVar = bg.isVar;
        // comp doesn't strictly matter as much, but let's say keep it locked for catalog

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
                <strong>Goal:</strong> Create a template for a <em>Series of Products</em>.
            </div>

            <div className={styles.builderArea}>
                {chunks.map(chunk => (
                    <motion.button
                        key={chunk.id}
                        className={`${styles.block} ${chunk.isVar ? styles.variable : styles.locked}`}
                        onClick={() => toggleChunk(chunk.id)}
                        whileTap={{ scale: 0.95 }}
                        layout
                    >
                        <div className={styles.icon}>
                            {chunk.isVar ? <Shuffle size={14} /> : <Lock size={14} />}
                        </div>
                        <div className={styles.blockLabel}>
                            {chunk.isVar ? "VARIABLE" : "LOCKED"}
                        </div>
                        <div className={styles.blockText}>
                            {chunk.isVar ? chunk.varLabel : chunk.text}
                        </div>
                    </motion.button>
                ))}
            </div>

            <div className={`${styles.feedbackBox} ${styles[status || 'neutral']}`}>
                <div className={styles.feedbackIcon}>
                    {status === 'success' && <CheckCircle size={20} />}
                    {status === 'error' && <AlertTriangle size={20} />}
                    {status === 'warn' && <AlertTriangle size={20} />}
                </div>
                <div className={styles.feedbackText}>
                    {feedback}
                </div>
            </div>
        </div>
    );
};

export default PromptTemplateMaker;
