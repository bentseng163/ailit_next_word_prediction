import React, { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './AmbiguityScenario.module.css';

const AmbiguityScenario = ({ onComplete }) => {
    const [selected, setSelected] = useState([]);
    const [showFeedback, setShowFeedback] = useState(false);

    const options = [
        { id: 'confident', text: "Summary sounds confident but lacks evidence", correct: true },
        { id: 'themes', text: "Model invents themes not in the transcript", correct: true },
        { id: 'polish', text: "Stakeholders over-trust the polished text", correct: true },
        { id: 'safe', text: "No risk if the prompt is clear", correct: false }
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
                <div className={styles.scenarioLabel}>SCENARIO</div>
                <p>
                    "We'll use an LLM to summarize 50 customer interviews for the VP of Product."
                </p>
            </div>

            <div className={styles.question}>
                What are the hidden risks?
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
                    Check Risks
                </motion.button>
            )}

            {showFeedback && (
                <motion.div
                    className={styles.feedbackBox}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <strong>Key Insight:</strong> The model generates <em>plausible</em> summaries, which makes errors harder to spot than obvious gibberish.
                </motion.div>
            )}
        </div>
    );
};

export default AmbiguityScenario;
