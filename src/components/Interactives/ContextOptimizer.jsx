import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContextOptimizer.module.css';

/*
 * INTERACTIVE SPEC: Context Window Optimizer (Drag & Drop)
 * 
 * Goal: Drag resources into the context window to optimize accuracy
 * Optimal: Category Definitions + Example Tickets + Past Classifications (exactly 3)
 * 
 * Color coding:
 *   - 1-3 items: Green (optimal zone)
 *   - 4-5 items: Yellow (warning - context rot starting)
 *   - 6 items: Red (too much context)
 * 
 * Accuracy:
 *   - 100% with exactly the 3 essential resources
 *   - Decreases if missing any essential OR adding non-essential (context rot)
 */

const ContextOptimizer = ({ onComplete }) => {
    const [contextWindow, setContextWindow] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const scenario = {
        title: "AI Customer Support Ticket Tagger",
        description: "Categorize incoming tickets into Bug, Feature, Billing, or General."
    };

    const resources = [
        { id: 'categories', name: 'Category Definitions', icon: '📋', essential: true },
        { id: 'examples', name: 'Example Tickets (10)', icon: '📝', essential: true },
        { id: 'history', name: 'Past Classifications', icon: '📊', essential: true },
        { id: 'product', name: 'Product Documentation', icon: '📖', essential: false },
        { id: 'team', name: 'Team Bios', icon: '👥', essential: false },
        { id: 'branding', name: 'Brand Guidelines', icon: '🎨', essential: false }
    ];

    const essentialIds = ['categories', 'examples', 'history'];

    // Drag handlers
    const handleDragStart = (resourceId) => {
        if (showResults) return;
        setDraggedItem(resourceId);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (showResults || !draggedItem) return;

        if (!contextWindow.includes(draggedItem)) {
            setContextWindow([...contextWindow, draggedItem]);
        }
        setDraggedItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeFromContext = (resourceId) => {
        if (showResults) return;
        setContextWindow(contextWindow.filter(id => id !== resourceId));
    };

    // Calculate accuracy based on selection
    const calculateAccuracy = () => {
        const hasAllEssentials = essentialIds.every(id => contextWindow.includes(id));
        const essentialCount = contextWindow.filter(id => essentialIds.includes(id)).length;
        const nonEssentialCount = contextWindow.length - essentialCount;

        // Perfect: exactly the 3 essentials
        if (hasAllEssentials && contextWindow.length === 3) {
            return 100;
        }

        // Start from base and adjust
        let accuracy = 60;

        // Add points for each essential
        accuracy += essentialCount * 12;

        // Penalty for each non-essential (context rot)
        accuracy -= nonEssentialCount * 8;

        // Extra penalty for missing essentials
        const missingEssentials = 3 - essentialCount;
        accuracy -= missingEssentials * 5;

        return Math.min(99, Math.max(45, accuracy));
    };

    const handleSubmit = () => {
        setShowResults(true);
        const accuracy = calculateAccuracy();
        if (accuracy === 100) {
            onComplete && onComplete();
        }
    };

    const accuracy = calculateAccuracy();
    const isOptimal = accuracy === 100;

    // Context window color based on item count
    const getWindowColor = () => {
        if (contextWindow.length <= 3) return '#10b981'; // Green
        if (contextWindow.length <= 5) return '#f59e0b'; // Yellow
        return '#ef4444'; // Red
    };

    const getFeedback = () => {
        if (accuracy === 100) {
            return { type: 'success', message: '🎯 Perfect! You found the optimal context—maximum signal, minimum noise.' };
        }

        const hasAllEssentials = essentialIds.every(id => contextWindow.includes(id));
        const nonEssentialCount = contextWindow.filter(id => !essentialIds.includes(id)).length;

        if (!hasAllEssentials) {
            return { type: 'warning', message: '⚠️ Missing essential resources. The model needs category definitions, examples, and past classifications.' };
        }

        if (nonEssentialCount > 0) {
            return { type: 'warning', message: '⚠️ Context rot! Extra resources are diluting the model\'s focus. Remove non-essential items.' };
        }

        return { type: 'error', message: '❌ Try a different combination.' };
    };

    const availableResources = resources.filter(r => !contextWindow.includes(r.id));

    return (
        <div className={styles.container}>
            {/* Scenario */}
            <div className={styles.scenario}>
                <div className={styles.scenarioTitle}>🎯 {scenario.title}</div>
                <div className={styles.scenarioDesc}>{scenario.description}</div>
            </div>

            {/* Available Resources */}
            <div className={styles.resourcesLabel}>
                Drag resources into the context window:
            </div>
            <div className={styles.resources}>
                {availableResources.map(resource => (
                    <motion.div
                        key={resource.id}
                        className={styles.resource}
                        draggable={!showResults}
                        onDragStart={() => handleDragStart(resource.id)}
                        onDragEnd={handleDragEnd}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ cursor: showResults ? 'default' : 'grab' }}
                    >
                        <span className={styles.resourceIcon}>{resource.icon}</span>
                        <span className={styles.resourceName}>{resource.name}</span>
                    </motion.div>
                ))}
                {availableResources.length === 0 && (
                    <div className={styles.emptyPool}>All resources added</div>
                )}
            </div>

            {/* Context Window Drop Zone */}
            <div
                className={`${styles.contextWindow} ${draggedItem ? styles.dragOver : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ borderColor: getWindowColor() }}
            >
                <div className={styles.windowHeader}>
                    <span>Context Window</span>
                    <span
                        className={styles.countBadge}
                        style={{ background: getWindowColor() }}
                    >
                        {contextWindow.length}/6
                    </span>
                </div>
                <div className={styles.windowContent}>
                    <AnimatePresence>
                        {contextWindow.length === 0 ? (
                            <div className={styles.dropHint}>
                                Drop resources here
                            </div>
                        ) : (
                            contextWindow.map(id => {
                                const resource = resources.find(r => r.id === id);
                                return (
                                    <motion.div
                                        key={id}
                                        className={styles.contextItem}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        onClick={() => removeFromContext(id)}
                                        style={{ cursor: showResults ? 'default' : 'pointer' }}
                                    >
                                        <span>{resource.icon}</span>
                                        <span className={styles.contextItemName}>{resource.name}</span>
                                        {!showResults && <span className={styles.removeBtn}>×</span>}
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
                {/* Fill bar */}
                <div className={styles.fillBar}>
                    <div
                        className={styles.fillProgress}
                        style={{
                            width: `${(contextWindow.length / 6) * 100}%`,
                            background: getWindowColor()
                        }}
                    />
                </div>
            </div>

            {/* Submit */}
            {contextWindow.length > 0 && !showResults && (
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
                            style={{ color: accuracy === 100 ? '#10b981' : accuracy >= 80 ? '#f59e0b' : '#ef4444' }}
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
                                setContextWindow([]);
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
