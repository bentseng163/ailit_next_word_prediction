import React from 'react';
import { motion } from 'framer-motion';
import styles from './LandingPage.module.css';

const LandingPage = ({ onSelectModule }) => {
    const modules = [
        {
            id: 'lesson1',
            title: "How LLMs Actually Work",
            desc: "Stop treating AI like a human. Learn the mechanics of next-token prediction.",
            duration: "10 min",
            color: "var(--color-accent-primary)"
        },
        {
            id: 'lesson2',
            title: "Drafting with Probability",
            desc: "How to use constraints to shift the model's output distribution.",
            duration: "Coming Soon",
            color: "var(--color-accent-secondary)",
            locked: false
        }
    ];

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>AI Fundamentals</h1>
                <p className={styles.subtitle}>Bite-sized simulations for PMs</p>
            </header>

            <div className={styles.grid}>
                {modules.map((mod, i) => (
                    <motion.div
                        key={mod.id}
                        className={styles.card}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectModule(mod.id)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className={styles.cardHeader}>
                            <div
                                className={styles.icon}
                                style={{ backgroundColor: mod.color }}
                            />
                            <span className={styles.duration}>{mod.duration}</span>
                        </div>
                        <h3 className={styles.cardTitle}>{mod.title}</h3>
                        <p className={styles.cardDesc}>{mod.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
