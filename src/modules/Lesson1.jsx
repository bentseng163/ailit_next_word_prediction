import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';
import LyricsCompleter from '../components/Interactives/LyricsCompleter';
import PredictionVisualizer from '../components/Interactives/PredictionVisualizer';
import ProbabilityGraph from '../components/Interactives/ProbabilityGraph';
import AmbiguityScenario from '../components/Interactives/AmbiguityScenario';

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
                    <p>LLMs work in a similar way. They are massive "prediction machines".</p>
                    <p>They don't understand your question. They just compute what word is most likely to follow the last one based on the data it saw before.</p>
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
            nextLabel: "Why this matters for PMs"
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
