import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ReliabilitySpeedKnob.module.css';

/*
 * INTERACTIVE SPEC: Reliability Speed Knob
 * 
 * Goal: Teach tradeoffs between checks and scope
 * 
 * UI: Two sliders (Checks: Low→High, Scope: Narrow→Broad)
 * Shows impact on Speed, Reliability, Risk
 */

const ReliabilitySpeedKnob = ({ onComplete }) => {
    const [checks, setChecks] = useState(50);
    const [scope, setScope] = useState(50);

    const calculateMetrics = () => {
        // High checks = slower but more reliable, lower risk
        // Broad scope = faster but more risk
        const speed = Math.max(10, 100 - (checks * 0.5) + (scope * 0.2));
        const reliability = Math.max(10, 30 + (checks * 0.6) - (scope * 0.2));
        const risk = Math.max(10, 20 + (scope * 0.6) - (checks * 0.4));

        return {
            speed: Math.min(100, Math.round(speed)),
            reliability: Math.min(100, Math.round(reliability)),
            risk: Math.min(100, Math.round(risk))
        };
    };

    const getRecommendation = () => {
        const metrics = calculateMetrics();

        if (checks < 30 && scope > 70) {
            return {
                type: 'danger',
                text: "⚠️ Maximum chaos zone! Broad scope + low checks = high failure risk."
            };
        } else if (checks > 70 && scope < 30) {
            return {
                type: 'safe',
                text: "✅ Safe for high-stakes tasks. Slower but reliable."
            };
        } else if (checks > 50 && scope < 50) {
            return {
                type: 'good',
                text: "👍 Good balance for most workflows."
            };
        } else if (checks < 50 && scope > 50) {
            return {
                type: 'warning',
                text: "⚡ Fast but risky. Use for low-stakes exploration only."
            };
        }
        return {
            type: 'neutral',
            text: "Adjust sliders to find the right balance for your use case."
        };
    };

    const metrics = calculateMetrics();
    const recommendation = getRecommendation();

    return (
        <div className={styles.container}>
            {/* Sliders */}
            <div className={styles.sliders}>
                <div className={styles.sliderGroup}>
                    <div className={styles.sliderLabel}>
                        <span>🔍 Checks</span>
                        <span className={styles.sliderValue}>
                            {checks < 33 ? 'Low' : checks < 66 ? 'Medium' : 'High'}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={checks}
                        onChange={(e) => setChecks(Number(e.target.value))}
                        className={styles.slider}
                    />
                    <div className={styles.sliderHints}>
                        <span>Low (fast)</span>
                        <span>High (safe)</span>
                    </div>
                </div>

                <div className={styles.sliderGroup}>
                    <div className={styles.sliderLabel}>
                        <span>📐 Scope</span>
                        <span className={styles.sliderValue}>
                            {scope < 33 ? 'Narrow' : scope < 66 ? 'Medium' : 'Broad'}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={scope}
                        onChange={(e) => setScope(Number(e.target.value))}
                        className={styles.slider}
                    />
                    <div className={styles.sliderHints}>
                        <span>Narrow (focused)</span>
                        <span>Broad (flexible)</span>
                    </div>
                </div>
            </div>

            {/* Dashboard */}
            <div className={styles.dashboard}>
                <div className={styles.dashTitle}>Impact</div>
                <div className={styles.meters}>
                    <MeterBar label="⚡ Speed" value={metrics.speed} color="#3b82f6" />
                    <MeterBar label="✅ Reliability" value={metrics.reliability} color="#10b981" />
                    <MeterBar label="⚠️ Risk" value={metrics.risk} color="#ef4444" inverted />
                </div>
            </div>

            {/* Recommendation */}
            <div className={`${styles.recommendation} ${styles[recommendation.type]}`}>
                {recommendation.text}
            </div>

            {/* Insight */}
            <div className={styles.insight}>
                💡 <strong>Rule of thumb:</strong> High stakes? Narrow scope + high checks.
                Low stakes? Experiment with broad scope + fewer checks.
            </div>
        </div>
    );
};

const MeterBar = ({ label, value, color, inverted = false }) => {
    const isGood = inverted ? value < 40 : value > 60;

    return (
        <div className={styles.meter}>
            <div className={styles.meterHeader}>
                <span className={styles.meterLabel}>{label}</span>
                <span className={styles.meterValue} style={{ color: isGood ? '#10b981' : color }}>
                    {value}%
                </span>
            </div>
            <div className={styles.meterTrack}>
                <motion.div
                    className={styles.meterFill}
                    style={{ backgroundColor: color }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
};

export default ReliabilitySpeedKnob;
