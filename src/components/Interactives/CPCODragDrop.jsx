import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CPCODragDrop.module.css';

/*
 * INTERACTIVE SPEC: CPCO Drag-Drop Identifier
 * 
 * Goal: Learners identify the 4 parts of a well-structured prompt
 * 
 * UI: One prompt with 4 highlighted draggable sections, 4 drop zones (C/P/C/O)
 * Grading: All 4 correct = full score, feedback on each
 */

const CPCODragDrop = ({ onComplete }) => {
    const [assignments, setAssignments] = useState({
        context: null,
        persona: null,
        constraints: null,
        output: null
    });
    const [draggedPart, setDraggedPart] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const promptParts = [
        {
            id: 'part1',
            text: 'You are a senior customer support analyst at a SaaS company.',
            correctBox: 'persona',
            explanation: 'This defines WHO the AI should act as.'
        },
        {
            id: 'part2',
            text: 'We receive 500+ tickets daily and need to reduce response time.',
            correctBox: 'context',
            explanation: 'This provides situational awareness and background.'
        },
        {
            id: 'part3',
            text: 'Categorize each ticket. Do not respond to the customer. Use only the categories: Bug, Feature, Billing, Other.',
            correctBox: 'constraints',
            explanation: 'These are the boundaries and rules for the task.'
        },
        {
            id: 'part4',
            text: 'Output a JSON object with fields: ticket_id, category, confidence_score.',
            correctBox: 'output',
            explanation: 'This defines the exact format/schema of the response.'
        }
    ];

    const dropZones = [
        { id: 'context', label: 'C', fullName: 'Context', color: '#3b82f6', desc: 'Global Variables' },
        { id: 'persona', label: 'P', fullName: 'Persona', color: '#8b5cf6', desc: 'Processing Logic' },
        { id: 'constraints', label: 'C', fullName: 'Constraints', color: '#f59e0b', desc: 'The Filter' },
        { id: 'output', label: 'O', fullName: 'Output', color: '#10b981', desc: 'Return Statement' }
    ];

    const handleDragStart = (partId) => {
        setDraggedPart(partId);
    };

    const handleDrop = (zoneId) => {
        if (draggedPart && !showResults) {
            // Remove from previous zone if assigned elsewhere
            const newAssignments = { ...assignments };
            Object.keys(newAssignments).forEach(key => {
                if (newAssignments[key] === draggedPart) {
                    newAssignments[key] = null;
                }
            });
            newAssignments[zoneId] = draggedPart;
            setAssignments(newAssignments);
            setDraggedPart(null);
        }
    };

    const getPartById = (partId) => promptParts.find(p => p.id === partId);

    const allAssigned = Object.values(assignments).every(v => v !== null);

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const getScore = () => {
        let correct = 0;
        Object.entries(assignments).forEach(([zone, partId]) => {
            const part = getPartById(partId);
            if (part && part.correctBox === zone) correct++;
        });
        return correct;
    };

    const isPartAssigned = (partId) => {
        return Object.values(assignments).includes(partId);
    };

    return (
        <div className={styles.container}>
            {/* Prompt Parts Pool */}
            <div className={styles.partsPool}>
                <div className={styles.poolLabel}>📋 Drag each part to its CPCO category:</div>
                {promptParts.map(part => {
                    const assigned = isPartAssigned(part.id);
                    return (
                        <motion.div
                            key={part.id}
                            className={`${styles.partChip} ${assigned ? styles.assigned : ''}`}
                            draggable={!showResults && !assigned}
                            onDragStart={() => handleDragStart(part.id)}
                            whileTap={{ scale: 0.98 }}
                            style={{ opacity: assigned ? 0.4 : 1 }}
                        >
                            "{part.text}"
                        </motion.div>
                    );
                })}
            </div>

            {/* Drop Zones */}
            <div className={styles.dropZones}>
                {dropZones.map(zone => {
                    const assignedPart = assignments[zone.id] ? getPartById(assignments[zone.id]) : null;
                    const isCorrect = assignedPart && assignedPart.correctBox === zone.id;

                    return (
                        <div
                            key={zone.id}
                            className={`${styles.dropZone} ${showResults && assignedPart ? (isCorrect ? styles.correct : styles.wrong) : ''}`}
                            style={{ borderColor: zone.color }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(zone.id)}
                        >
                            <div className={styles.zoneHeader} style={{ background: `${zone.color}20` }}>
                                <span className={styles.zoneLetter} style={{ background: zone.color }}>{zone.label}</span>
                                <span className={styles.zoneName}>{zone.fullName}</span>
                            </div>
                            <div className={styles.zoneContent}>
                                {assignedPart ? (
                                    <div className={styles.assignedText}>
                                        "{assignedPart.text.substring(0, 50)}..."
                                        {showResults && (
                                            <div className={styles.feedback}>
                                                {isCorrect ? '✅' : '❌'} {assignedPart.explanation}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className={styles.placeholder}>Drop here</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Submit Button */}
            {allAssigned && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Check My Answers
                </motion.button>
            )}

            {/* Results */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        className={styles.results}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.scoreRow}>
                            <span>Score:</span>
                            <span className={styles.score} style={{
                                color: getScore() === 4 ? '#10b981' : getScore() >= 2 ? '#f59e0b' : '#ef4444'
                            }}>
                                {getScore()}/4
                            </span>
                        </div>
                        {getScore() === 4 && (
                            <div className={styles.perfectMessage}>
                                🎉 Perfect! You've identified all CPCO components correctly.
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CPCODragDrop;
