import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HallucinationSpotter.module.css';
import { AlertTriangle, CheckCircle, Search } from 'lucide-react';

const HallucinationSpotter = ({ onComplete }) => {
    const [found, setFound] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const content = {
        title: "Medical Summary: Caffeine Benefits",
        text: [
            { id: 1, text: "Caffeine blocks adenosine receptors, reducing fatigue.", isFake: false },
            { id: 2, text: "It increases dopamine levels, improving mood and focus.", isFake: false },
            { id: 3, text: "A 2024 study by Dr. A. I. Bot confirms it cures 90% of migraines.", isFake: true, feedback: "Hallucination! No such study exists. LLMs often invent citations." },
            { id: 4, text: "Moderate consumption is generally considered safe.", isFake: false }
        ]
    };

    const handleTap = (item) => {
        if (found.includes(item.id)) return;

        if (item.isFake) {
            setFound([...found, item.id]);
            setShowSuccess(true);
            if (onComplete) onComplete();
        } else {
            alert("That statement is actually true/plausible. Keep looking for the fake citation.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Search size={20} />
                <span>Tap the suspicious claim</span>
            </div>

            <div className={styles.card}>
                <h3 className={styles.docTitle}>{content.title}</h3>
                <div className={styles.textBody}>
                    {content.text.map((item) => (
                        <motion.span
                            key={item.id}
                            className={`${styles.sentence} ${found.includes(item.id) ? styles.flagged : ''}`}
                            onClick={() => handleTap(item)}
                            whileTap={{ scale: 0.98 }}
                        >
                            {item.text}{' '}
                        </motion.span>
                    ))}
                </div>
            </div>

            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.successBox}
                >
                    <div className={styles.successTitle}>
                        <AlertTriangle size={20} color="var(--color-warning)" />
                        <span>Fake Citation Detected</span>
                    </div>
                    <p>{content.text.find(t => t.isFake).feedback}</p>
                </motion.div>
            )}
        </div>
    );
};

export default HallucinationSpotter;
