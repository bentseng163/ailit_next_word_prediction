import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PipelineBuilder.module.css';
import { Check, ShieldCheck, AlertTriangle } from 'lucide-react';

const PipelineBuilder = ({ onComplete }) => {
    // 5 Slots: Prompt, Style, Reference, Variation, Review
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
        prompt: null,
        style: null,
        ref: null,
        var: null,
        review: null
    });

    const handleSelect = (slotId, val) => {
        setPipeline(prev => ({ ...prev, [slotId]: val }));
    };

    const isComplete = Object.values(pipeline).every(v => v !== null);

    // Score Calculation
    const calculateScore = () => {
        if (!isComplete) return null;

        let driftRisk = 100;
        let safety = 0;
        let cost = "$$$";

        // Logic (Mechanism application)
        if (pipeline.prompt === 'struct') driftRisk -= 20;
        if (pipeline.style === 'spec') driftRisk -= 20;
        if (pipeline.ref === 'locked') driftRisk -= 30;
        if (pipeline.var === 'low') driftRisk -= 10;

        if (pipeline.review === 'gate') safety += 50;
        if (driftRisk < 30) safety += 40;

        if (driftRisk > 70) cost = "High (Lots of Re-rolls)";
        else if (driftRisk > 40) cost = "Medium";
        else cost = "Low (Efficient)";

        return { driftRisk, safety, cost };
    };

    const score = calculateScore();

    // Trigger completion if score is safe
    if (isComplete && score.safety > 80 && onComplete) {
        // Debounce slightly or just call
        // onComplete(); // Let's call it after render to avoid loops, or just rely on user seeing the result
    }

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
                                    className={`${styles.optionBtn} ${pipeline[slot.id] === opt.val ? styles.selected : ''}`}
                                    onClick={() => handleSelect(slot.id, opt.val)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isComplete && (
                <motion.div
                    className={styles.resultDetails}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onAnimationComplete={() => { if (score.safety > 80 && onComplete) onComplete() }}
                >
                    <div className={styles.scoreRow}>
                        <div className={styles.scoreItem}>
                            <AlertTriangle size={16} color={score.driftRisk > 40 ? '#ef4444' : '#10b981'} />
                            <span>Drift Risk: {score.driftRisk}%</span>
                        </div>
                        <div className={styles.scoreItem}>
                            <ShieldCheck size={16} color={score.safety > 80 ? '#10b981' : '#f59e0b'} />
                            <span>Safety: {score.safety}%</span>
                        </div>
                    </div>
                    <div className={styles.costLabel}>Re-roll Cost: {score.cost}</div>

                    <div className={styles.advice}>
                        {score.driftRisk > 40 ? "Advice: Add more constraints (Reference, Style Spec) to lower drift." : "Excellent pipeline! High consistency, low waste."}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default PipelineBuilder;
