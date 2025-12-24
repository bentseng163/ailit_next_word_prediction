import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BrandDriftSpotter.module.css';
import { AlertTriangle, CheckCircle, Search } from 'lucide-react';

const BrandDriftSpotter = ({ onComplete }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const cards = [
        {
            id: 1,
            type: "safe",
            label: "Option A",
            visual: "generic_thermostat", // Placeholder logic
            feedback: "Safe, but generic. The logo is missing, but at least it's not wrong."
        },
        {
            id: 2,
            type: "risk",
            label: "Option B",
            visual: "glitch_thermostat",
            feedback: "DRIFT DETECTED! Look closely at the logo—it's a hallucinated swirl, and the buttons are uneven. This damages trust."
        },
        {
            id: 3,
            type: "safe",
            label: "Option C",
            visual: "good_thermostat",
            feedback: "Clean image. Product details are correct. This is the safest pick."
        }
    ];

    const handleSelect = (id) => {
        setSelectedId(id);
        setShowResult(true);
        if (id === 2 && onComplete) onComplete();
    };

    const getVisual = (type) => {
        if (type === 'risk') {
            return (
                <div className={`${styles.placeholderVisual} ${styles.riskVisual}`}>
                    <div className={styles.thermostatShape}>
                        <div className={styles.screen}>72°</div>
                        <div className={styles.logoGlitch}>S̷m̷a̷r̷t̷</div>
                    </div>
                    <div className={styles.driftLabel}>Drift Risk</div>
                </div>
            );
        }
        return (
            <div className={`${styles.placeholderVisual} ${styles.safeVisual}`}>
                <div className={styles.thermostatShape}>
                    <div className={styles.screen}>72°</div>
                    <div className={styles.logoClean}>Smart</div>
                </div>
            </div>
        );
    };

    const selectedCard = cards.find(c => c.id === selectedId);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Tap the image that shows <strong>Brand Drift</strong> (hallucinated details).
            </div>

            <div className={styles.grid}>
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        className={`${styles.card} ${selectedId === card.id ? styles.selected : ''}`}
                        onClick={() => handleSelect(card.id)}
                        whileTap={{ scale: 0.98 }}
                    >
                        {getVisual(card.type)}
                        <div className={styles.cardLabel}>{card.label}</div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {showResult && selectedCard && (
                    <motion.div
                        className={`${styles.feedbackBox} ${selectedCard.type === 'risk' ? styles.correct : styles.incorrect}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.feedbackHeader}>
                            {selectedCard.type === 'risk' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                            <span>{selectedCard.type === 'risk' ? "Correct! You spotted the drift." : "Not quite drift..."}</span>
                        </div>
                        <p className={styles.feedbackText}>
                            {selectedCard.feedback}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BrandDriftSpotter;
