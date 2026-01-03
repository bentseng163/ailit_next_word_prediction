# Lesson 1 Code
```jsx
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
```

# Lesson 2 Code
```jsx
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// Interactives
import NoiseToImageScrubber from '../components/Interactives/NoiseToImageScrubber';
import PromptClarityMeter from '../components/Interactives/PromptClarityMeter';
import PromptSurgery from '../components/Interactives/PromptSurgery';
import VariationKnob from '../components/Interactives/VariationKnob';
import PipelineBuilder from '../components/Interactives/PipelineBuilder';
import PromptDebugger from '../components/Interactives/PromptDebugger';
import PromptTemplateMaker from '../components/Interactives/PromptTemplateMaker';
import GoalSetter from '../components/GoalSetter/GoalSetter';

// Assets (Nano Banana Generations)
import imgRemote from '../assets/imggen-01-remote.png';
import imgTags from '../assets/imggen-02-tags.png';

const Lesson2 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(-1); // Start at -1 for GoalSetter
    const [canProceed, setCanProceed] = useState(true);
    const [userGoal, setUserGoal] = useState('default'); // 'default', 'productivity', 'shipping'

    // --- Dynamic Scenarios ---

    // Page 6: Debugger Scenarios
    const debugScenarios = {
        default: undefined,
        productivity: [
            {
                id: 1,
                context: "Scenario: Batch generating 100 blog headers.",
                prompt: "Professional office header.",
                resultDesc: "Result: 40% of images are cartoons. 60% are photos.",
                options: [
                    { id: 'ambiguity', label: "Ambiguity", correct: true, reason: "Correct! You didn't specify 'Photo Realism'. The model filled the gap with random styles." },
                    { id: 'bad', label: "Bad Model", correct: false, reason: "The model isn't bad, it's just guessing unrelated styles because you didn't constrain it." }
                ]
            },
            {
                id: 2,
                context: "Scenario: Need a team photo in Company Blue.",
                prompt: "Team in blue shirts.",
                resultDesc: "Result: Shirts are Navy, Cyan, Teal, and Sky Blue.",
                options: [
                    { id: 'ref', label: "Missing Reference", correct: true, reason: "Correct! 'Blue' is a spectrum. To get 'Company Blue', you need a Hex Token or Image Reference." },
                    { id: 'glitch', label: "Color Glitch", correct: false, reason: "Not a glitch. Without a specific reference, the model samples from 'all possible blues'." }
                ]
            },
            {
                id: 3,
                context: "Scenario: Need 10 people in a row.",
                prompt: "10 people standing in a straight line.",
                resultDesc: "Result: A crowd of 15 overlapping people.",
                options: [
                    { id: 'limit', label: "Counting Limitation", correct: true, reason: "Correct! Models are bad at counting past 3-4 objects. Don't rely on it for exact numbers." },
                    { id: 'vague', label: "Vague Prompt", correct: false, reason: "Your prompt was specific ('10'), but the model's architecture struggles with numeracy." }
                ]
            }
        ],
        shipping: [
            {
                id: 1,
                context: "Scenario: Generating a user avatar for the app.",
                prompt: "Friendly user profile picture.",
                resultDesc: "Result: A photo of a person with 7 fingers and a distorted eye.",
                options: [
                    { id: 'limit', label: "Anatomy Limitation", correct: true, reason: "Correct! Hands and eyes are common failure points. You need a negative prompt or post-processing restoration." },
                    { id: 'vague', label: "Vague Prompt", correct: false, reason: "Even with a detailed prompt, structural anatomy can fail. It's a known model quirk." }
                ]
            },
            {
                id: 2,
                context: "Scenario: Login screen background.",
                prompt: "Clean gradient with a Login button.",
                resultDesc: "Result: A button that says 'LGIN' or 'LOGGN'.",
                options: [
                    { id: 'text', label: "Text Limitation", correct: true, reason: "Correct! Never trust image models to spell key UI text. Generate it blank and overlay real text in code." },
                    { id: 'ref', label: "Missing Reference", correct: false, reason: "A reference might help style, but the spelling issue is a fundamental tokenizer limitation." }
                ]
            },
            {
                id: 3,
                context: "Scenario: Feature announcement card.",
                prompt: "Exciting new feature launch!",
                resultDesc: "Result: Chaos. Confetti, random robots, and lasers everywhere.",
                options: [
                    { id: 'ambiguity', label: "Ambiguity", correct: true, reason: "Correct! 'Exciting' is subjective. You need to constrain the subject: 'Minimalist 3D icon of a rocket'." },
                    { id: 'bad', label: "Bad Luck", correct: false, reason: "Not luck. You gave a 'Concept' prompt instead of a 'Visual' prompt." }
                ]
            }
        ]
    };

    // Page 8: Template Scenarios
    const templateConfigs = {
        default: undefined,
        productivity: {
            goal: "Scale Asset Production (100x)",
            staticPrefix: "generating a social asset:",
            chunks: [
                { id: 0, text: "Minimalist layout of", type: "composition", isVar: false, lockedLabel: "Minimal Layout", varLabel: "[Layout]" },
                { id: 1, text: "a productivity dashboard", type: "subject", isVar: false, lockedLabel: "Dashboard", varLabel: "[Product]" },
                { id: 2, text: "on a clean white desk", type: "background", isVar: false, lockedLabel: "White Desk", varLabel: "[Background]" },
                { id: 3, text: "high key lighting", type: "style", isVar: false, lockedLabel: "High Key", varLabel: "[Lighting]" },
            ]
        },
        shipping: {
            goal: "Consistent User Avatars",
            staticPrefix: "creating a user avatar:",
            chunks: [
                { id: 0, text: "Close up portrait of", type: "composition", isVar: false, lockedLabel: "Portrait", varLabel: "[Angle]" },
                { id: 1, text: "a friendly designer", type: "subject", isVar: true, lockedLabel: "Designer", varLabel: "[Persona]" },
                { id: 2, text: "solid brand-blue background", type: "background", isVar: false, lockedLabel: "Blue Bg", varLabel: "[Background]" },
                { id: 3, text: "flat vector art style", type: "style", isVar: false, lockedLabel: "Vector Style", varLabel: "[Style]" },
            ]
        }
    };

    // Page 11 & 12 Scenarios Labels
    const scenarioContent = {
        default: {
            p11_title: "Boss Level: The High-Stakes Launch",
            p11_desc: "Constraints: Brand must be identical to website. No hallucinated products. Zero risk.",
            p12_title: "Bonus Level: The Ideation Jam",
            p12_desc: "Constraints: Speed matters. Coherence doesn't. We want accidents."
        },
        productivity: {
            p11_title: "The Deadline Crunch",
            p11_desc: "Constraints: You need 50 assets by 5 PM. Pipeline must require ZERO manual editing.",
            p12_title: "Rapid Prototyping",
            p12_desc: "Constraints: Generate 20 different UI layouts in 2 minutes to unblock the design team."
        },
        shipping: {
            p11_title: "The Production Release",
            p11_desc: "Constraints: This image will be seen by 1M users. No 7-fingered hands allowed.",
            p12_title: "Feature Exploration",
            p12_desc: "Constraints: Explore wildly different visual directions for a new feature icon."
        }
    };

    const handleGoalSet = (goalType) => {
        setUserGoal(goalType);
        setCurrentPage(0);
    };

    const currentScenarioData = scenarioContent[userGoal] || scenarioContent.default;

    const pages = [
        // ## 1) Theory Anchor (5 pages)
        // ... (Pages 1-6 unchanged) ...


        // ### Page 1 — The Magic Trick (Spoiler: It’s Not Magic)
        {
            title: "The Magic Trick (Spoiler: It’s Not Magic)",
            text: (
                <div>
                    <p>AI image generation feels like: <em>“I typed words… and got a picture.”</em></p>
                    <p>What’s really happening is closer to:<br />
                        <strong>“The model learned patterns from tons of images + captions, and it tries to produce an image that matches the patterns your words point to.”</strong></p>
                    <p>Think of your prompt as a <strong>pattern remote control</strong>:</p>
                    <ul>
                        <li>“product hero shot” → centered object, clean background</li>
                        <li>“soft studio lighting” → gentle shadows, smooth highlights</li>
                        <li>“minimal premium” → fewer props, cleaner composition</li>
                    </ul>

                    <div style={{ margin: '20px 0', borderRadius: 8, overflow: 'hidden', border: '2px solid #000' }}>
                        <img src={imgRemote} alt="Prompt Pattern Remote" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "How it reads",
        },

        // ### Page 2 — Step 1: The Model Hunts for Patterns in Your Prompt
        {
            title: "Step 1: The Model Hunts for Patterns",
            text: (
                <div>
                    <p>When you type:</p>
                    <blockquote style={{ background: 'rgba(255,255,255,0.1)', padding: 12, borderLeft: '4px solid #3b82f6', borderRadius: 4 }}>
                        “A premium smart thermostat hero image, soft studio lighting, minimal background”
                    </blockquote>
                    <p>The model doesn’t read it like a human brief. It “tags” it into patterns it has seen before:</p>
                    <ul>
                        <li><strong>thermostat</strong> (object category)</li>
                        <li><strong>hero image</strong> (composition template)</li>
                        <li><strong>premium, minimal</strong> (style cluster)</li>
                        <li><strong>soft studio lighting</strong> (lighting pattern)</li>
                    </ul>

                    <div style={{ margin: '20px 0', borderRadius: 8, overflow: 'hidden', border: '2px solid #000' }}>
                        <img src={imgTags} alt="Prompt to Pattern Tags" style={{ width: '100%', display: 'block' }} />
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Where it starts",
        },

        // ### Page 3 — Step 2: It Starts From Noise (Yes, TV Static)
        {
            title: "Step 2: It Starts From Noise",
            text: (
                <div>
                    <p>Now the weird part: The model usually starts from <strong>random noise</strong> (TV static).</p>
                    <p>Why? Because noise is a flexible “raw material.” It lets the model gradually shape <em>any</em> image.</p>
                    <p>Think sculpting:</p>
                    <ul>
                        <li>You don’t start with a statue.</li>
                        <li>You start with a block, then remove randomness until a form appears.</li>
                    </ul>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 3): noise-to-image-scrubber
            Goal: Make learners *feel* iterative refinement.
            */
            component: <NoiseToImageScrubber onComplete={() => setCanProceed(true)} />,
            nextLabel: "The refinement loop",
        },

        // ### Page 4 — Step 3: Iterative Refinement
        {
            title: "Step 3: Iterative Refinement",
            text: (
                <div>
                    <p>Image generation is basically this loop:</p>
                    <ol>
                        <li>Look at current noisy image</li>
                        <li>Ask: “What tiny changes make this look <em>more like the prompt’s patterns</em>?”</li>
                        <li>Apply tiny changes</li>
                        <li>Repeat… again… and again… (50+ times)</li>
                    </ol>
                    <p>It’s not painting one perfect stroke. It’s more like <strong>cleaning a window</strong> until the scene becomes visible.</p>

                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-04-loop.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Refinement Loop]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Check → Adjust → Repeat</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Plausible vs. Correct",
        },

        // ### Page 5 — “Guessing Pixel by Pixel”
        {
            title: "“Guessing Pixel by Pixel”",
            text: (
                <div>
                    <p>People say “it guesses pixel by pixel.” The useful meaning is:</p>
                    <ul>
                        <li>It doesn’t verify reality.</li>
                        <li>It nudges <strong>every region</strong> toward what’s <em>statistically likely</em> for your prompt.</li>
                    </ul>
                    <p>So it’s amazing at: ✅ vibe, lighting, composition</p>
                    <p>…but weaker at: ⚠️ logos, text, counting, exact details</p>
                    <p>Because “looks plausible” ≠ “is correct.”</p>

                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-05-plausible-correct.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Plausible vs Correct]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Plausible (Vibe) ≠ Correct (Facts)</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Why this matters",
        },

        // ## 2) Relevance Bridge (1–2 pages)

        // ### Page 6 — Why This Matters
        {
            title: "Why This Matters: Fewer Re-Rolls",
            text: (
                <div>
                    <p>Now you know that the model is “iteratively denoising toward what’s likely,” you can give <strong>constraints that shrink ambiguity</strong>, for example:</p>
                    <ul>
                        <li>composition</li>
                        <li>lighting</li>
                        <li>palette</li>
                        <li>do/don’t constraints</li>
                    </ul>
                    <p>This will help you get your desired output with fewer regenerations.</p>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 6): prompt-clarity-meter
            Goal: Make constraints = fewer re-rolls insight visceral.
            */
            component: <PromptClarityMeter onComplete={() => setCanProceed(true)} />,
            nextLabel: "Debugging outputs",
        },

        // ### Page 7 — Diagnosing Glitches
        {
            title: "Diagnosing Glitches",
            text: (
                <div>
                    <p>When an image comes out wrong, it’s usually not random. It's a specific type of failure.</p>
                    <p>To fix it, you need to identify the <strong>root cause</strong>:</p>
                    <ul>
                        <li>Is it <strong>Ambiguity</strong>? (You left it open to interpretation)</li>
                        <li>Is it a <strong>Missing Reference</strong>? (The model had to guess)</li>
                        <li>Is it a <strong>Limitation</strong>? (Models just struggle with this)</li>
                    </ul>
                    <p>Can you identify the error in these 3 examples?</p>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 7): prompt-debugger
            */
            component: <PromptDebugger onComplete={() => setCanProceed(true)} customScenarios={debugScenarios[userGoal]} />,
            nextLabel: "Insight 1: Templates",
        },

        // ## 3) Practical Insights (3 pages)

        // ### Page 8 — Scalable Templates
        {
            title: "Scalable Templates",
            text: (
                <div>
                    <p>Sometimes you aren’t aiming for a single perfect image, but a <strong>consistent pipeline</strong>.</p>
                    <p>To generate a 100-item catalog that looks like one cohesive photoshoot, you build a <strong>Template</strong>:</p>
                    <ul>
                        <li><strong>Lock elements</strong> you want to keep consistent (Style, Lighting).</li>
                        <li><strong>Vary elements</strong> you want to change (Product, Subject).</li>
                    </ul>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 8): prompt-template-maker
            */
            component: <PromptTemplateMaker onComplete={() => setCanProceed(true)} config={templateConfigs[userGoal]} />,
            nextLabel: "Identity",
        },

        // ### Page 9 — Anchoring Identity
        {
            title: "Anchoring Identity",
            text: (
                <div>
                    <p>Templates handle style validation, but what about specific products?</p>
                    <p>If you need <em>the</em> exact sneaker or <em>the</em> official logo, text alone is a weak leash. You need to <strong>anchor</strong> the model:</p>
                    <ul>
                        <li>Use an <strong>image reference</strong>.</li>
                        <li>Upload a <strong>style frame</strong>.</li>
                        <li>Define <strong>brand color tokens</strong>.</li>
                    </ul>
                    <p>This prevents the model from "hallucinating" your product's details.</p>
                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-09-reference-lock.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Reference Lock]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Text Only (Drift) vs. Ref Locked (Stable)</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Variation",
        },

        // ### Page 10 — Controlling Variation
        {
            title: "Controlling Variation",
            text: (
                <div>
                    <p>You will often see a setting called <strong>Variation</strong> (or "Chaos").</p>
                    <p>It controls how far the model can stray from your prompt's patterns:</p>
                    <ul>
                        <li><strong>Low Variation:</strong> Safe, predictable, adheres strictly to the prompt. Great for brand assets.</li>
                        <li><strong>High Variation:</strong> Wild, unexpected, exploring new angles. Great for ideation.</li>
                    </ul>
                </div>
            ),
            /*
            INTERACTIVE SPEC (Page 10): variation-knob
            Goal: Variation changes sampling, not truthfulness.
            */
            component: <VariationKnob onComplete={() => setCanProceed(true)} />,
            nextLabel: "Practice Scenario",
        },

        // ## 4) Scenario-based Personalized Practice & Recap

        // ### Page 11 — Scenario A
        {
            title: currentScenarioData.p11_title,
            text: (
                <div>
                    <p>Now that you've mastered the components of a prompt, let's put it to the test.</p>
                    <p>{currentScenarioData.p11_desc}</p>
                    <p><strong>Mission:</strong> Configure the pipeline below to minimize risk and errors.</p>
                </div>
            ),
            component: <PipelineBuilder scenarioType="safety" onComplete={() => setCanProceed(true)} />,
            nextLabel: "Next Scenario",
        },

        // ### Page 12 — Scenario B
        {
            title: currentScenarioData.p12_title,
            text: (
                <div>
                    <p>Great work on safety. Now let's switch gears to pure creativity.</p>
                    <p>{currentScenarioData.p12_desc}</p>
                    <p><strong>Mission:</strong> Configure the pipeline to maximize variety and new ideas.</p>
                </div>
            ),
            component: <PipelineBuilder scenarioType="creative" onComplete={() => setCanProceed(true)} />,
            nextLabel: "Recap",
        },

        // ### Page 12 — Recap: The Credibility Upgrade
        {
            title: "Recap: The Credibility Upgrade",
            text: (
                <div>
                    <p><strong>You now know the whole process:</strong></p>
                    <ol>
                        <li>Prompt activates learned patterns</li>
                        <li>Start from noise</li>
                        <li>Repeatedly refine until it matches patterns</li>
                    </ol>
                    <p><strong>And you can lead the workflow:</strong></p>
                    <ul>
                        <li>shrink ambiguity (split content/style)</li>
                        <li>anchor identity (references)</li>
                        <li>control variation (explore vs ship)</li>
                        <li>review smartly</li>
                    </ul>

                    <div style={{ margin: '20px 0', border: '2px solid #000', borderRadius: 8, overflow: 'hidden' }}>
                        {/* Placeholder for assets/imggen-12-cheatsheet.svg */}
                        <div style={{ background: '#F5F1E6', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexDirection: 'column' }}>
                            <strong>[Image: Cheat Sheet]</strong>
                            <span style={{ fontSize: '0.8rem' }}>Process + Guardrails Summary</span>
                        </div>
                    </div>
                </div>
            ),
            component: null,
            nextLabel: "Finish Lesson",
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
                <div>
                    {currentContent.text}
                </div>

                {currentContent.component && (
                    <div style={{ marginTop: 24 }}>
                        {currentContent.component}
                    </div>
                )}
            </InteractiveCard>
        </Layout>
    );
};

export default Lesson2;
```

