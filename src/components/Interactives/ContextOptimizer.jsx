import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContextOptimizer.module.css';

/*
 * INTERACTIVE SPEC: Context Window Optimizer
 * 
 * Goal: Drag and drop resources into context window to optimize performance
 * Learner should aim for 98%+ accuracy with 3-4 resources (sweet spot)
 */

const ContextOptimizer = ({ onComplete }) => {
    const [selectedResources, setSelectedResources] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const scenario = {
        title: "AI Customer Support Ticket Tagger",
        description: "Categorize incoming tickets into Bug, Feature, Billing, or General.",
        maxOptimal: 4
    };

    const resources = [
        { id: 'categories', name: 'Category Definitions', icon: '📋', impact: 35, essential: true },
        { id: 'examples', name: 'Example Tickets (10)', icon: '📝', impact: 30, essential: true },
        { id: 'history', name: 'Past Classifications', icon: '📊', impact: 20, essential: true },
        { id: 'product', name: 'Product Documentation', icon: '📖', impact: 10, essential: false },
        { id: 'team', name: 'Team Bios', icon: '👥', impact: -5, essential: false },
        { id: 'branding', name: 'Brand Guidelines', icon: '🎨', impact: -8, essential: false }
    ];

    const toggleResource = (resourceId) => {
        if (showResults) return;

        if (selectedResources.includes(resourceId)) {
            setSelectedResources(selectedResources.filter(id => id !== resourceId));
        } else {
            setSelectedResources([...selectedResources, resourceId]);
        }
    };

    const calculateAccuracy = () => {
        let baseAccuracy = 60;

        // Add impact from selected resources
        resources.forEach(r => {
            if (selectedResources.includes(r.id)) {
                baseAccuracy += r.impact;
            }
        });

        // Penalty for too many resources (context rot)
        if (selectedResources.length > 4) {
            baseAccuracy -= (selectedResources.length - 4) * 5;
        }

        // Penalty for too few resources
        if (selectedResources.length < 2) {
            baseAccuracy -= 10;
        }

        return Math.min(100, Math.max(40, baseAccuracy));
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const accuracy = calculateAccuracy();
    const isOptimal = accuracy >= 98 && selectedResources.length >= 3 && selectedResources.length <= 4;

    const getFeedback = () => {
        if (accuracy >= 98 && selectedResources.length <= 4) {
            return { type: 'success', message: '🎯 Perfect! You found the optimal context balance.' };
        } else if (accuracy >= 90) {
            return { type: 'good', message: '👍 Good! But you can optimize further.' };
        } else if (selectedResources.length > 4) {
            return { type: 'warning', message: '⚠️ Too much context! Remember: context rot decreases accuracy.' };
        } else if (selectedResources.length < 3) {
            return { type: 'warning', message: '⚠️ Not enough context. The model needs more information.' };
        } else {
            return { type: 'error', message: '❌ Missing essential resources. Try adding category definitions or examples.' };
        }
    };

    return (
        <div className={styles.container}>
            {/* Scenario */}
            <div className={styles.scenario}>
                <div className={styles.scenarioTitle}>🎯 {scenario.title}</div>
                <div className={styles.scenarioDesc}>{scenario.description}</div>
            </div>

            {/* Resources to select */}
            <div className={styles.resourcesLabel}>
                Select resources to add to context window:
            </div>
            <div className={styles.resources}>
                {resources.map(resource => {
                    const selected = selectedResources.includes(resource.id);
                    return (
                        <motion.button
                            key={resource.id}
                            className={`${styles.resource} ${selected ? styles.selected : ''}`}
                            onClick={() => toggleResource(resource.id)}
                            whileTap={{ scale: 0.95 }}
                            disabled={showResults}
                        >
                            <span className={styles.resourceIcon}>{resource.icon}</span>
                            <span className={styles.resourceName}>{resource.name}</span>
                            {selected && <span className={styles.checkmark}>✓</span>}
                        </motion.button>
                    );
                })}
            </div>

            {/* Context Window Preview */}
            <div className={styles.preview}>
                <div className={styles.previewLabel}>Context Window ({selectedResources.length}/6)</div>
                <div className={styles.previewBar}>
                    <div
                        className={styles.previewFill}
                        style={{
                            width: `${(selectedResources.length / 6) * 100}%`,
                            background: selectedResources.length > 4 ? '#ef4444' : '#10b981'
                        }}
                    />
                </div>
            </div>

            {/* Submit */}
            {selectedResources.length > 0 && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Test Configuration
                </motion.button>
            )}

            {/* Results */}
            {showResults && (
                <motion.div
                    className={styles.results}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className={styles.accuracyRow}>
                        <span>Accuracy:</span>
                        <span
                            className={styles.accuracyScore}
                            style={{ color: accuracy >= 98 ? '#10b981' : accuracy >= 80 ? '#f59e0b' : '#ef4444' }}
                        >
                            {accuracy}%
                        </span>
                    </div>
                    <div className={`${styles.feedback} ${styles[getFeedback().type]}`}>
                        {getFeedback().message}
                    </div>
                    {!isOptimal && (
                        <button
                            className={styles.retryBtn}
                            onClick={() => {
                                setSelectedResources([]);
                                setShowResults(false);
                            }}
                        >
                            Try Again
                        </button>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default ContextOptimizer;
