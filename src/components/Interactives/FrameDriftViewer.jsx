import React, { useState, useRef } from 'react';
import styles from './FrameDriftViewer.module.css';
import { Flag, AlertTriangle, CheckCircle2 } from 'lucide-react';

const FrameDriftViewer = ({ onComplete }) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [flags, setFlags] = useState([]);
    const [showHeatmap, setShowHeatmap] = useState(false);

    // Simulate frames: 0-30. 
    // Frame 0-5: Good. 6-15: Starting to drift. 16-30: Bad drift.

    const handleSliderChange = (e) => {
        setSliderValue(parseInt(e.target.value));
    };

    const handleFlagDrift = () => {
        if (!flags.includes(sliderValue)) {
            const newFlags = [...flags, sliderValue];
            setFlags(newFlags);

            // If user flags enough drift points (e.g. > 1), show heatmap
            if (newFlags.length >= 2) {
                setShowHeatmap(true);
                if (onComplete) onComplete();
            }
        }
    };

    const getFrameState = (val) => {
        if (val < 8) return styles.frameGood;
        if (val < 18) return styles.frameWarning;
        return styles.frameBad;
    };

    const getFrameNote = (val) => {
        if (val < 8) return "Frames 0-7: Looks clean";
        if (val < 18) return "Frames 8-17: Logo warping...";
        return "Frames 18-30: Total drift";
    };

    // Visual placeholder for the "frame" content
    const renderVisual = () => {
        // We'll simulate drift by changing a shape's CSS transform/border-radius
        const driftFactor = Math.max(0, sliderValue - 5) / 25; // 0 to 1

        return (
            <div className={styles.visualContainer}>
                <div
                    className={styles.driftObject}
                    style={{
                        transform: `rotate(${driftFactor * 45}deg) scale(${1 + driftFactor * 0.2})`,
                        borderRadius: `${50 - (driftFactor * 30)}%`, // Circle becomes square-ish
                        background: `hsl(${220 + driftFactor * 40}, 70%, 50%)` // Blue to Purple
                    }}
                >
                    <span style={{ opacity: 1 - driftFactor, transition: 'opacity 0.2s' }}>LOGO</span>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.viewerWindow}>
                {renderVisual()}

                {showHeatmap && (
                    <div className={styles.heatmapOverlay}>
                        <div className={styles.heatmapLabel}>Drift Zones Detected</div>
                    </div>
                )}

                <div className={styles.timecode}>Frame: {sliderValue}/30</div>
            </div>

            <div className={styles.controls}>
                <input
                    type="range"
                    min="0"
                    max="30"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className={styles.scrubber}
                />
                <button
                    className={`${styles.flagBtn} ${flags.includes(sliderValue) ? styles.flagged : ''}`}
                    onClick={handleFlagDrift}
                    disabled={showHeatmap}
                >
                    <Flag size={16} />
                    {flags.includes(sliderValue) ? 'Flagged' : 'Flag Drift'}
                </button>
            </div>

            <div className={styles.statusArea}>
                <div className={styles.frameNote}>{getFrameNote(sliderValue)}</div>

                {showHeatmap && (
                    <div className={styles.insightBox}>
                        <AlertTriangle size={16} className={styles.warningIcon} />
                        <p>
                            <strong>Caught it!</strong> The model isn't "simulating the logo." It's just predicting the next probable shape. Over time, errors accumulate.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FrameDriftViewer;