# Lesson 3 Code
```jsx
import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import InteractiveCard from '../components/InteractiveCard/InteractiveCard';

// New Interactives
import LatentPainterDemo from '../components/Interactives/LatentPainterDemo';
import TransformerConnect from '../components/Interactives/TransformerConnect';
import AudioSyncToggle from '../components/Interactives/AudioSyncToggle';
import PhysicsTraining from '../components/Interactives/PhysicsTraining';

// Reused Inteactives
import KeyframeAnchorDemo from '../components/Interactives/KeyframeAnchorDemo';
import ReferencePackPicker from '../components/Interactives/ReferencePackPicker';
import StrategySimulation from '../components/Interactives/StrategySimulation';
import SwiftMerchActivity from '../components/Interactives/SwiftMerchActivity';
import GoalSetter from '../components/GoalSetter/GoalSetter';

// Icons
import { Film, Palette, Scissors, Music, Brain, Shield, Shirt, User, FileText, Star } from 'lucide-react';

// Conceptual Images
import videoMagicImg from '../assets/lesson3/video_magic_formula.png';
import studioTeamImg from '../assets/lesson3/motion_studio_team.png';
import correlationImg from '../assets/lesson3/correlation_vs_causation.png';
import pixelParrotImg from '../assets/lesson3/pixel_parrot.png';
import recapImg from '../assets/lesson3/director_chair_recap.png';

const Lesson3 = ({ onExit }) => {
    const [currentPage, setCurrentPage] = useState(-1);
    const [canProceed, setCanProceed] = useState(true);
    const [userGoal, setUserGoal] = useState('default');

    const scenarioContent = {
        default: {
            title: "Activity: SwiftMerch Campaign",
            text: (
                <p>
                    Our firm, <strong>SwiftMerch</strong>, wants to let fans generate a video of themselves hanging out with Taylor Swift while wearing the new tour T-shirt.
                    <br /><br />
                    Select the Reference Assets needed to balance accuracy and personalization:
                </p>
            ),
            nextLabel: "Review Logic",
            activityProps: {
                title: "The Taylor Swift Experience",
                goalText: "Goal: Personalized video of Customer + Taylor + Product.",
                options: [
                    { id: 'product', label: 'Product Shot', type: 'object', required: true },
                    { id: 'celebrity', label: 'Celebrity Ref', type: 'subject', required: true },
                    { id: 'selfie', label: 'User Selfie', type: 'user', required: true },
                    { id: 'logo', label: 'Brand Logo', type: 'branding', required: false, error: "Branding is important, but for the VIDEO generation itself, we need to focus on the visual subjects first." },
                    { id: 'style', label: 'Cinematic Style', type: 'style', required: false, error: "Style is optional. To get the specific LOOK right, we first need the specific OBJECTS and PEOPLE." },
                    { id: 'script', label: 'Detailed Script', type: 'text', required: false, error: "A script describes action, but reference images are 'Must Haves' to define the identity of the characters." },
                ],
                successMsg: "Correct! These are the 3 'Must Have' assets to ground the model for a highly personalized result.",
                failMsg: "To personalize the video, we need to know exactly WHO (User), WHAT (Product), and WHO WITH (Celebrity)."
            }
        },
        productivity: {
            title: "Activity: E-Commerce Automator",
            text: (
                <p>
                    You need to generate 10,000 unique product videos for the new catalog. Consistency is impossible if you prompt every video manually.
                    <br /><br />
                    Select the Reference Assets to lock in the <strong>Brand Identity</strong> across all videos:
                </p>
            ),
            nextLabel: "Review Pipeline",
            activityProps: {
                title: "The 10,000 Video Pipeline",
                goalText: "Goal: Automate product videos that all look like the same brand.",
                options: [
                    { id: 'catalog', label: 'Product Catalog', type: 'object', required: true },
                    { id: 'brandguide', label: 'Brand Style Guide', type: 'style', required: true },
                    { id: 'template', label: 'Motion Template', type: 'structure', required: true },
                    { id: 'meme', label: 'Viral Meme', type: 'concept', required: false, error: "Memes are unpredictable. For a catalog, we need strict brand adherence, not random humor." },
                    { id: 'competitor', label: 'Competitor Ad', type: 'ref', required: false, error: "Using a competitor's ad might copy their style too closely. Use our own Style Guide." },
                    { id: 'copy', label: 'Marketing Copy', type: 'text', required: false, error: "Text copy is for the voiceover or captions, not the visual generation references." },
                ],
                successMsg: "Perfect! Product (Subject), Style Guide (Look), and Template (Structure) ensure consistency at scale.",
                failMsg: "To automate 10k videos, you need to lock the Product, the Look, and the Structure."
            }
        },
        shipping: {
            title: "Activity: SwiftMerch Campaign",
            text: (
                <p>
                    Our firm, <strong>SwiftMerch</strong>, wants to let fans generate a video of themselves hanging out with Taylor Swift while wearing the new tour T-shirt.
                    <br /><br />
                    Select the Reference Assets needed to balance accuracy and personalization:
                </p>
            ),
            nextLabel: "Review Logic",
            activityProps: {
                title: "The Taylor Swift Experience",
                goalText: "Goal: Personalized video of Customer + Taylor + Product.",
                options: [
                    { id: 'product', label: 'Product Shot', type: 'object', required: true },
                    { id: 'celebrity', label: 'Celebrity Ref', type: 'subject', required: true },
                    { id: 'selfie', label: 'User Selfie', type: 'user', required: true },
                    { id: 'logo', label: 'Brand Logo', type: 'branding', required: false, error: "Branding is important, but for the VIDEO generation itself, we need to focus on the visual subjects first." },
                    { id: 'style', label: 'Cinematic Style', type: 'style', required: false, error: "Style is optional. To get the specific LOOK right, we first need the specific OBJECTS and PEOPLE." },
                    { id: 'script', label: 'Detailed Script', type: 'text', required: false, error: "A script describes action, but reference images are 'Must Haves' to define the identity of the characters." },
                ],
                successMsg: "Correct! These are the 3 'Must Have' assets to ground the model for a highly personalized result.",
                failMsg: "To personalize the video, we need to know exactly WHO (User), WHAT (Product), and WHO WITH (Celebrity)."
            }
        }
    };

    const handleGoalSet = (goalType) => {
        setUserGoal(goalType);
        setCurrentPage(0);
    };

    const currentScenario = scenarioContent[userGoal] || scenarioContent.default;

    const pages = [
        {
            title: "Video Generation: The Magic Show",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p>
                        Video generation feels like magic, but it actually builds on top of concepts you already learned:
                    </p>
                    {/* Visual: Image Gen + Next Token = Video */}
                    <img
                        src={videoMagicImg}
                        alt="Equation: Image Gen + Next Token = Video"
                        style={{ width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e2e8f0' }}
                    />
                    <p>
                        Ever feel Video generation AI models feels like magic? It actually builds on top of concepts you already learned so far: image generation, next-word prediction and more! Let’s find out how that magic works.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "The Studio Analogy",
        },
        {
            title: "The Motion Production Studio",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p>
                        Think of a video model as a tiny digital studio inside your GPU, with three key employees:
                    </p>
                    {/* Visual: The 3 Employees */}
                    <img
                        src={studioTeamImg}
                        alt="The Painter, Editor, and Composer"
                        style={{ width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e2e8f0' }}
                    />
                    <ul style={{ textAlign: 'left', paddingLeft: '20px', color: '#ffffff', lineHeight: '1.6' }}>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>The Painter</strong> (Diffusion): Generates the raw visual frames from scratch.
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>The Editor</strong> (Transformers): Stitches frames together so they flow logically.
                        </li>
                        <li>
                            <strong>The Composer</strong> (Audio Gen): Syncs the sound effects beat-for-beat.
                        </li>
                    </ul>
                </div>
            ),
            component: null,
            nextLabel: "Meet The Painter",
        },
        {
            title: "The Painter (Latent Diffusion)",
            text: (
                <p>
                    Just like in Image Generation, the Painter starts with pure static (noise) and hallucinates structure until a clear image emerges.
                </p>
            ),
            component: <LatentPainterDemo onComplete={() => setCanProceed(true)} />,
            nextLabel: "Meet The Editor",
        },
        {
            title: "The Editor (Temporal Consistency)",
            text: (
                <>
                    <p>
                        <strong>Transformers</strong>, the mechanism that powers next-word prediction is great at processing sequences of data.
                    </p>
                    <p>
                        In video, instead of words, they connect <strong>frames and time</strong>. Just like an Editor, they ensure the movie flows logically so objects don't teleport or vanish.
                    </p>
                </>
            ),
            component: <TransformerConnect onComplete={() => setCanProceed(true)} />,
            nextLabel: "Meet The Composer",
        },
        {
            title: "The Composer (Audio Generation)",
            text: (
                <>
                    <p>
                        In newer models (like Veo), sound isn't added later.
                    </p>
                    <p>
                        The model generates the video and audio <strong>together</strong>, ensuring the *thud* happens exactly when the ball hits.
                    </p>
                </>
            ),
            component: <AudioSyncToggle onComplete={() => setCanProceed(true)} />,
            nextLabel: "But do they know physics?",
        },
        {
            title: "Question: Understanding Physics",
            text: (
                <p>
                    These models make things bounce and fall. But do they honestly know why it falls?
                </p>
            ),
            component: <PhysicsTraining onComplete={() => setCanProceed(true)} />,
            nextLabel: "Reveal the truth",
        },
        {
            title: "The Answer: Statistical Correlation",
            text: (
                <div style={{ textAlign: "center" }}>

                    {/* Visual: Correlation vs Causation */}
                    <img
                        src={correlationImg}
                        alt="Correlation vs Causation"
                        style={{ width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e2e8f0' }}
                    />
                    <p>
                        If the model sees a glass shatter 10,000 times, it learns "Impact + Glass = Shards."
                    </p>
                    <p style={{ opacity: 0.9 }}>
                        It doesn't know <em>why</em>. It just knows the pattern based on it's training data.
                    </p>
                </div>
            ),
            component: null, // Results shown in previous step effectively, but this reinforces
            nextLabel: "Why it fails",
        },
        {
            title: "The Result: Pixel Parrots",
            text: (
                <div style={{ textAlign: "center" }}>
                    {/* Visual: Pixel Parrot */}
                    <img
                        src={pixelParrotImg}
                        alt="Pixel Parrot Glitch"
                        style={{ width: '100%', borderRadius: '8px', margin: '16px 0', border: '1px solid #e2e8f0' }}
                    />
                    <p>
                        Despite their beauty, these models are "Pixel Parrots."
                    </p>
                    <p>
                        They repeat patterns of motion without understanding the causality. That's why hands morph and objects float.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "How to fix it",
        },
        {
            title: "Guardrail 1: Keyframes",
            text: (
                <p>
                    Since the model is just guessing the path, you can guide it by pinning the destination.
                    <br />
                    <strong>Provide Keyframes to lock the start and end.</strong>
                </p>
            ),
            component: <KeyframeAnchorDemo onComplete={() => setCanProceed(true)} />,
            nextLabel: "Guardrail 2: References",
        },
        {
            title: "Guardrail 2: Reference Assets",
            text: (
                <p>
                    To stop the "Painter" from improvising your logo, give it a ground truth.
                    <br />
                    <strong>Upload reference assets as constraints.</strong>
                </p>
            ),
            component: <ReferencePackPicker onComplete={() => setCanProceed(true)} />,
            nextLabel: "The Taylor Swift Experience",
        },
        {
            title: currentScenario.title,
            text: currentScenario.text,
            component: <SwiftMerchActivity
                onComplete={() => setCanProceed(true)}
                scenario={currentScenario.activityProps}
            />,
            nextLabel: currentScenario.nextLabel,
        },

        {
            title: "Recap: The Motion Studio",
            text: (
                <div style={{ textAlign: "center" }}>
                    <p style={{ marginBottom: 16 }}>
                        Video generation is a collaboration between:
                    </p>
                    {/* Visual: Director Chair Structure */}
                    <img
                        src={recapImg}
                        alt="You are the Director"
                        style={{ width: '100%', borderRadius: '8px', margin: '0 0 24px 0', border: '1px solid #e2e8f0' }}
                    />
                    <ul style={{ textAlign: 'left', paddingLeft: '20px', color: '#4b5563', marginBottom: 24 }}>
                        <li style={{ marginBottom: 8 }}><strong>The Painter:</strong> Creates the pixels (Diffusion)</li>
                        <li style={{ marginBottom: 8 }}><strong>The Editor:</strong> Connects time (Transformers)</li>
                        <li style={{ marginBottom: 8 }}><strong>The Composer:</strong> Syncs audio (Lockstep generation)</li>
                    </ul>
                    <p>
                        And you are the <strong>Director</strong>. Use Keyframes and References to keep them all in sync.
                    </p>
                </div>
            ),
            component: null,
            nextLabel: "Finish Lesson",
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

export default Lesson3;
```
