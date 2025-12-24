import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import styles from './PromptSurgery.module.css';
import { Check, ArrowDown } from 'lucide-react';

const PromptSurgery = ({ onComplete }) => {
    // Initial State: Messy Prompt phrases
    const initialChips = [
        { id: '1', text: "Premium Thermostat", category: 'content' },
        { id: '2', text: "and make it cool", category: 'trash' }, // Vague/Filler
        { id: '3', text: "Soft Studio Lighting", category: 'style' },
        { id: '4', text: "No blurry text", category: 'constraint' },
        { id: '5', text: "High Resolution 4k", category: 'format' },
    ];

    const [pool, setPool] = useState(initialChips);
    const [bins, setBins] = useState({
        content: [],
        style: [],
        constraint: [],
        format: []
    });

    // Simple click-to-move logic (mobile friendly) instead of drag-and-drop complexity
    const handleChipClick = (chip) => {
        if (chip.category === 'trash') {
            // Remove from pool, don't add to bin (simulate deleting filler)
            setPool(pool.filter(c => c.id !== chip.id));
            return;
        }

        // Move to bin
        setBins(prev => ({
            ...prev,
            [chip.category]: [...prev[chip.category], chip]
        }));
        setPool(pool.filter(c => c.id !== chip.id));

        // Check completion
        if (pool.length === 1) { // This was the last one
            if (onComplete) onComplete();
        }
    };

    const isComplete = pool.length === 0;

    return (
        <div className={styles.container}>
            <div className={styles.poolArea}>
                <div className={styles.label}>Messy Prompt (Tap chunks to sort):</div>
                <div className={styles.chipGrid}>
                    {pool.map(chip => (
                        <motion.button
                            key={chip.id}
                            className={styles.chip}
                            onClick={() => handleChipClick(chip)}
                            layoutId={chip.id}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            {chip.text}
                        </motion.button>
                    ))}
                    {pool.length === 0 && (
                        <div className={styles.emptyMsg}>All sorted!</div>
                    )}
                </div>
            </div>

            <div className={styles.arrowArea}>
                <ArrowDown size={20} className={styles.arrowIcon} />
            </div>

            <div className={styles.binsArea}>
                <div className={styles.binRow}>
                    <Bin label="Content" items={bins.content} color="var(--color-accent-primary)" />
                    <Bin label="Style" items={bins.style} color="#ec4899" />
                </div>
                <div className={styles.binRow}>
                    <Bin label="Constraints" items={bins.constraint} color="#ef4444" />
                    <Bin label="Format" items={bins.format} color="#f59e0b" />
                </div>
            </div>

            {isComplete && (
                <motion.div
                    className={styles.successBox}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Check size={18} />
                    <span>Ambiguity Removed! Model will now likely succeed.</span>
                </motion.div>
            )}
        </div>
    );
};

const Bin = ({ label, items, color }) => (
    <div className={styles.bin} style={{ borderColor: color }}>
        <div className={styles.binLabel} style={{ color }}>{label}</div>
        <div className={styles.binContent}>
            {items.map(item => (
                <motion.div
                    key={item.id}
                    className={styles.binChip}
                    layoutId={item.id}
                >
                    {item.text}
                </motion.div>
            ))}
            {items.length === 0 && <span className={styles.placeholder}>...</span>}
        </div>
    </div>
);

export default PromptSurgery;
