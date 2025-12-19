import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FewShotPromptFixer.module.css';
import { CheckCircle, AlertCircle, RefreshCw, XCircle } from 'lucide-react';

const FewShotPromptFixer = ({ onComplete }) => {
    const [selectedTab, setSelectedTab] = useState(null); // 'none', 'one', 'few'
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [outputVersion, setOutputVersion] = useState(0);

    const handleTabSelect = (tab) => {
        if (!isSubmitted) {
            setSelectedTab(tab);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        if (selectedTab === 'few' && onComplete) onComplete();
    };

    const handleTryAgain = () => {
        setIsSubmitted(false);
        setOutputVersion(0);
        // Keep selectedTab so they can switch from it
    };

    const handleRegenerate = () => {
        setOutputVersion(v => v + 1);
    };

    const getPromptText = (opt) => {
        if (opt === 'none') return "Generate a customer review summary for this product";
        if (opt === 'one') return "Generate a customer review summary for this product\n\nExample:\nProduct A (Electronics)\n- Pros: Battery life, Screen\n- Cons: Price\n- Summary: Great screen but expensive.";
        if (opt === 'few') return "Generate a customer review summary for this product\n\nExample 1:\nProduct A (Electronics)\n... [Summary]\n\nExample 2:\nProduct B (Clothing)\n... [Summary]\n\nExample 3:\nProduct C (Home Goods)\n... [Summary]";
        return "Select a tab to see the prompt.";
    };

    const getResult = () => {
        if (selectedTab === 'none') {
            return {
                isCorrect: false,
                feedback: "Without examples, the model guesses the format. One user might get a poem, another a 10-page essay. Inconsistent UX.",
                output: [
                    "This thing is awesome! I loved it.",
                    "Review Analysis: Sentiment is positive (0.9). Key phrase: 'awesome'.",
                    "5 stars. Good shipping. Box was blue."
                ]
            };
        }
        if (selectedTab === 'one') {
            return {
                isCorrect: false,
                feedback: "Better, but risky. If the example is 'Electronics', the model might try to find 'Battery Life' in a 'T-Shirt' review. It overfits to the single example's specific attributes.",
                output: [
                    "Product: T-Shirt. Pros: Fits well. Cons: None. (Battery Life: N/A)",
                    "Summary: Good shirt. Battery life not mentioned.",
                    "Review: Shirt is soft. Screen resolution: 0x0."
                ]
            };
        }
        if (selectedTab === 'few') {
            return {
                isCorrect: true,
                feedback: "Correct! By showing examples from diverse categories (Electronics, Clothing, Home), you teach the model the *abstract pattern* of summarizing, rather than the specific attributes of one product type.",
                output: [
                    "Product: Blender. \nSummary: Powerful motor, but loud. Good value for smoothies.",
                    "Product: Blender. \nSummary: Crushes ice well. Noise level is high. Easy to clean.",
                    "Product: Blender. \nSummary: Strong performance. Loud operation. sturdy build."
                ]
            };
        }
    };

    const result = isSubmitted ? getResult() : null;
    const currentOutput = result ? result.output[outputVersion % result.output.length] : "";

    return (
        <div className={styles.container}>
            <div className={styles.instruction}>
                Scenario: Design a review summarizer for <strong>diverse categories</strong> (Socks, Toasters, Laptops).
            </div>

            <div className={styles.tabs}>
                {['none', 'one', 'few'].map(tab => (
                    <button
                        key={tab}
                        className={`${styles.tabBtn} ${selectedTab === tab ? styles.active : ''} ${isSubmitted && selectedTab !== tab ? styles.dimmed : ''}`}
                        onClick={() => handleTabSelect(tab)}
                        disabled={isSubmitted}
                    >
                        {tab === 'none' && 'No Example'}
                        {tab === 'one' && 'One Ex.'}
                        {tab === 'few' && 'Few Ex.'}
                    </button>
                ))}
            </div>

            <div className={styles.promptBox}>
                <div className={styles.label}>Prompt Preview</div>
                <div className={styles.promptContent}>
                    {getPromptText(selectedTab)}
                </div>
            </div>

            {!isSubmitted && (
                <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={!selectedTab}
                >
                    Submit Design
                </button>
            )}

            {isSubmitted && (
                <motion.div
                    className={`${styles.resultBox} ${result.isCorrect ? styles.correct : styles.incorrect}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.feedbackHeader}>
                        {result.isCorrect ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{result.isCorrect ? "Great Choice" : "Design Risk"}</span>
                    </div>

                    <p className={styles.feedbackText}>{result.feedback}</p>

                    <div className={styles.outputDemo}>
                        <div className={styles.outputLabel}>Model Output (Simulation):</div>
                        <div className={styles.outputContent}>"{currentOutput}"</div>
                        <button className={styles.regenBtn} onClick={handleRegenerate}>
                            <RefreshCw size={14} /> Regenerate
                        </button>
                    </div>

                    {!result.isCorrect && (
                        <button className={styles.tryAgainBtn} onClick={handleTryAgain}>
                            <RefreshCw size={16} /> Try Another Prompt
                        </button>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default FewShotPromptFixer;
