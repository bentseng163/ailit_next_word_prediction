import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './VariationKnob.module.css';

const VariationKnob = ({ onComplete }) => {
    const [level, setLevel] = useState(0); // 0: Low, 1: Medium, 2: High

    const handleLevel = (l) => {
        setLevel(l);
        if (l === 2 && onComplete) onComplete();
    };

    // Simulated Output logic
    // Low: Consistent shapes, same colors
    // High: Chaotic shapes, different colors
    const renderThumbnail = (index) => {
        let hue = 200; // Blue base
        let rotate = 0;
        let scale = 1;

        if (level === 0) { // Low Variation
            hue = 200 + (index * 5); // Very similar
            rotate = 0;
        } else if (level === 1) { // Medium
            hue = 200 + (index * 20); // Some shift
            rotate = index * 5;
        } else { // High
            hue = index * 60; // Rainbow
            rotate = index * 45; // Crazy rotation
            scale = 0.5 + (index % 3) * 0.4;
        }

        return (
            <motion.div
                className={styles.thumb}
                animate={{
                    backgroundColor: `hsl(${hue}, 70%, 50%)`,
                    rotate: rotate,
                    scale: level === 2 ? scale : 1
                }}
            />
        );
    };

    const riskLevel = ["Low Risk", "Medium Risk", "High Drift Risk"];
    const riskColor = ["#10b981", "#facc15", "#ef4444"];

    return (
        <div className={styles.container}>
            <div className={styles.controls}>
                <div className={styles.knobLabel}>Variation Level</div>
                <div className={styles.buttons}>
                    {['Low', 'Medium', 'High'].map((label, i) => (
                        <button
                            key={label}
                            className={`${styles.btn} ${level === i ? styles.active : ''}`}
                            onClick={() => handleLevel(i)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.monitor}>
                <div className={styles.monitorHeader} style={{ color: riskColor[level] }}>
                    {riskLevel[level]}
                </div>
                <div className={styles.grid}>
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={styles.gridCell}>
                            {renderThumbnail(i)}
                        </div>
                    ))}
                </div>
                <div className={styles.monitorFooter}>
                    {level === 0 && "Consistent branding. Safe."}
                    {level === 1 && "Good for exploring ideas."}
                    {level === 2 && "Wildly creative. Brand identity lost."}
                </div>
            </div>
        </div>
    );
};

export default VariationKnob;
