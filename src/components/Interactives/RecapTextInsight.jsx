import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
// Reuse CSS from AmbiguityScenario to maintain visual consistency
import styles from './AmbiguityScenario.module.css';

const RecapTextInsight = ({ onComplete }) => {
    const [selected, setSelected] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const options = [
        { id: 'fluent', text: "It flows perfectly, so it feels true.", correct: true },
        { id: 'hallucination', text: "It invented a specific '40% efficiency' stat.", correct: true },
        { id: 'tone', text: "The confident tone hides the lack of source.", correct: true },
        { id: 'typo', text: "It has obvious grammatical errors.", correct: false }
    ];

    const toggleOption = (id) => {
        if (showFeedback) return;
        if (selected.includes(id)) {
            setSelected(selected.filter(i => i !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const checkExplore = () => {
        setShowFeedback(true);
        onComplete && onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.scenarioCard}>
                <div className={styles.scenarioLabel}>TEXT SCENARIO</div>
                <p style={{ fontStyle: 'italic' }}>
                    "The new Solar-X panel features a graphene coating that boosts efficiency by 40%..."
                </p>
                <p style={{ fontSize: '0.9rem', marginTop: '8px', opacity: 0.8 }}>
                    (Note: Our internal docs say nothing about graphene.)
                </p>
            </div>

            <div className={styles.question}>
                Why is this dangerous?
            </div>

            <div className={styles.optionsList}>
                {options.map((opt) => {
                    const isSelected = selected.includes(opt.id);
                    const statusClass = showFeedback
                        ? (opt.correct ? styles.correct : (isSelected ? styles.wrong : styles.neutral))
                        : (isSelected ? styles.selected : styles.unselected);

                    return (
                        <motion.button
                            key={opt.id}
                            className={clsx(styles.option, statusClass)}
                            onClick={() => toggleOption(opt.id)}
                            whileTap={!showFeedback ? { scale: 0.98 } : {}}
                        >
                            <div className={styles.checkbox}>
                                {showFeedback && opt.correct && '✓'}
                                {showFeedback && !opt.correct && isSelected && '✗'}
                                {!showFeedback && isSelected && '✓'}
                            </div>
                            <span className={styles.optText}>{opt.text}</span>
                        </motion.button>
                    );
                })}
            </div>

            {!showFeedback && selected.length > 0 && (
                <motion.button
                    className={styles.checkBtn}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={checkExplore}
                >
                    Check Analysis
                </motion.button>
            )}

            {showFeedback && (
                <motion.div
                    className={styles.feedbackBox}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <strong>Insight:</strong> The model predicted the <em>pattern</em> of a tech launch (exciting stats, buzzwords) but hallucinated the <em>truth</em> because it lacked grounding.
                </motion.div>
            )}
        </div>
    );
};

export default RecapTextInsight;
