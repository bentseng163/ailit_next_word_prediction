import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PipelineBuilder.module.css';
import { Check, ShieldCheck, AlertTriangle, Lightbulb, Zap } from 'lucide-react';

const PipelineBuilder = ({ onComplete, scenarioType = 'safety' }) => {
    // scenarioType: 'safety' (Campaign) OR 'creative' (Brainstorming)

    const slots = [
        { id: 'prompt', label: 'Prompt' },
        { id: 'style', label: 'Style' },
        { id: 'ref', label: 'Reference' },
        { id: 'var', label: 'Variation' },
        { id: 'review', label: 'Review' }
    ];

    const options = {
        prompt: [{ val: 'vague', label: 'Vague' }, { val: 'struct', label: 'Structured' }],
        style: [{ val: 'none', label: 'None' }, { val: 'spec', label: 'Style Spec' }],
        ref: [{ val: 'none', label: 'None' }, { val: 'locked', label: 'Locked' }],
        var: [{ val: 'high', label: 'High' }, { val: 'low', label: 'Low' }],
        review: [{ val: 'none', label: 'None' }, { val: 'gate', label: 'Checklist' }]
    };

    const [pipeline, setPipeline] = useState({
        prompt: null, style: null, ref: null, var: null, review: null
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (slotId, val) => {
        if (submitted) return; // Lock after submit
        setPipeline(prev => ({ ...prev, [slotId]: val }));
    };

    const isComplete = Object.values(pipeline).every(v => v !== null);

    const handleSubmit = () => {
        setSubmitted(true);
        if (onComplete) onComplete();
    };

    // Calculate Outcome based on Scenario
    const getResult = () => {
        const p = pipeline;
        let score = 0;
        let feedback = "";
        let color = "";

        if (scenarioType === 'safety') {
            // Goal: High Constraints, Low Drift
            let drift = 0;
            if (p.prompt === 'vague') drift += 30;
            if (p.style === 'none') drift += 20;
            if (p.ref === 'none') drift += 30;
            if (p.var === 'high') drift += 20;

            const safe = p.review === 'gate';

            if (drift < 30 && safe) {
                score = 100;
                feedback = "Perfect! Locked down and safe. The brand team loves you.";
                color = "success";
            } else if (drift > 60) {
                score = 30;
                feedback = "Too risky! The client rejected the hallucinated logos.";
                color = "fail";
            } else {
                score = 70;
                feedback = "Decent, but you'll burn time re-rolling to fix details.";
                color = "warn";
            }
        } else {
            // Goal: Exploration (Creative), Low Overhead
            // We want Vague/None/High Var to explore ideas fast.
            let creativity = 0;
            if (p.prompt === 'vague') creativity += 20; // Allow model to invent
            if (p.style === 'none') creativity += 10;
            if (p.ref === 'none') creativity += 20; // Don't anchor to old stuff
            if (p.var === 'high') creativity += 50; // Max exploration!

            // Checking overhead
            const slow = p.review === 'gate';

            if (creativity > 60 && !slow) {
                score = 100;
                feedback = "Boom! 50 wild ideas in 5 minutes. Innovation unlocked.";
                color = "success";
            } else if (p.var === 'low') {
                score = 40;
                feedback = "Too boring. We need new ideas, not the same old thing.";
                color = "fail";
            } else if (slow) {
                score = 60;
                feedback = "Good ideas, but you're slowing down flow with too much process.";
                color = "warn";
            } else {
                score = 80;
                feedback = "Solid brainstorming setup.";
                color = "success";
            }
        }
        return { score, feedback, color };
    };

    const result = submitted ? getResult() : null;

    return (
        <div className={styles.container}>
            <div className={styles.pipeline}>
                {slots.map(slot => (
                    <div key={slot.id} className={styles.slotColumn}>
                        <div className={styles.slotLabel}>{slot.label}</div>
                        <div className={styles.optionsStack}>
                            {options[slot.id].map(opt => (
                                <button
                                    key={opt.val}
                                    className={`${styles.optionBtn} ${pipeline[slot.id] === opt.val ? styles.selected : ''} ${submitted ? styles.disabled : ''}`}
                                    onClick={() => handleSelect(slot.id, opt.val)}
                                    disabled={submitted}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {!submitted && (
                <button
                    className={`${styles.submitBtn} ${isComplete ? styles.activeSubmit : ''}`}
                    disabled={!isComplete}
                    onClick={handleSubmit}
                >
                    Run Simulation
                </button>
            )}

            {submitted && result && (
                <motion.div
                    className={`${styles.resultBox} ${styles[result.color]}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className={styles.iconArea}>
                        {result.color === 'success' && <Check size={24} />}
                        {result.color === 'fail' && <AlertTriangle size={24} />}
                        {result.color === 'warn' && <Lightbulb size={24} />}
                    </div>
                    <div className={styles.textArea}>
                        <div className={styles.feedbackText}>{result.feedback}</div>
                        {result.score < 100 && (
                            <button
                                className={styles.retryLink}
                                onClick={() => {
                                    setSubmitted(false);
                                    // Optional: Keep selections or clear them? keeping them is friendlier
                                }}
                            >
                                Try Again
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default PipelineBuilder;
