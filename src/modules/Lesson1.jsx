import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// Components
import LyricsCompleter from '../components/Interactives/LyricsCompleter';
import PredictionVisualizer from '../components/Interactives/PredictionVisualizer';
import ProbabilityGraph from '../components/Interactives/ProbabilityGraph';
import AmbiguityScenario from '../components/Interactives/AmbiguityScenario';
import HallucinationSpotter from '../components/Interactives/HallucinationSpotter';
import StrategySimulation from '../components/Interactives/StrategySimulation';
import RAGProbabilityShift from '../components/Interactives/RAGProbabilityShift';
import RAGSnippetPicker from '../components/Interactives/RAGSnippetPicker';
import FewShotSteerer from '../components/Interactives/FewShotSteerer';
import FewShotPromptFixer from '../components/Interactives/FewShotPromptFixer';
import AccuracyCheck from '../components/Interactives/AccuracyCheck';
import GoalSetter from '../components/GoalSetter/GoalSetter';

// Icons for Strategy Simulation
import { ClipboardList, FolderSearch, Layers, ShieldCheck } from 'lucide-react';

const Lesson1 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(-1); // Start at -1 for GoalSetter
    const [canProceed, setCanProceed] = useState(true);
    const [userGoal, setUserGoal] = useState('default'); // 'default', 'productivity', 'shipping'

    // --- Scenario Definitions ---

    // 1. RAG Scenarios
    const ragScenarios = {
        default: undefined, // Use component default (Apple)
        productivity: {
            question: "Prompt: 'What are the action items from the meeting?'",
            noRagContext: "Model guesses generic action items (based on training data of typical meetings).",
            ragContext: "Retrieved Transcript: 'Ben said he will fix the bug by EOD...'",
            items: [
                { word: "Schedule", probBefore: 30, probAfter: 5, color: "var(--color-text-secondary)" },
                { word: "Fix_Bug", probBefore: 10, probAfter: 80, color: "var(--color-accent-primary)" },
                { word: "Sync", probBefore: 20, probAfter: 10, color: "var(--color-text-secondary)" },
                { word: "None", probBefore: 40, probAfter: 5, color: "var(--color-text-secondary)" }
            ]
        },
        shipping: {
            question: "Prompt: 'How do I authenticate with the API?'",
            noRagContext: "Model hallucinations a sound-alike method (e.g. auth.login()).",
            ragContext: "Retrieved Docs: 'Use the X-Auth-Token header...'",
            items: [
                { word: "auth.login", probBefore: 60, probAfter: 5, color: "var(--color-text-secondary)" },
                { word: "Header", probBefore: 10, probAfter: 85, color: "var(--color-accent-primary)" },
                { word: "OAuth", probBefore: 20, probAfter: 5, color: "var(--color-text-secondary)" },
                { word: "Cookie", probBefore: 10, probAfter: 5, color: "var(--color-text-secondary)" }
            ]
        }
    };

    // 2. Few-Shot Steerer Scenarios
    const steererScenarios = {
        default: undefined, // Meeting Brief
        productivity: {
            // Reusing Meeting Brief as it fits well, but customizing slightly for "Email" focus
            instruction: "Steer the format: Turn raw notes into a client email.",
            outputs: {
                '0': { variations: ["Notes: Client wants X. Email them.", "Hey, client said X by Q4. Price high.", "Draft: feature X, Q4, price?"] },
                '1': { variations: ["Subject: Meeting\nHi, Client wants Feature X by Q4. Price is issue.\nThanks.", "Subject: Update\nFeature X is needed by Q4. Risk: Price.\nBest, AI"] },
                '3': { variations: ["Subject: Sync Summary\n\nHi Team,\n\nClient: Acme\nAsk: Feature X (Q4)\nRisk: Pricing\n\nBest,", "Subject: Sync Summary\n\nHi Team,\n\nClient: Acme\nAsk: Feature X (Q4)\nRisk: Pricing\n\nBest,"] }
            }
        },
        shipping: {
            instruction: "Steer the format: Unstructured Text -> JSON.",
            outputs: {
                '0': { variations: ["{ name: 'Acme', Q4 }", "JSON: name=Acme, feature=X", "Error: unexpected token."] },
                '1': { variations: ["{ \"client\": \"Acme\", \"ask\": \"Feature X\" }", "{ \"customer\": \"Acme\", \"req\": \"Feature X\" }"] },
                '3': { variations: ["{\n  \"client\": \"Acme\",\n  \"feature\": \"X\",\n  \"deadline\": \"Q4\"\n}", "{\n  \"client\": \"Acme\",\n  \"feature\": \"X\",\n  \"deadline\": \"Q4\"\n}"] }
            }
        }
    };

    // 3. Prompt Fixer Scenarios
    const fixerScenarios = {
        default: undefined, // Ecommerce
        productivity: {
            instruction: "Scenario: Summarize a <strong>50-page Technical Report</strong>.",
            options: {
                'none': {
                    label: 'No Example',
                    prompt: "Summarize this report.",
                    feedback: "The model might give you a 10-page essay or a 1-sentence blurb. You have no control over length or depth.",
                    outputs: ["The report discusses X, Y, Z and also A, B, C... [100 lines follow]", "It's about technology.", "Chapter 1 says..."],
                    isCorrect: false
                },
                'one': {
                    label: 'One Ex.',
                    prompt: "Summarize this report.\nExample: [Summary of a different financial report]",
                    feedback: "Risky. If your example focuses on 'Financials', the model might ignore the technical details of the current report.",
                    outputs: ["Financial Impact: N/A. (Missed the tech details)", "Revenue: $0. (It's a technical report!)"],
                    isCorrect: false
                },
                'few': {
                    label: 'Few Ex.',
                    prompt: "Summarize (3 diverse examples showing 'Key Tech Findings' structure).",
                    feedback: "Correct! You teach the pattern: Extract Key Tech Findings + Risk Analysis.",
                    outputs: ["**Key Findings**\n1. Latency reduced\n2. Scale increased\n**Risks**\n- Cost", "**Key Findings**\n1. Modular arch\n2. Faster builds\n**Risks**\n- Migration"],
                    isCorrect: true
                }
            }
        },
        shipping: undefined // Reuse Ecommerce as "Customer Review Analysis" is a valid shipping feature
    };

    // 4. Strategy Simulation Scenarios
    const simulationScenarios = {
        default: {
            title: "Weekly Update Generator",
            description: "Inputs: messy notes + dashboards. Output: structured update. Constraint: limited time.",
        },
        productivity: {
            title: "Personal Email Assistant",
            description: "Inputs: Incoming emails. Output: Draft replies. Constraint: Must be professional.",
        },
        shipping: {
            title: "Enterprise RAG Chatbot",
            description: "Inputs: 10k PDF docs. Output: Answer user questions. Constraint: No hallucinations allowed.",
        }
    };

    const handleGoalSet = (goalType) => {
        setUserGoal(goalType);
        setCurrentPage(0); // Move to Cover page
    };

    const pages = [
        {
            title: "How LLMs Actually Work",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/cover.png"
                        alt="LLM cover"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                        }}
                    />
                    <p style={{ marginBottom: 8 }}>
                        <strong>Hot take:</strong> LLMs don’t “think.” They only guess the next word with confidence.
                    </p>
                    <p style={{ marginBottom: 8 }}>
                        In 10 minutes, you’ll learn <strong>the core mechanism</strong> that explains the capabilities and hallucinations
                        of LLMs and how to reduce “confident nonsense”.
                    </p>

                </div>
            ),
            component: null,
            nextLabel: "Start",
        },
        // ... (Pages 1-9 are largely static/concept based, skipping to Page 10 for first shift)
        {
            title: "The Autocomplete Mystery (You’ve Done This Before)",
            text: (
                <>
                    <p>
                        If a sentence has a missing word, you can often fill it in instantly. Not because you’re “thinking deeply,”
                        but because you’ve seen similar patterns before.
                    </p>
                    <p>
                        That pattern-based guessing is the key to understanding LLMs. (Congrats—you’re a tiny biological autocomplete.)
                    </p>
                </>
            ),
            component: <LyricsCompleter onComplete={() => setCanProceed(true)} />,
            nextLabel: "So what is the mechanism?",
        },

        {
            title: "The Mechanism: Next-Word Prediction",
            text: (
                <>
                    <p>
                        An LLM reads the words so far, then computes a <strong>probability distribution</strong> over what word should come next.
                    </p>
                    <p>
                        It doesn’t “know” facts. It predicts language that looks most likely in this context.
                    </p>
                    <p style={{ marginTop: 8, opacity: 0.9 }}>
                        One mechanism, many outcomes: helpful drafts, creative ideas… and occasional hallucinations wearing a suit.
                    </p>
                </>
            ),
            component: <PredictionVisualizer onComplete={() => setCanProceed(true)} />,
            nextLabel: "Show me probabilities",
        },

        {
            title: "Probability, Not Truth (The Plot Twist)",
            text: (
                <>
                    <p>
                        The model doesn’t pick the “right” word. It picks a <strong>likely</strong> one.
                    </p>
                    <p>
                        Most of the time it chooses the top option. Sometimes it samples a lower-probability one—hello creativity 👋 and hello occasional nonsense.
                    </p>
                    <p style={{ marginTop: 8 }}>
                        Key idea: it’s always guessing. Just with a very fancy calculator.
                    </p>
                </>
            ),
            component: <ProbabilityGraph />,
            nextLabel: "So why hallucinations?",
        },



        {
            title: "The Plausibility Trap (Fluent ≠ Grounded)",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/plausibility_scale.png"
                        alt="Plausibility vs Evidence"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        LLMs are optimized for <strong>plausible continuation</strong>—language that “fits.”
                    </p>
                    <p>
                        Plausible doesn’t mean verified. It means “this is what usually gets said next.”
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        The trap: polished text triggers human trust. (We are emotionally vulnerable to well-structured bullet points.)
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Ambiguity makes it worse…",
        },

        {
            title: "Interactive: The Ambiguity Trap",
            text: (
                <>
                    <p>
                        When a question is vague, the model still has to produce the next word. So it fills missing details with the most “normal-sounding” story.
                    </p>
                    <p>
                        Your mission: spot the ambiguity, then tighten the prompt so the model’s probabilities align with what you actually mean.
                    </p>
                </>
            ),
            component: <AmbiguityScenario onComplete={() => setCanProceed(true)} />,
            nextLabel: "How do we mitigate it?",
        },

        {
            title: "3 Guardrails to Reduce Confident Guessing",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/strategy_summary.png"
                        alt="Strategy summary"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 12px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p style={{ marginBottom: 10, textAlign: "left" }}>
                        Since the model predicts what comes next, mitigation is about giving it better context so the “most likely next words” are closer to what you want.
                    </p>
                    <ul style={{ textAlign: "left", paddingLeft: 18, display: "flex", flexDirection: "column", gap: 10 }}>
                        <li>
                            <strong>RAG:</strong> add relevant reference material so grounded words become more likely than generic storytelling.
                        </li>
                        <li>
                            <strong>One-shot / Few-shot:</strong> show examples so the structure and tone you want become more likely.
                        </li>
                        <li>
                            <strong>Human check:</strong> verify key claims so fluent errors don’t become real decisions.
                        </li>
                    </ul>
                </div>
            ),
            component: null,
            nextLabel: "Start with RAG",
        },

        {
            title: "RAG: “Bring the Docs into the Room”",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/rag_before_after.png"
                        alt="RAG before/after"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        <strong>RAG</strong> (Retrieval-Augmented Generation) means: before the model predicts the next word, you first pull in relevant snippets
                        (notes, policies, reports, FAQs).
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        It’s still next-word prediction—just with better material to predict from.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "See the probability shift",
        },

        {
            title: "RAG Visual: Context Shifts the Next Words",
            text: (
                <>
                    <p>
                        Watch the next-word probabilities change when you add the right snippets. “Evidence-aligned words” become more likely than “generic narratives.”
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        That’s RAG in one sentence: <strong>you shift the distribution by changing the context.</strong>
                    </p>
                </>
            ),
            // DYNAMIC SCENARIO
            component: <RAGProbabilityShift onComplete={() => setCanProceed(true)} scenario={ragScenarios[userGoal]} />,
            nextLabel: "Try it yourself",
        },

        {
            title: "Interactive: RAG Builder (Pick the Best Snippets)",
            text: (
                <>
                    <p>
                        Quick practice: choose which snippets to attach so the model is less likely to “fill the gap” with confident guessing.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        Your goal isn’t perfection. It’s making grounded continuations more likely than vibes.
                    </p>
                </>
            ),
            component: <RAGSnippetPicker onComplete={() => setCanProceed(true)} />,
            nextLabel: "Next: examples (few-shot)",
        },

        {
            title: "One-shot / Few-shot: “Show an Example Like This”",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/fewshot_before_after.png"
                        alt="Few-shot before/after"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        One-shot / few-shot means giving one or a few examples of what you want—especially when your request is underspecified.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        You’re not adding new facts. You’re teaching the model what pattern to continue.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "See it steer output",
        },

        {
            title: "Interactive: Few-shot Steering",
            text: (
                <>
                    <p>
                        Try toggling examples. Notice how the output becomes more consistent—not because the model “understands,”
                        but because the next words are now guided by a template-like pattern.
                    </p>
                </>
            ),
            // DYNAMIC SCENARIO
            component: <FewShotSteerer onComplete={() => setCanProceed(true)} scenario={steererScenarios[userGoal]} />,
            nextLabel: "Do a quick challenge",
        },

        {
            title: "Interactive: Pattern Design Challenge",
            text: (
                <>
                    <p>
                        <strong>Challenge:</strong> You need to ensure the AI follows the right format across diverse inputs.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        How do you prompt the model so it works reliably?
                    </p>
                </>
            ),
            // DYNAMIC SCENARIO
            component: <FewShotPromptFixer onComplete={() => setCanProceed(true)} scenario={fixerScenarios[userGoal]} />,
            nextLabel: "Last: verify accuracy",
        },

        {
            title: "Human Check: Catch Mistakes Before They Spread",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/hitl_loop.png"
                        alt="Human check loop"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p>
                        Even with RAG and examples, the model can still produce a confident mistake—because it’s still predicting words.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        A human check is the final guardrail: verify key claims before they become a “fact” everyone repeats.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Practice verifying claims",
        },



        {
            title: "Scenario Practice: Pick the Right Guardrails",
            text: (
                <p>
                    You have a high-stakes task. Which guardrails do you apply to ensure safety and quality?
                </p>
            ),
            // DYNAMIC SCENARIO
            component: (
                <StrategySimulation
                    scenario={{
                        ...simulationScenarios[userGoal] || simulationScenarios.default,
                        strategies: [
                            {
                                id: "fewshot",
                                name: "Few-shot Only",
                                icon: <ClipboardList size={24} />,
                                result: "Helps structure and tone, but doesn’t add evidence. The model can still fill gaps with plausible claims.",
                                isRecommended: false,
                            },
                            {
                                id: "rag",
                                name: "RAG Only",
                                icon: <FolderSearch size={24} />,
                                result: "Adds evidence, but output may still be inconsistent in structure. Great for grounding; weaker for predictable formatting.",
                                isRecommended: false,
                            },
                            {
                                id: "rag_fewshot",
                                name: "RAG + Few-shot",
                                icon: <Layers size={24} />,
                                result: "Best default. Evidence becomes more likely (RAG), and structure becomes more likely (Few-shot).",
                                isRecommended: true,
                            },
                            {
                                id: "all",
                                name: "RAG + Few-shot + Check",
                                icon: <ShieldCheck size={24} />,
                                result: "Safest for high visibility. Adds evidence + structure, then catches remaining confident errors.",
                                isRecommended: true,
                            },
                        ],
                    }}
                    onComplete={() => setCanProceed(true)}
                />
            ),
            nextLabel: "Finish",
        },

        {
            title: "Takeaway: One Mechanism, Three Guardrails",
            text: (
                <div style={{ textAlign: "center" }}>
                    <img
                        src="/src/assets/cheat_sheet_v2.png"
                        alt="Cheat sheet"
                        style={{
                            width: "75%",
                            height: "auto",
                            display: "block",
                            margin: "0 auto 16px auto",
                            borderRadius: "12px",
                        }}
                    />
                    <p style={{ marginBottom: 8 }}>
                        Everything today comes from one idea: the model predicts the next word.
                    </p>
                    <p style={{ marginBottom: 8 }}>
                        So the best mitigations don’t “fight the model.” They <strong>shape its context</strong> so the most likely next words are closer to what you want.
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        Bonus life lesson: be careful around anything that’s confident and well-written. (Including this page. 😄)
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Done ✅",
        },
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

    if (currentPage === -1) {
        return <GoalSetter onGoalSet={handleGoalSet} />;
    }

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
