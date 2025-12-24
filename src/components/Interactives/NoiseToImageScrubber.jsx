import React, { useState } from 'react';
import styles from './NoiseToImageScrubber.module.css';

const NoiseToImageScrubber = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    const handleScrub = (e) => {
        const val = parseInt(e.target.value);
        setProgress(val);
        if (val > 95 && onComplete) onComplete();
    };

    const getStageInfo = (val) => {
        if (val < 20) return { label: "Noise", desc: "Pure random static. The raw clay." };
        if (val < 40) return { label: "Layout", desc: "Rough composition emerges. Dark vs Light spots." };
        if (val < 60) return { label: "Objects", desc: "Recognizable shapes form (blob -> thermostat)." };
        if (val < 80) return { label: "Details", desc: "Buttons, screen text, and specific textures appear." };
        return { label: "Final", desc: "Polished surfaces, lighting effects, and crisp lines." };
    };

    const stage = getStageInfo(progress);

    // Placeholder visualizations for stages (Simulating noise -> image)
    const renderVisual = () => {
        const imageOpacity = progress / 100;
        const blurAmount = Math.max(0, 20 - (progress / 5));

        return (
            <div className={styles.imageContainer}>
                {/* Layer 1: Noise Pattern (SVG/CSS) */}
                <div className={styles.noiseLayer} style={{ opacity: 1 - imageOpacity }}>
                    <svg width="100%" height="100%">
                        <filter id="noiseFilter">
                            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noiseFilter)" opacity="0.8" />
                    </svg>
                </div>

                {/* Layer 2: Final Image (Placeholder) */}
                <div
                    className={styles.imageLayer}
                    style={{
                        opacity: imageOpacity,
                        filter: `blur(${blurAmount}px)`
                    }}
                >
                    <div className={styles.placeholderPoster}>
                        <div className={styles.thermostatShape}>
                            <div className={styles.screen}>72°</div>
                        </div>
                        <div className={styles.textLine} />
                        <div className={styles.textLine} style={{ width: '60%' }} />
                    </div>
                </div>

                {/* Tooltip Overlay */}
                <div className={styles.tooltip}>
                    <strong>{stage.label}</strong>: {stage.desc}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {renderVisual()}

            <div className={styles.controls}>
                <div className={styles.sliderBox}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleScrub}
                        className={styles.slider}
                    />
                    <div className={styles.milestones}>
                        <div className={styles.tick} style={{ left: '20%' }}><span>Layout</span></div>
                        <div className={styles.tick} style={{ left: '40%' }}><span>Objects</span></div>
                        <div className={styles.tick} style={{ left: '60%' }}><span>Details</span></div>
                        <div className={styles.tick} style={{ left: '80%' }}><span>Texture</span></div>
                    </div>
                </div>
                <div className={styles.labels}>
                    <span>Noise</span>
                    <span>Clear Image</span>
                </div>
            </div>
        </div>
    );
};

export default NoiseToImageScrubber;
