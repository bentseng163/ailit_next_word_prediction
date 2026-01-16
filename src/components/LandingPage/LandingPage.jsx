import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LandingPage.module.css';

const LandingPage = ({ onSelectModule }) => {
    const [expandedModule, setExpandedModule] = useState('engaging');

    const moduleGroups = {
        engaging: {
            id: 'engaging',
            title: "Engaging with AI",
            subtitle: "Understand how AI actually works under the hood",
            icon: "🔍",
            gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
            lessons: [
                {
                    id: 'lesson1',
                    title: "How LLMs Actually Work",
                    desc: "Stop treating AI like a human. Learn the mechanics of next-token prediction.",
                    duration: "10 min",
                    color: "var(--color-accent-primary)"
                },
                {
                    id: 'lesson2',
                    title: "How Image Generation Works",
                    desc: "Denoising, brand drift, and how to control the vibe.",
                    duration: "10 min",
                    color: "var(--color-accent-secondary)"
                },
                {
                    id: 'lesson3',
                    title: "How Video Generation Works",
                    desc: "Frame prediction, stability, and why drift happens.",
                    duration: "10 min",
                    color: "#8b5cf6"
                },
                {
                    id: 'insight',
                    title: "The Big Idea: Plausibility vs Understanding",
                    desc: "Why confident AI makes mistakes, and how to spot them.",
                    duration: "10 min",
                    color: "#f59e0b"
                }
            ]
        },
        creating: {
            id: 'creating',
            title: "Creating with AI",
            subtitle: "Master the art of building with AI tools",
            icon: "✨",
            gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            lessons: [
                {
                    id: 'creating1',
                    title: "Prompt Engineering: Specs, Not Wishes",
                    desc: "Prompts aren't questions—they're specifications. Learn the Goal/Constraints/Format/Checks framework.",
                    duration: "10 min",
                    color: "#8b5cf6"
                },
                {
                    id: 'creating2',
                    title: "Context Engineering 101",
                    desc: "Control the model's working memory. Prioritize what goes in and what stays out.",
                    duration: "10 min",
                    color: "#a855f7"
                },
                {
                    id: 'creating3',
                    title: "Agent Briefing",
                    desc: "Delegate work to agents without chaos. Objective, tools, constraints, stop rules.",
                    duration: "10 min",
                    color: "#d946ef"
                },
                {
                    id: 'creating4',
                    title: "The Big Idea: Completion Space",
                    desc: "One insight ties it all together—control how many plausible outputs exist.",
                    duration: "10 min",
                    color: "#ec4899"
                }
            ]
        },
        managing: {
            id: 'managing',
            title: "Managing AI",
            subtitle: "Run AI agents as reliable work systems",
            icon: "🎛️",
            gradient: "linear-gradient(135deg, #10b981, #3b82f6)",
            lessons: [
                {
                    id: 'managing1',
                    title: "Computer-User Agents",
                    desc: "How agents see, decide, and act. Failure modes: misreads, drift, loops.",
                    duration: "10 min",
                    color: "#10b981"
                },
                {
                    id: 'managing2',
                    title: "Delegation Design",
                    desc: "Turn vague goals into agent-friendly specs with acceptance criteria.",
                    duration: "10 min",
                    color: "#22c55e"
                },
                {
                    id: 'managing3',
                    title: "Monitoring Agents",
                    desc: "Logs, metrics, thresholds, and runbooks. Trust through observability.",
                    duration: "10 min",
                    color: "#3b82f6"
                }
            ]
        },
        designing: {
            id: 'designing',
            title: "Designing AI",
            subtitle: "Shape AI behavior responsibly",
            icon: "🎨",
            gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
            lessons: [
                {
                    id: 'designing1',
                    title: "Fine-Tuning: Teaching New Habits",
                    desc: "Reinforcing patterns with examples. Risks: overfitting, forgetting, bias.",
                    duration: "10 min",
                    color: "#f59e0b"
                },
                {
                    id: 'designing2',
                    title: "Bias Mitigation",
                    desc: "Layered approach: data, prompts, UI, policy, escalation.",
                    duration: "10 min",
                    color: "#f97316"
                },
                {
                    id: 'designing3',
                    title: "AI Evals 101",
                    desc: "Rubrics, golden sets, tail risk. Measure what matters.",
                    duration: "10 min",
                    color: "#ef4444"
                },
                {
                    id: 'designing4',
                    title: "The Big Idea: Shape + Safeguard + Measure",
                    desc: "Design the system, not just outputs. The responsible AI playbook.",
                    duration: "10 min",
                    color: "#dc2626"
                }
            ]
        }
    };

    const toggleModule = (moduleId) => {
        setExpandedModule(expandedModule === moduleId ? null : moduleId);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>AI Fundamentals</h1>
                <p className={styles.subtitle}>Bite-sized simulations for PMs</p>
            </header>

            <div className={styles.modulesContainer}>
                {Object.values(moduleGroups).map((moduleGroup, moduleIndex) => (
                    <motion.div
                        key={moduleGroup.id}
                        className={styles.moduleSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: moduleIndex * 0.15 }}
                    >
                        <motion.div
                            className={styles.moduleHeader}
                            onClick={() => toggleModule(moduleGroup.id)}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className={styles.moduleHeaderLeft}>
                                <div
                                    className={styles.moduleIcon}
                                    style={{ background: moduleGroup.gradient }}
                                >
                                    {moduleGroup.icon}
                                </div>
                                <div className={styles.moduleInfo}>
                                    <h2 className={styles.moduleTitle}>{moduleGroup.title}</h2>
                                    <p className={styles.moduleSubtitle}>{moduleGroup.subtitle}</p>
                                </div>
                            </div>
                            <motion.div
                                className={styles.expandIcon}
                                animate={{ rotate: expandedModule === moduleGroup.id ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                ▼
                            </motion.div>
                        </motion.div>

                        <AnimatePresence>
                            {expandedModule === moduleGroup.id && (
                                <motion.div
                                    className={styles.lessonsGrid}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    {moduleGroup.lessons.map((lesson, i) => (
                                        <motion.div
                                            key={lesson.id}
                                            className={`${styles.card} ${lesson.comingSoon ? styles.cardComingSoon : ''}`}
                                            whileTap={lesson.comingSoon ? {} : { scale: 0.98 }}
                                            onClick={() => !lesson.comingSoon && onSelectModule(lesson.id)}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                        >
                                            <div className={styles.cardHeader}>
                                                <div
                                                    className={styles.icon}
                                                    style={{ backgroundColor: lesson.color }}
                                                />
                                                <div className={styles.cardBadges}>
                                                    {lesson.comingSoon && (
                                                        <span className={styles.comingSoonBadge}>Coming Soon</span>
                                                    )}
                                                    <span className={styles.duration}>{lesson.duration}</span>
                                                </div>
                                            </div>
                                            <h3 className={styles.cardTitle}>{lesson.title}</h3>
                                            <p className={styles.cardDesc}>{lesson.desc}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LandingPage;
