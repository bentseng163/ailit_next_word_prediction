import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContextBudgetBuilder.module.css';

/*
 * INTERACTIVE SPEC: Context Budget Builder
 * 
 * Goal: Teach prioritization under a limited context/token budget.
 * 
 * UI:
 * - A "token budget" meter (e.g., 800 units)
 * - Four buckets with sliders: Goal & audience, Constraints & must-haves, Examples, Sources
 * - Live "Outcome Preview" quality meters: Relevance, Consistency, Accuracy risk
 * 
 * Feedback:
 * - If Sources < 15% and task is accuracy-sensitive, warn about invention risk
 * - If Constraints < 20%, warn about ignored requirements
 * - If Examples included, show improved formatting consistency
 * 
 * Score: 0–10 based on alignment with scenario type
 */

const ContextBudgetBuilder = ({ onComplete }) => {
    const [allocations, setAllocations] = useState({
        goal: 20,
        constraints: 25,
        examples: 15,
        sources: 40
    });
    const [hasInteracted, setHasInteracted] = useState(false);

    const totalBudget = 100;
    const categories = [
        {
            id: 'goal',
            label: '🎯 Goal & Audience',
            color: '#3b82f6',
            desc: 'Who is this for? What outcome?'
        },
        {
            id: 'constraints',
            label: '🔒 Constraints',
            color: '#8b5cf6',
            desc: 'Must-haves, must-nots, accuracy rules'
        },
        {
            id: 'examples',
            label: '📝 Examples',
            color: '#06b6d4',
            desc: 'Format templates, style references'
        },
        {
            id: 'sources',
            label: '📚 Sources',
            color: '#10b981',
            desc: 'Facts, data, reference documents'
        }
    ];

    const handleSliderChange = (id, value) => {
        setHasInteracted(true);
        const newValue = parseInt(value);
        const otherTotal = Object.entries(allocations)
            .filter(([key]) => key !== id)
            .reduce((sum, [, val]) => sum + val, 0);

        // Keep total at 100
        if (newValue + otherTotal <= totalBudget) {
            setAllocations({ ...allocations, [id]: newValue });
        } else {
            // Clamp to remaining budget
            setAllocations({ ...allocations, [id]: totalBudget - otherTotal });
        }
    };

    const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);
    const remaining = totalBudget - totalAllocated;

    // Calculate outcome scores
    const getOutcomes = () => {
        let relevance = 50;
        let consistency = 50;
        let accuracyRisk = 50;
        let warnings = [];

        // Goal impact
        if (allocations.goal >= 15) relevance += 25;
        else if (allocations.goal >= 10) relevance += 15;
        else warnings.push("Low goal clarity → output may miss the point");

        // Constraints impact
        if (allocations.constraints >= 20) {
            relevance += 15;
            accuracyRisk -= 20;
        } else if (allocations.constraints < 10) {
            warnings.push("Missing constraints → model may ignore requirements");
            accuracyRisk += 15;
        }

        // Examples impact
        if (allocations.examples >= 15) {
            consistency += 30;
        } else if (allocations.examples >= 10) {
            consistency += 15;
        }

        // Sources impact (crucial for accuracy)
        if (allocations.sources >= 30) {
            accuracyRisk -= 30;
            relevance += 10;
        } else if (allocations.sources < 15) {
            warnings.push("Low sources → high risk of plausible invention");
            accuracyRisk += 25;
        }

        return {
            relevance: Math.min(100, Math.max(0, relevance)),
            consistency: Math.min(100, Math.max(0, consistency)),
            accuracyRisk: Math.min(100, Math.max(0, accuracyRisk)),
            warnings
        };
    };

    const outcomes = getOutcomes();

    const getScore = () => {
        let score = 0;
        if (allocations.goal >= 10) score += 2;
        if (allocations.constraints >= 20) score += 3;
        if (allocations.examples >= 10) score += 2;
        if (allocations.sources >= 25) score += 3;
        return score;
    };

    return (
        <div className={styles.container}>
            {/* Budget Meter */}
            <div className={styles.budgetMeter}>
                <div className={styles.budgetHeader}>
                    <span>Token Budget</span>
                    <span className={styles.budgetCount}>
                        {totalAllocated}/{totalBudget}
                        {remaining > 0 && <span className={styles.remaining}> (+{remaining} free)</span>}
                    </span>
                </div>
                <div className={styles.budgetTrack}>
                    <motion.div
                        className={styles.budgetFill}
                        animate={{ width: `${totalAllocated}%` }}
                        style={{
                            backgroundColor: remaining === 0 ? '#10b981' : '#3b82f6'
                        }}
                    />
                </div>
            </div>

            {/* Allocation Sliders */}
            <div className={styles.sliders}>
                {categories.map(cat => (
                    <div key={cat.id} className={styles.sliderRow}>
                        <div className={styles.sliderHeader}>
                            <span className={styles.sliderLabel} style={{ color: cat.color }}>
                                {cat.label}
                            </span>
                            <span className={styles.sliderValue}>{allocations[cat.id]}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={allocations[cat.id]}
                            onChange={(e) => handleSliderChange(cat.id, e.target.value)}
                            className={styles.slider}
                            style={{
                                '--slider-color': cat.color,
                                '--slider-percent': `${(allocations[cat.id] / 60) * 100}%`
                            }}
                        />
                        <div className={styles.sliderDesc}>{cat.desc}</div>
                    </div>
                ))}
            </div>

            {/* Outcome Preview */}
            <div className={styles.outcomes}>
                <div className={styles.outcomesTitle}>📊 Outcome Preview</div>

                <div className={styles.meterRow}>
                    <span className={styles.meterLabel}>Relevance</span>
                    <div className={styles.meterTrack}>
                        <motion.div
                            className={styles.meterFill}
                            animate={{ width: `${outcomes.relevance}%` }}
                            style={{ backgroundColor: '#3b82f6' }}
                        />
                    </div>
                    <span className={styles.meterValue}>{outcomes.relevance}%</span>
                </div>

                <div className={styles.meterRow}>
                    <span className={styles.meterLabel}>Consistency</span>
                    <div className={styles.meterTrack}>
                        <motion.div
                            className={styles.meterFill}
                            animate={{ width: `${outcomes.consistency}%` }}
                            style={{ backgroundColor: '#06b6d4' }}
                        />
                    </div>
                    <span className={styles.meterValue}>{outcomes.consistency}%</span>
                </div>

                <div className={styles.meterRow}>
                    <span className={styles.meterLabel}>Invention Risk</span>
                    <div className={styles.meterTrack}>
                        <motion.div
                            className={styles.meterFill}
                            animate={{ width: `${outcomes.accuracyRisk}%` }}
                            style={{ backgroundColor: outcomes.accuracyRisk > 60 ? '#ef4444' : '#f59e0b' }}
                        />
                    </div>
                    <span className={styles.meterValue} style={{
                        color: outcomes.accuracyRisk > 60 ? '#ef4444' : 'inherit'
                    }}>
                        {outcomes.accuracyRisk > 60 ? '⚠️ High' : outcomes.accuracyRisk > 40 ? 'Medium' : '✓ Low'}
                    </span>
                </div>
            </div>

            {/* Warnings */}
            {outcomes.warnings.length > 0 && (
                <div className={styles.warnings}>
                    {outcomes.warnings.map((w, i) => (
                        <div key={i} className={styles.warningItem}>⚠️ {w}</div>
                    ))}
                </div>
            )}

            {/* Score Display */}
            {hasInteracted && (
                <motion.div
                    className={styles.scoreBox}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span>Budget Allocation Score:</span>
                    <span className={styles.score} style={{
                        color: getScore() >= 8 ? '#10b981' : getScore() >= 5 ? '#f59e0b' : '#ef4444'
                    }}>
                        {getScore()}/10
                    </span>
                </motion.div>
            )}

            {/* Insight */}
            <div className={styles.insight}>
                💡 <strong>Key insight:</strong> Context space is limited. Prioritize constraints and sources for accuracy-sensitive tasks.
            </div>
        </div>
    );
};

export default ContextBudgetBuilder;
