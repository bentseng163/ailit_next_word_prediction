import React, { useState } from 'react';
import styles from './AudioSyncToggle.module.css';
import { Volume2, VolumeX, Music } from 'lucide-react';

const AudioSyncToggle = ({ onComplete }) => {
    const [audioOn, setAudioOn] = useState(false);

    const toggleAudio = () => {
        setAudioOn(!audioOn);
        if (!audioOn && onComplete) onComplete();
    };

    return (
        <div className={styles.container}>
            <div className={styles.monitor}>
                <div className={styles.videoTrack}>
                    <div className={`${styles.ball} ${styles.animateBounce}`}></div>
                </div>
                <div className={styles.audioTrack}>
                    {audioOn ? (
                        <div className={styles.waveformAnimate}>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                            <div className={styles.bar}></div>
                        </div>
                    ) : (
                        <div className={styles.waveformFlat}>
                            <div className={styles.flatLine}></div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.controls}>
                <button
                    className={`${styles.toggleBtn} ${audioOn ? styles.active : ''}`}
                    onClick={toggleAudio}
                >
                    {audioOn ? (
                        <>
                            <Volume2 size={18} /> Audio: ON
                        </>
                    ) : (
                        <>
                            <VolumeX size={18} /> Audio: OFF
                        </>
                    )}
                </button>
            </div>

            <div className={styles.infoBox}>
                <Music size={16} className={styles.icon} />
                {audioOn ? (
                    <p>
                        <strong>Lockstep Generation:</strong> The model doesn't just "add sound later." It generates pixels and waveforms <em>together</em>, so the *boing* happens exactly when the ball hits.
                    </p>
                ) : (
                    <p>
                        <strong>Silent Movie:</strong> Without the "Composer" (Joint Audio-Video Diffusion), sound would be a separate guess, likely out of sync.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AudioSyncToggle;
