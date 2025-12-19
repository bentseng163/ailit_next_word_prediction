import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './LyricsCompleter.module.css';

const LyricsCompleter = ({ onComplete }) => {
    const [selected, setSelected] = useState(null); // 'mat' | 'soup' | null

    const prompt = {
        text: "The cat sat on the",
        options: [
            { id: "mat", text: "mat", type: "common", feedback: "Matches the most common pattern in English." },
            { id: "soup", text: "soup", type: "rare", feedback: "Grammatically possible, but statistically very rare." }
        ]
    };

    const handleOptionClick = (id) => {
        setSelected(id);
        if (onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.lyricBox}>
                <p className={styles.context}>Common Phrase Completion</p>
                <h3 className={styles.currentLine}>
                    {prompt.text} <span className={styles.missing}>{selected ? prompt.options.find(o => o.id === selected).text : "___"}</span>
                </h3>
            </div>

            <div className={styles.optionsGrid}>
                {prompt.options.map((opt) => (
                    <div key={opt.id} className={styles.optionWrapper}>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className={styles.optionButton}
                            onClick={() => handleOptionClick(opt.id)}
                            style={{
                                borderColor: selected === opt.id ? 'var(--color-accent-primary)' : 'transparent',
                                background: selected === opt.id ? 'var(--color-bg-card-highlight)' : 'var(--color-bg-card)'
                            }}
                        >
                            {opt.text}
                        </motion.button>

                        {/* Inline Feedback */}
                        {selected === opt.id && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className={styles.feedback}
                            >
                                {opt.feedback}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LyricsCompleter;
