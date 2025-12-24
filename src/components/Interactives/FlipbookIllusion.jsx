import React, { useState } from 'react';
import styles from './FlipbookIllusion.module.css';
import { Play, ArrowRight, HelpCircle } from 'lucide-react';

const FlipbookIllusion = ({ onComplete }) => {
    const [step, setStep] = useState('intro'); // 'intro', 'predict', 'reveal'
    const [selectedOption, setSelectedOption] = useState(null);

    const options = [
        {
            id: 'stable',
            label: 'Stable',
            desc: 'Small movement',
            visual: '🟦→🟦',
            feedback: "Ideally, yes. But the model is guessing, so it often over-animates.",
            isCorrect: false
        },
        {
            id: 'dynamic',
            label: 'More Dynamic',
            desc: 'Bigger movement',
            visual: '🟦→💨',
            feedback: "This is what models often prioritize: motion over stability.",
            isCorrect: true
        },
        {
            id: 'drift',
            label: 'Oops Drift',
            desc: 'Object warps',
            visual: '🟦→🟣',
            feedback: "Very common! The model forgot what the object was.",
            isCorrect: false
        }
    ];

    const handlePredict = (option) => {
        setSelectedOption(option);
        setStep('reveal');
        if (onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.frameContainer}>
                <div className={styles.frameLabel}>Frame 12</div>
                <div className={styles.frameBox}>
                    <div className={styles.ball} />
                    <div className={styles.trail} />
                </div>
            </div>

            {step === 'intro' && (
                <div className={styles.actionArea}>
                    <p className={styles.instruction}>
                        Based on Frame 12 just showing a ball moving right...
                        <br />
                        <strong>What should Frame 13 look like?</strong>
                    </p>
                    <button className={styles.primaryBtn} onClick={() => setStep('predict')}>
                        Predict Next Frame <ArrowRight size={16} />
                    </button>
                </div>
            )}

            {step === 'predict' && (
                <div className={styles.optionsGrid}>
                    {options.map((opt) => (
                        <button
                            key={opt.id}
                            className={styles.optionCard}
                            onClick={() => handlePredict(opt)}
                        >
                            <div className={styles.optionVisual}>{opt.visual}</div>
                            <div className={styles.optionLabel}>{opt.label}</div>
                            <div className={styles.optionDesc}>{opt.desc}</div>
                        </button>
                    ))}
                </div>
            )}

            {step === 'reveal' && (
                <div className={styles.feedbackArea}>
                    <div className={styles.feedbackHeader}>
                        <span className={styles.wrapper}>
                            You picked: <strong>{selectedOption.label}</strong>
                        </span>
                    </div>
                    <p className={styles.feedbackText}>
                        {selectedOption.feedback}
                    </p>
                    <div className={styles.insightBox}>
                        <HelpCircle size={16} className={styles.icon} />
                        <p>
                            <strong>Insight:</strong> The model doesn't "know" physics. It just guesses the next plausible visual pattern from its training data.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlipbookIllusion;
