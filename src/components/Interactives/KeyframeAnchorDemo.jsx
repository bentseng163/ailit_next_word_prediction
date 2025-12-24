import React, { useState } from 'react';
import styles from './KeyframeAnchorDemo.module.css';
import { Anchor, Zap, ShieldCheck } from 'lucide-react';

const KeyframeAnchorDemo = ({ onComplete }) => {
    const [useKeyframes, setUseKeyframes] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleKeyframes = () => {
        setUseKeyframes(!useKeyframes);
        setIsPlaying(true);
        setTimeout(() => {
            setIsPlaying(false);
            if (onComplete) onComplete();
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>Mode:</span>
                <button
                    className={`${styles.toggleBtn} ${!useKeyframes ? styles.active : ''}`}
                    onClick={() => setUseKeyframes(false)}
                >
                    <Zap size={14} /> Normal
                </button>
                <button
                    className={`${styles.toggleBtn} ${useKeyframes ? styles.active : ''}`}
                    onClick={() => setUseKeyframes(true)}
                >
                    <Anchor size={14} /> Keyframes
                </button>
            </div>

            <div className={styles.timelineContainer}>
                {/* Visualizing drift vs anchored path */}
                <div className={styles.track}>
                    {/* Start Anchor */}
                    <div className={styles.anchorPoint} style={{ left: '0%' }}>
                        <div className={styles.anchorLabel}>Start</div>
                    </div>

                    {/* End Anchor (Only visible/active in Keyframe mode effectively) */}
                    <div className={`${styles.anchorPoint} ${useKeyframes ? styles.activeAnchor : styles.inactiveAnchor}`} style={{ left: '100%' }}>
                        <div className={styles.anchorLabel}>End</div>
                    </div>

                    {/* Path Line */}
                    <svg className={styles.pathSvg} viewBox="0 0 300 100" preserveAspectRatio="none">
                        {useKeyframes ? (
                            // Stable curve
                            <path
                                d="M 0 50 Q 150 50 300 50"
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                strokeDasharray="5 5"
                                className={styles.pathLine}
                            />
                        ) : (
                            // Drifting chaos curve
                            <path
                                d="M 0 50 C 50 10, 100 90, 150 20 C 200 80, 250 10, 300 80"
                                fill="none"
                                stroke="#ef4444"
                                strokeWidth="4"
                                strokeDasharray="5 5"
                                className={styles.pathLine}
                            />
                        )}
                    </svg>

                    {/* Moving Dot */}
                    <div
                        className={`${styles.runner} ${isPlaying ? styles.animating : ''} ${useKeyframes ? styles.runnerStable : styles.runnerDrift}`}
                    />
                </div>
            </div>

            <div className={styles.explanation}>
                {useKeyframes ? (
                    <div className={styles.insightBoxPositive}>
                        <ShieldCheck size={16} className={styles.iconOk} />
                        <p>
                            <strong>Anchored!</strong> By locking the End frame, you force the model to meet that destination. It can't "wander off" into infinite variations.
                        </p>
                    </div>
                ) : (
                    <div className={styles.insightBoxNegative}>
                        <Zap size={16} className={styles.iconWarn} />
                        <p>
                            <strong>Free Drift.</strong> Without a destination anchor, the model just guesses step-by-step. Tiny errors compound into big weirdness.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KeyframeAnchorDemo;
