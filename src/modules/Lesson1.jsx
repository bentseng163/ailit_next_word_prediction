import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';
import LyricsCompleter from '../components/Interactives/LyricsCompleter';
import PredictionVisualizer from '../components/Interactives/PredictionVisualizer';
import ProbabilityGraph from '../components/Interactives/ProbabilityGraph';
import AmbiguityScenario from '../components/Interactives/AmbiguityScenario';
import HallucinationSpotter from '../components/Interactives/HallucinationSpotter';
import StrategySimulation from '../components/Interactives/StrategySimulation';
import { Shield, User, Bot, Brain } from 'lucide-react';

const Lesson1 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [canProceed, setCanProceed] = useState(true);

    const pages = [
        {
            title: "How LLMs Actually Work",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/cover.png"
                        alt="AI Brain"
                        style={{ width: "100%", borderRadius: "12px", marginBottom: "16px", boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                    />
                    <p>Does LLM actually "think"?</p>
                    <p>In this module, you will learn the one mechanic that explains LLM's capability, hallucinations, creativity, and risks.</p>
                </div>
            ),
            component: null,
            nextLabel: "Start Module"
        },
        {
            title: "The Autocomplete Mystery",
            text: (
                <>
                    <p>Imagine a sentence blocked by a hidden word.</p>
                    <p>How do you know what comes next? You don't "think"—you predict based on patterns you have seen before.</p>
                </>
            ),
            component: <LyricsCompleter onComplete={() => setCanProceed(true)} />,
            nextLabel: "See how this relates to AI"
        },
        {
            title: "The Prediction Machine",
            text: (
                <>
                    <p>LLMs work exactly the same way. They are massive "prediction machines".</p>
                    <p>They don't understand your question. They just compute what word is most likely to follow the last one.</p>
                </>
            ),
            component: <PredictionVisualizer onComplete={() => setCanProceed(true)} />,
            nextLabel: "Look inside the brain"
        },
        {
            title: "Probability, Not Truth",
            text: (
                <>
                    <p>The model doesn't pick the "right" answer. It picks a "probable" one.</p>
                    <p>It acts like a slot machine of words. Sometimes it picks a low-probability word, which makes it creative—or wrong.</p>
                </>
            ),
            component: <ProbabilityGraph />,
            nextLabel: "The Plausibility Trap"
        },
        {
            title: "The Plausibility Trap",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/plausibility_scale.png"
                        alt="Plausibility vs Truth"
                        style={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }}
                    />
                    <p>LLMs are optimized to sound <strong>fluent</strong>, not truthful.</p>
                    <p>If the most probable next word is a lie, the model will say it with 100% confidence.</p>
                </div>
            ),
            component: null,
            nextLabel: "How they fill gaps"
        },
        {
            title: "The Gap Filling Mechanic",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/gap_filling.png"
                        alt="Filling the Gap"
                        style={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }}
                    />
                    <p>Nature abhors a vacuum, and so do LLMs.</p>
                    <p>When an LLM doesn't know the answer, it doesn't stop. It constructs a "bridge" of words that looks structurally correct, even if the facts are missing.</p>
                </div>
            ),
            component: null,
            nextLabel: "Spot the Hallucination"
        },
        {
            title: "Interactive: Hallucination Spotter",
            text: (
                <>
                    <p>Can you spot the fake fact? One of these statements was invented by the AI to look authoritative.</p>
                </>
            ),
            component: <HallucinationSpotter onComplete={() => setCanProceed(true)} />,
            nextLabel: "The PM Risk"
        },
        {
            title: "The Ambiguity Trap",
            text: (
                <>
                    <p>Because LLMs <strong>must</strong> predict the next word, they hate silence.</p>
                    <p>If you ask a vague question, they won't ask for clarification. They will hallucinate a plausible answer just to keep the pattern going.</p>
                </>
            ),
            component: <AmbiguityScenario onComplete={() => setCanProceed(true)} />,
            nextLabel: "Why this matters"
        },
        {
            title: "The Risk for PMs",
            text: (
                <ul style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li><strong>Product Research:</strong> You might get a summary of a competitor feature that doesn't exist.</li>
                    <li><strong>Data Analysis:</strong> It might invent a "trend" to explain random noise.</li>
                    <li><strong>Spec Writing:</strong> It might fill undefined technical gaps with dangerous assumptions.</li>
                </ul>
            ),
            component: null,
            nextLabel: "How to fix it"
        },
        {
            title: "Strategy 1: Grounding (RAG)",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/rag_diagram.png"
                        alt="RAG Architecture"
                        style={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }}
                    />
                    <p>Don't let the model guess. Force it to use a reference.</p>
                    <p><strong>RAG (Retrieval Augmented Generation)</strong> effectively "pastes" the textbook into the prompt before the model answers.</p>
                </div>
            ),
            component: null,
            nextLabel: "Strategy 2"
        },
        {
            title: "Strategy 2: Human-in-the-Loop",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/human_loop.png"
                        alt="Human in the Loop"
                        style={{ width: "100%", borderRadius: "12px", marginBottom: "16px" }}
                    />
                    <p>For high-stakes tasks, never trust the raw output.</p>
                    <p>Treat the LLM as a <strong>junior intern</strong>: amazing speed, but needs a manager to review the work.</p>
                </div>
            ),
            component: null,
            nextLabel: "Test your skills"
        },
        {
            title: "Scenario: The Medical App",
            text: (
                <p>You are building a chatbot for medical advice. User safety is critical. Which strategy do you pick?</p>
            ),
            component: <StrategySimulation
                scenario={{
                    title: "Medical Chatbot",
                    description: "Users ask: 'What is this rash?'",
                    strategies: [
                        { id: 'raw', name: "Raw LLM", icon: <Brain size={24} />, result: "Dangerous! It confidently misdiagnoses cancer as a bug bite.", isRecommended: false },
                        { id: 'rag', name: "RAG + Doctors", icon: <Shield size={24} />, result: "Correct. It only answers using verified medical journals and flags uncertain cases.", isRecommended: true }
                    ]
                }}
                onComplete={() => setCanProceed(true)}
            />,
            nextLabel: "Final Challenge"
        },
        {
            title: "Scenario: Marketing Emails",
            text: (
                <p>You need to write 500 personalized marketing emails. Creativity matters more than perfect factual accuracy.</p>
            ),
            component: <StrategySimulation
                scenario={{
                    title: "Email Campaign",
                    description: "Goal: High engagement, fun tone.",
                    strategies: [
                        { id: 'supervision', name: "Human Review", icon: <User size={24} />, result: "Perfect. The AI drafts 500 options, you review the top 10 for tone.", isRecommended: true },
                        { id: 'strict', name: "Strict Grounding", icon: <Shield size={24} />, result: "Boring. The emails are factually correct but have zero personality.", isRecommended: false }
                    ]
                }}
                onComplete={() => setCanProceed(true)}
            />,
            nextLabel: "Finish Lesson"
        }
    ];

    const nextSlide = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            onExit();
        }
    };

    const prevSlide = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else {
            onExit();
        }
    };

    const currentContent = pages[currentPage];
    const progress = ((currentPage + 1) / pages.length) * 100;

    return (
        <Layout
            progress={progress}
            totalPages={pages.length}
            currentPage={currentPage}
        >
            <InteractiveCard
                key={currentPage}
                title={currentContent.title}
                onNext={nextSlide}
                onBack={prevSlide}
                nextLabel={currentPage === pages.length - 1 ? "Complete Lesson" : currentContent.nextLabel}
                isNextDisabled={!canProceed && false}
            >
                <div style={{ marginBottom: 20 }}>
                    {currentContent.text}
                </div>

                <div style={{ marginTop: 20 }}>
                    {currentContent.component}
                </div>
            </InteractiveCard>
        </Layout>
    );
};

export default Lesson1;
