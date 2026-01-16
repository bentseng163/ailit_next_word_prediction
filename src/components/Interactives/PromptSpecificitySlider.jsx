import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PromptSpecificitySlider.module.css';

/*
 * INTERACTIVE SPEC: System Prompt Specificity Slider
 * 
 * Goal: Show tradeoff between too vague <-> balanced <-> too specific
 * Slider controls prompt detail level with example outputs
 */

const PromptSpecificitySlider = ({ onComplete }) => {
    const [value, setValue] = useState(50);

    const getLevel = () => {
        if (value < 33) return 'vague';
        if (value > 66) return 'specific';
        return 'balanced';
    };

    const examples = {
        vague: {
            prompt: "You are a helpful assistant. Help users with their questions.",
            output: "Sure, I can help! What would you like to know?",
            issue: "❌ Too generic—no clear behavior defined",
            tokens: "~15 tokens"
        },
        balanced: {
            prompt: "You are a customer support agent for TechCorp. Answer questions about our software products. Be friendly but concise. If unsure, say so.",
            output: "Hi! I'd be happy to help with TechCorp software. What's your question?",
            issue: "✅ Clear role, scope, and behavior—optimal",
            tokens: "~40 tokens"
        },
        specific: {
            prompt: "You are Sarah, a senior support agent at TechCorp since 2019. You specialize in Enterprise Suite v3.2.1-beta. Your tone must be strictly professional, utilizing active voice 90% of the time. Upon receiving a query, first validate the user's subscription tier (Gold/Platinum). If Gold, cross-reference KB-102. If Platinum, cross-reference KB-108. Never use emojis. Always sign off with 'TechCorp Cares'. Ensure response length is exactly 43-47 words. Prioritize ticket routing to Tier 2 if the keyword 'latency' appears more than twice...",
            output: "Hello. I have received your inquiry regarding Enterprise Suite v3.2.1-beta. Please confirm your subscription tier so I may consult the appropriate knowledge base article (KB-102 or KB-108).",
            issue: "❌ Over-constrained—wastes window space, limits reasoning",
            tokens: "~850 tokens"
        }
    };

    const level = getLevel();
    const current = examples[level];

    return (
        <div className={styles.container}>
            {/* Slider */}
            <div className={styles.sliderSection}>
                <div className={styles.labels}>
                    <span className={value < 33 ? styles.activeLabel : ''}>Too Vague</span>
                    <span className={value >= 33 && value <= 66 ? styles.activeLabel : ''}>Balanced</span>
                    <span className={value > 66 ? styles.activeLabel : ''}>Too Specific</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className={styles.slider}
                />
            </div>

            {/* Example */}
            <motion.div
                key={level}
                className={styles.example}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className={styles.section}>
                    <div className={styles.sectionLabel}>System Prompt:</div>
                    <div className={styles.promptBox}>"{current.prompt}"</div>
                    <div className={styles.tokenCount}>{current.tokens}</div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionLabel}>Model Response:</div>
                    <div className={styles.outputBox}>"{current.output}"</div>
                </div>

                <div className={`${styles.verdict} ${styles[level]}`}>
                    {current.issue}
                </div>
            </motion.div>

            {/* Insight */}
            <div className={styles.insight}>
                💡 <strong>Sweet spot:</strong> Enough detail to guide behavior,
                but not so much that it wastes context space.
            </div>
        </div>
    );
};

export default PromptSpecificitySlider;
