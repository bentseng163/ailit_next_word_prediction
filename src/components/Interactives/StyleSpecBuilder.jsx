import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './StyleSpecBuilder.module.css';
import { Sliders } from 'lucide-react';

const StyleSpecBuilder = ({ onComplete }) => {
    const specs = {
        Palette: ['Warm Neutral', 'Neon Cyber', 'Corporate Blue'],
        Lighting: ['Soft Studio', 'Dramatic Hard', 'Natural Daylight'],
        Lens: ['Wide 24mm', 'Portrait 85mm', 'Macro 100mm']
    };

    const [selections, setSelections] = useState({
        Palette: null,
        Lighting: null,
        Lens: null
    });

    const handleSelect = (category, value) => {
        const next = { ...selections, [category]: value };
        setSelections(next);

        // Check completion (all 3 selected)
        if (next.Palette && next.Lighting && next.Lens && onComplete) {
            onComplete();
        }
    };

    const filledCount = Object.values(selections).filter(Boolean).length;
    const progress = (filledCount / 3) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.meterBox}>
                <div className={styles.meterInfo}>
                    <span className={styles.meterLabel}>Consistency Score</span>
                    <span className={styles.meterValue}>{Math.round(progress)}%</span>
                </div>
                <div className={styles.meterTrack}>
                    <motion.div
                        className={styles.meterFill}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <div className={styles.form}>
                {Object.entries(specs).map(([category, options]) => (
                    <div key={category} className={styles.field}>
                        <div className={styles.categoryLabel}>{category}</div>
                        <div className={styles.chipGroup}>
                            {options.map(opt => (
                                <button
                                    key={opt}
                                    className={`${styles.chip} ${selections[category] === opt ? styles.activeChip : ''}`}
                                    onClick={() => handleSelect(category, opt)}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {progress === 100 && (
                <motion.div
                    className={styles.successMsg}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Sliders size={16} />
                    Style Profile Locked
                </motion.div>
            )}
        </div>
    );
};

export default StyleSpecBuilder;
