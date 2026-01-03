import React, { useState } from 'react';
import styles from './PhysicsTraining.module.css';
import { HelpCircle, Play, Eye, BrainCircuit } from 'lucide-react';

const PhysicsTraining = ({ onComplete }) => {
    const [phase, setPhase] = useState('quiz'); // 'quiz', 'training', 'result'
    const [videosWatched, setVideosWatched] = useState(0);
    const [isIncorrect, setIsIncorrect] = useState(false);

    // Quiz Phase
    const handleGuess = (guess) => {
        if (guess === 'formula') {
            setIsIncorrect(true);
        } else {
            setPhase('training');
        }
    };

    // Training Phase
    const handleTrain = () => {
        const interval = setInterval(() => {
            setVideosWatched(prev => {
                if (prev >= 10000) {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                    setPhase('result');
                    return 10000;
                }
                return prev + 1500; // Increment
            });
        }, 100);
    };

    // Derived visual state
    const glassState = videosWatched < 5000 ? styles.glassFloat : styles.glassShatter;

    return (
        <div className={styles.container}>
            {phase === 'quiz' && (
                <div className={styles.quizArea}>
                    <p className={styles.question}>
                        <strong>How does an AI model learn gravity?</strong>
                    </p>
                    <div className={styles.options}>
                        <button
                            className={`${styles.optionBtn} ${isIncorrect ? styles.incorrect : ''}`}
                            onClick={() => handleGuess('formula')}
                        >
                            It learns physics formulas <br /> (F = ma)
                        </button>
                        <button className={styles.optionBtn} onClick={() => handleGuess('watch')}>
                            It watches 10,000 videos <br /> of things falling
                        </button>
                    </div>
                    {isIncorrect && (
                        <div className={styles.feedback}>
                            Nope. It doesn't know math. Try again.
                        </div>
                    )}
                </div>
            )}

            {phase !== 'quiz' && (
                <div className={styles.trainingArea}>
                    <div className={styles.scene}>
                        <div className={styles.floor}></div>
                        {/* The Glass Object */}
                        <div className={`${styles.glass} ${glassState}`}>
                            🍷
                        </div>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <Eye size={16} />
                            <span>Videos Watched: {videosWatched.toLocaleString()}</span>
                        </div>
                        {phase === 'result' && (
                            <div className={styles.statItem}>
                                <BrainCircuit size={16} />
                                <span>Pattern Learned: Release = Fall</span>
                            </div>
                        )}
                    </div>

                    {phase === 'training' && (
                        <button className={styles.trainBtn} onClick={handleTrain}>
                            <Play size={16} /> Train Model
                        </button>
                    )}

                    {phase === 'result' && (
                        <div className={styles.insightBox}>
                            <p>
                                <strong>Statistical Correlation:</strong> It doesn't know <em>why</em> things fall (gravity).
                                It just knows that in 99% of training videos, "object in air" is followed by "object moving down."
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PhysicsTraining;
