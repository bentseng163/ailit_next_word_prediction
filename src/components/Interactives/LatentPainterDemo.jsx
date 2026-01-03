import React, { useState } from 'react';
import styles from './LatentPainterDemo.module.css';
import { Brush, Sparkles } from 'lucide-react';

const LatentPainterDemo = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const steps = [
        { label: "Noise", visual: "random-noise" },
        { label: "Shapes", visual: "blobs" },
        { label: "Abstract", visual: "abstract" },
        { label: "Details", visual: "clear" }
    ];

    const handlePaint = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            if (onComplete) onComplete();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.canvas}>
                {/* Visual Representation of Latent Space */}
                {step === 0 && (
                    <div className={styles.visualNoise}>
                        <div className={styles.noiseOverlay}></div>
                        <span className={styles.label}>Pure Static</span>
                    </div>
                )}
                {step === 1 && (
                    <div className={styles.visualBlobs}>
                        <div className={styles.blob1}></div>
                        <div className={styles.blob2}></div>
                        <span className={styles.label}>Rough Composition</span>
                    </div>
                )}
                {step === 2 && (
                    <div className={styles.visualClear}>
                        {/* Abstracted frame 2 */}
                    </div>
                )}
                {step === 3 && (
                    <div className={styles.visualFinal}>
                        <div className={styles.finalWrapper}>
                            <div className={styles.finalImage}>🏞️</div>
                        </div>
                        <span className={styles.label}>Final Frame</span>
                    </div>
                )}
            </div>

            <div className={styles.controls}>
                <div className={styles.stepper}>
                    {steps.map((s, i) => (
                        <div key={i} className={`${styles.stepDot} ${i <= step ? styles.activeDot : ''}`} />
                    ))}
                </div>
                <button
                    className={styles.paintBtn}
                    onClick={handlePaint}
                    disabled={step === 3 && onComplete}
                >
                    {step < 3 ? (
                        <>
                            <Brush size={16} /> Denoise Step
                        </>
                    ) : (
                        <>
                            <Sparkles size={16} /> Finished
                        </>
                    )}
                </button>
            </div>
            <div className={styles.caption}>
                <strong>The Painter (Diffusion):</strong> Instead of generating one image, it has to generate a lot of them (24 per second) for every frame in the video.
            </div>
        </div>
    );
};

export default LatentPainterDemo;
