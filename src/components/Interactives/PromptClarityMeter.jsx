import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PromptClarityMeter.module.css';
import { AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';

const PromptClarityMeter = ({ onComplete }) => {
    const [selected, setSelected] = useState(null); // 'vague' or 'structured'

    const handleSelect = (type) => {
        setSelected(type);
        if (type === 'structured' && onComplete) onComplete();
    };

    const getData = () => {
        if (selected === 'vague') return {
            risk: 90,
            riskLabel: "High Re-Roll Risk",
            iterations: "12-20",
            previews: ["p1_bad.png", "p2_bad.png", "p3_bad.png"]
        };
        if (selected === 'structured') return {
            risk: 35,
            riskLabel: "Medium-Low Re-Roll Risk",
            iterations: "2-5",
            previews: ["p1_good.png", "p2_good.png", "p3_good.png"]
        };
        return null;
    };

    const data = getData();

    // Placeholder Visual Generation for Previews
    const renderPreview = (type, index) => {
        const isBad = type === 'vague';
        // Randomize the "Bad" ones visually
        const hue = isBad ? (index * 60) : 210;
        const blur = isBad ? '4px' : '0px';
        const label = isBad ? '???' : 'Consistent';

        return (
            <div
                className={styles.miniThumb}
                style={{ filter: `hue-rotate(${hue}deg) blur(${blur})` }}
            >
                {label}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.options}>
                <div
                    className={`${styles.box} ${selected === 'vague' ? styles.selectedVague : ''}`}
                    onClick={() => handleSelect('vague')}
                >
                    <div className={styles.boxHeader}>Vague Prompt</div>
                    <div className={styles.promptText}>
                        "Make a cool futuristic city, neon, dark."
                    </div>
                </div>

                <div
                    className={`${styles.box} ${selected === 'structured' ? styles.selectedStructured : ''}`}
                    onClick={() => handleSelect('structured')}
                >
                    <div className={styles.boxHeader}>Structured Prompt</div>
                    <div className={styles.promptText}>
                        "A cinematic wide shot of a rainy cyberpunk city street at night, lit by neon blue and pink signs, highly detailed, realistic texture."
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {selected && (
                    <motion.div
                        key={selected}
                        className={styles.results}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className={styles.metrics}>
                            <div className={styles.metric}>
                                <div className={styles.metricLabel}>Re-Roll Risk</div>
                                <div className={styles.meterTrack}>
                                    <motion.div
                                        className={styles.meterFill}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${data.risk}%`, backgroundColor: selected === 'vague' ? '#f59e0b' : '#10b981' }}
                                    />
                                </div>
                                <div className={styles.metricValue} style={{ color: selected === 'vague' ? '#f59e0b' : '#10b981' }}>
                                    {data.riskLabel}
                                </div>
                            </div>
                            <div className={styles.metric}>
                                <div className={styles.metricLabel}>Expected Attempts</div>
                                <div className={styles.bigNumber}>{data.iterations}</div>
                            </div>
                        </div>

                        <div className={styles.previewSection}>
                            <div className={styles.previewLabel}>Generated Preview (Simulated):</div>
                            <div className={styles.thumbnails}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} className={styles.thumbWrapper}>
                                        {renderPreview(selected, i)}
                                    </div>
                                ))}
                            </div>
                            <div className={styles.caption}>
                                {selected === 'vague'
                                    ? "Result: High variance. You'll spend hours re-rolling to find a good one."
                                    : "Result: Coherent outputs. Constraints narrow the 'likely' space."}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PromptClarityMeter;
