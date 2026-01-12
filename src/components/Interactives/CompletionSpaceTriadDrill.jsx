import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CompletionSpaceTriadDrill.module.css';

/*
 * INTERACTIVE SPEC: Completion Space Triad Drill
 * 
 * Goal: Reinforce the "3 levers" across different contexts (prompt, context, agent).
 * 
 * UI:
 * - Three tabs: Text prompt / Context pack / Agent task card
 * - Each tab shows a flawed example
 * - Learner chooses 2 improvements from a list (constraints, grounding, checks)
 * 
 * Feedback: Show how each improvement shrinks completion space
 * 
 * Grading: Full credit for appropriate selections per context
 */

const CompletionSpaceTriadDrill = ({ onComplete }) => {
    const [activeTab, setActiveTab] = useState('prompt');
    const [selections, setSelections] = useState({
        prompt: [],
        context: [],
        agent: []
    });
    const [showResults, setShowResults] = useState(false);

    const tabs = [
        { id: 'prompt', label: '📝 Prompt', icon: '📝' },
        { id: 'context', label: '📚 Context', icon: '📚' },
        { id: 'agent', label: '🤖 Agent', icon: '🤖' },
    ];

    const scenarios = {
        prompt: {
            title: "Flawed Prompt",
            example: '"Summarize this for the team."',
            problem: "No goal, no format, no checks",
            options: [
                { id: 'constraint', text: 'Add constraint: "120 words max"', correct: true },
                { id: 'audience', text: 'Add goal: "For exec decision"', correct: true },
                { id: 'check', text: 'Add check: "List assumptions"', correct: true },
                { id: 'emoji', text: 'Add: "Use emojis"', correct: false },
            ],
            requiredCount: 2,
            correctTypes: ['constraint', 'check']
        },
        context: {
            title: "Flawed Context Pack",
            example: "Goal: Write report\n[500 words of background]\n[No sources attached]",
            problem: "Background heavy, sources missing",
            options: [
                { id: 'sources', text: 'Add: Source documents', correct: true },
                { id: 'must', text: 'Add: MUST-HAVE section', correct: true },
                { id: 'mustnot', text: 'Add: MUST-NOT section', correct: true },
                { id: 'morehistory', text: 'Add: More history', correct: false },
            ],
            requiredCount: 2,
            correctTypes: ['sources', 'must']
        },
        agent: {
            title: "Flawed Task Card",
            example: "Objective: Research the market\nTools: All enabled\n[No stop rules]",
            problem: "Broad permissions, no boundaries",
            options: [
                { id: 'mintools', text: 'Limit to: Read-only tools', correct: true },
                { id: 'stoprule', text: 'Add: Stop after 10 searches', correct: true },
                { id: 'success', text: 'Add: Success = doc created', correct: true },
                { id: 'moretools', text: 'Enable: Email sending', correct: false },
            ],
            requiredCount: 2,
            correctTypes: ['stoprule', 'mintools']
        }
    };

    const toggleOption = (tabId, optionId) => {
        if (showResults) return;
        const current = selections[tabId];
        if (current.includes(optionId)) {
            setSelections({ ...selections, [tabId]: current.filter(id => id !== optionId) });
        } else if (current.length < 2) {
            setSelections({ ...selections, [tabId]: [...current, optionId] });
        }
    };

    const getTabScore = (tabId) => {
        const scenario = scenarios[tabId];
        const selected = selections[tabId];
        const correctSelections = selected.filter(id =>
            scenario.options.find(o => o.id === id)?.correct
        );
        return correctSelections.length;
    };

    const getTotalScore = () => {
        return getTabScore('prompt') + getTabScore('context') + getTabScore('agent');
    };

    const allTabsComplete = () => {
        return selections.prompt.length >= 2 &&
            selections.context.length >= 2 &&
            selections.agent.length >= 2;
    };

    const handleSubmit = () => {
        setShowResults(true);
        onComplete && onComplete();
    };

    const currentScenario = scenarios[activeTab];

    return (
        <div className={styles.container}>
            {/* Tabs */}
            <div className={styles.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''} ${selections[tab.id].length >= 2 ? styles.tabComplete : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon} {tab.label}
                        {selections[tab.id].length >= 2 && <span className={styles.tabCheck}>✓</span>}
                    </button>
                ))}
            </div>

            {/* Current Scenario */}
            <div className={styles.scenarioCard}>
                <div className={styles.scenarioTitle}>{currentScenario.title}</div>
                <pre className={styles.scenarioExample}>{currentScenario.example}</pre>
                <div className={styles.scenarioProblem}>⚠️ {currentScenario.problem}</div>
            </div>

            {/* Options (pick 2) */}
            <div className={styles.optionsHeader}>
                Pick 2 improvements:
                <span className={styles.selectionCount}>
                    {selections[activeTab].length}/2
                </span>
            </div>

            <div className={styles.options}>
                {currentScenario.options.map(option => {
                    const isSelected = selections[activeTab].includes(option.id);
                    const showCorrectness = showResults;

                    return (
                        <motion.button
                            key={option.id}
                            className={`${styles.option} ${isSelected ? styles.optionSelected : ''} ${showCorrectness && isSelected ? (option.correct ? styles.optionCorrect : styles.optionWrong) : ''}`}
                            onClick={() => toggleOption(activeTab, option.id)}
                            whileTap={!showResults ? { scale: 0.98 } : {}}
                        >
                            <span className={styles.optionCheck}>
                                {isSelected ? '✓' : ''}
                            </span>
                            {option.text}
                        </motion.button>
                    );
                })}
            </div>

            {/* Submit Button */}
            {allTabsComplete() && !showResults && (
                <motion.button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Check All Answers
                </motion.button>
            )}

            {/* Results */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        className={styles.resultsPanel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.scoreRow}>
                            <span>Total Score:</span>
                            <span className={styles.score} style={{
                                color: getTotalScore() >= 5 ? '#10b981' : getTotalScore() >= 3 ? '#f59e0b' : '#ef4444'
                            }}>
                                {getTotalScore()}/6
                            </span>
                        </div>

                        <div className={styles.tabScores}>
                            {tabs.map(tab => (
                                <div key={tab.id} className={styles.tabScore}>
                                    <span>{tab.icon}</span>
                                    <span style={{ color: getTabScore(tab.id) === 2 ? '#10b981' : '#f59e0b' }}>
                                        {getTabScore(tab.id)}/2
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.insight}>
                            💡 <strong>Key insight:</strong> Same three levers everywhere—Constraints, Grounding, Checks.
                            Turn them up as stakes rise.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CompletionSpaceTriadDrill;
