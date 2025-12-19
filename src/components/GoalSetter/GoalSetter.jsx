import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GoalSetter.module.css';
import { Briefcase, Zap, Rocket, Edit3, CheckCircle, Loader2 } from 'lucide-react';

const GoalSetter = ({ onGoalSet }) => {
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [customGoal, setCustomGoal] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const goals = [
        {
            id: 1,
            text: "Become credible in AI conversations at work",
            icon: <Briefcase size={20} />,
            type: "default"
        },
        {
            id: 2,
            text: "Improve productivity with GenAI workflows",
            icon: <Zap size={20} />,
            type: "productivity"
        },
        {
            id: 3,
            text: "Ship useful and safer AI features",
            icon: <Rocket size={20} />,
            type: "shipping"
        },
        {
            id: 4,
            text: "Custom Goal",
            icon: <Edit3 size={20} />,
            type: "custom"
        }
    ];

    const handleSubmit = () => {
        if (!selectedGoal) return;

        setIsSubmitting(true);

        // Simulating personalization delay
        setTimeout(() => {
            const finalGoal = selectedGoal === 4 ? customGoal : goals.find(g => g.id === selectedGoal)?.type;
            onGoalSet(selectedGoal === 4 ? 'default' : goals.find(g => g.id === selectedGoal)?.type);
        }, 4000); // 4 seconds loading as requested (msg said 5s, doing 4 for better UX feel)
    };

    return (
        <div className={styles.container}>
            <AnimatePresence mode="wait">
                {!isSubmitting ? (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={styles.selectionView}
                    >
                        <h2 className={styles.header}>What is your main goal today?</h2>
                        <p className={styles.subHeader}>We’ll customize the examples for you.</p>

                        <div className={styles.options}>
                            {goals.map((goal) => (
                                <div
                                    key={goal.id}
                                    className={`${styles.optionCard} ${selectedGoal === goal.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedGoal(goal.id)}
                                >
                                    <div className={styles.iconBox}>
                                        {goal.icon}
                                    </div>
                                    <div className={styles.optionText}>
                                        {goal.id === 4 ? (
                                            <div className={styles.customInputBox}>
                                                <span>Other:</span>
                                                <input
                                                    type="text"
                                                    placeholder="Type your goal..."
                                                    className={styles.customInput}
                                                    value={customGoal}
                                                    onChange={(e) => setCustomGoal(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onFocus={() => setSelectedGoal(4)}
                                                />
                                            </div>
                                        ) : (
                                            goal.text
                                        )}
                                    </div>
                                    <div className={styles.radio}>
                                        {selectedGoal === goal.id && <div className={styles.radioFill} />}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className={styles.submitBtn}
                            onClick={handleSubmit}
                            disabled={!selectedGoal || (selectedGoal === 4 && !customGoal.trim())}
                        >
                            Start Learning
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={styles.loadingView}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Loader2 size={48} className={styles.spinner} />
                        </motion.div>
                        <h3 className={styles.loadingText}>Personalizing your learning experience...</h3>
                        <p className={styles.loadingSub}>Adapting scenarios to your goal.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GoalSetter;
