import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContextWindowStepper.module.css';

/*
 * INTERACTIVE SPEC: Context Window Evolution Stepper
 * 
 * Goal: Show how context window evolves from simple to complex
 * 
 * UI: Stepper with 5 steps, each showing context blocks in a visual "window"
 */

const ContextWindowStepper = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "Step 1: System Prompt",
            description: "The model starts with instructions on how to behave.",
            blocks: [
                { type: 'system', label: 'System Prompt', size: 'small' }
            ]
        },
        {
            title: "Step 2: + User Message",
            description: "User sends their first question or request.",
            blocks: [
                { type: 'system', label: 'System Prompt', size: 'small' },
                { type: 'user', label: 'User Message', size: 'small' }
            ]
        },
        {
            title: "Step 3: + Conversation",
            description: "The chat history grows with each exchange.",
            blocks: [
                { type: 'system', label: 'System Prompt', size: 'small' },
                { type: 'user', label: 'User', size: 'tiny' },
                { type: 'assistant', label: 'AI', size: 'tiny' },
                { type: 'user', label: 'User', size: 'tiny' }
            ]
        },
        {
            title: "Step 4: + Documents & Search",
            description: "Uploaded files and web search results fill the window.",
            blocks: [
                { type: 'system', label: 'System', size: 'tiny' },
                { type: 'docs', label: 'Documents', size: 'medium' },
                { type: 'search', label: 'Web Search', size: 'small' },
                { type: 'history', label: 'Chat History', size: 'small' }
            ]
        },
        {
            title: "Step 5: ⚠️ Context Overflow",
            description: "When content exceeds the limit, older info gets pushed out—increasing hallucination risk.",
            blocks: [
                { type: 'overflow', label: '...lost context...', size: 'tiny' },
                { type: 'docs', label: 'Docs', size: 'medium' },
                { type: 'search', label: 'Search', size: 'small' },
                { type: 'history', label: 'Recent Chat', size: 'medium' }
            ],
            warning: true
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            onComplete && onComplete();
        }
    };

    const handlePrev = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const currentStep = steps[step];

    const getBlockColor = (type) => {
        const colors = {
            system: '#8b5cf6',
            user: '#3b82f6',
            assistant: '#10b981',
            docs: '#f59e0b',
            search: '#ec4899',
            history: '#6b7280',
            overflow: '#ef4444'
        };
        return colors[type] || '#6b7280';
    };

    return (
        <div className={styles.container}>
            {/* Progress dots */}
            <div className={styles.progressDots}>
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className={`${styles.dot} ${i === step ? styles.active : ''} ${i < step ? styles.complete : ''}`}
                    />
                ))}
            </div>

            {/* Step info */}
            <div className={styles.stepInfo}>
                <div className={styles.stepTitle}>{currentStep.title}</div>
                <div className={styles.stepDesc}>{currentStep.description}</div>
            </div>

            {/* Context Window Visual */}
            <div className={`${styles.contextWindow} ${currentStep.warning ? styles.warning : ''}`}>
                <div className={styles.windowHeader}>
                    <span>Context Window</span>
                    {currentStep.warning && <span className={styles.warningBadge}>⚠️ Overflow</span>}
                </div>
                <div className={styles.windowContent}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            className={styles.blocksContainer}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {currentStep.blocks.map((block, i) => (
                                <motion.div
                                    key={i}
                                    className={`${styles.block} ${styles[block.size]}`}
                                    style={{ background: getBlockColor(block.type) }}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    {block.label}
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation */}
            <div className={styles.nav}>
                <button
                    className={styles.navBtn}
                    onClick={handlePrev}
                    disabled={step === 0}
                >
                    ← Back
                </button>
                <button
                    className={styles.navBtnPrimary}
                    onClick={handleNext}
                >
                    {step < steps.length - 1 ? 'Next →' : 'Got it ✓'}
                </button>
            </div>
        </div>
    );
};

export default ContextWindowStepper;
