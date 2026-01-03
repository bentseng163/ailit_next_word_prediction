import React, { useState } from 'react';
// Reuse CSS
import styles from './PhysicsTraining.module.css';
import { Eye, BrainCircuit, Play } from 'lucide-react';

const RecapVideoInsight = ({ onComplete }) => {
    const [phase, setPhase] = useState('quiz');
    const [isIncorrect, setIsIncorrect] = useState(false);

    const handleGuess = (guess) => {
        if (guess === 'biology') {
            setIsIncorrect(true);
        } else {
            setPhase('result');
            if (onComplete) onComplete();
        }
    };

    return (
        <div className={styles.container}>
            {phase === 'quiz' && (
                <div className={styles.quizArea}>
                    <div style={{ marginBottom: 20, textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem' }}>👋 ➡️ 🖖</div>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Video Observation: The hand had 5 fingers, then 4, then 6.</p>
                    </div>
                    <p className={styles.question}>
                        <strong>Why did the hand morph?</strong>
                    </p>
                    <div className={styles.options}>
                        <button
                            className={`${styles.optionBtn} ${isIncorrect ? styles.incorrect : ''}`}
                            onClick={() => handleGuess('biology')}
                        >
                            It doesn't understand human biology
                        </button>
                        <button className={styles.optionBtn} onClick={() => handleGuess('pixels')}>
                            It forgot the pixel pattern of "5 fingers"
                        </button>
                    </div>
                    {isIncorrect && (
                        <div className={styles.feedback}>
                            Actuall... wait. Both are kind of true. But think about the <em>mechanism</em>. Does it even KNOW what biology is?
                        </div>
                    )}
                </div>
            )}

            {phase === 'result' && (
                <div className={styles.trainingArea} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: 20 }}>🦜</div>
                    <div className={styles.insightBox}>
                        <p>
                            <strong>Winner: Pixel Prediction.</strong><br /><br />
                            The model doesn't know "Hands have 5 fingers."<br />
                            It only knows "Pink pixels usually go here."<br />
                            When the hand turned, the <em>pixel pattern</em> became ambiguous, so it guessed a "plausible" blur... which turned into a 6th finger.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecapVideoInsight;
