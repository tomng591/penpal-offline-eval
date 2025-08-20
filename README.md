# Penpal Voice AI Companion - Offline Evaluation

A comprehensive system for generating, testing, and evaluating voice-optimized AI companion prompts using promptfoo and research-based rubrics.

## Overview

This repository provides an end-to-end evaluation pipeline for voice AI companions targeting emotional intelligence, healthy boundaries, and engaging conversation. The system consists of three main components that work together seamlessly:

1. **🎯 Prompt Design** - Generate voice-optimized prompts based on layered architecture and strategic goals
2. **📊 Dataset Generation** - Create realistic test scenarios with variable combinations
3. **🔍 Evaluation System** - Assess prompts using research-based 6-metric rubrics

## Quick Start

### Setup
1. Set your OpenAI API key:
```bash
export OPENAI_API_KEY=your-key-here
# OR add to .env file (preferred)
echo "OPENAI_API_KEY=your-key-here" > .env
```

2. Run a complete evaluation:
```bash
# Generate a prompt
node prompt-design/generate-prompt.js warm-companion

# Generate test dataset
node datasets/generate-dataset.js basic-conversation

# Run evaluation
node evaluation/scripts/run-evaluation.js basic-evaluation
```

## System Architecture

### Repository Structure
```
penpal-offline-eval/
├── prompt-design/          # Prompt generation system
│   ├── strategies/          # JSON configs for different prompt strategies
│   ├── components/          # Reusable prompt building blocks
│   ├── generated/           # Generated prompts (strategy-v1.json format)
│   └── generate-prompt.js   # Main generation script
├── datasets/               # Dataset generation system
│   ├── scenarios/          # Test scenario templates
│   ├── generated/          # Generated datasets (scenario-v1.json format)
│   └── generate-dataset.js # Main generation script
├── evaluation/             # Evaluation system
│   ├── rubrics/           # LLM-as-judge rubric definitions
│   ├── configs/           # Promptfoo evaluation configurations
│   ├── scripts/           # Evaluation runner and analysis tools
│   └── results/           # Evaluation results (gitignored)
├── reference/             # Research documentation and principles
└── promptfooconfig.yaml   # Basic promptfoo configuration
```

## 🎯 Prompt Design System

### Generate New Prompts

```bash
# List available strategies
node prompt-design/generate-prompt.js --list

# Generate specific strategy
node prompt-design/generate-prompt.js warm-companion

# Generate all strategies
node prompt-design/generate-prompt.js --all
```

### Available Strategies
- **warm-companion**: High empathy and emotional support
- **mindful-guide**: Professional boundaries and transparency
- **engaging-friend**: High engagement and personalization
- **balanced-companion**: Balanced performance across all metrics

### How It Works
1. **Layered Architecture**: Combines 5 layers (Identity, Emotional, Conversation, Memory, Boundaries)
2. **Strategy-Based**: Different strategies optimize for different evaluation metrics
3. **Auto-Versioning**: Outputs `strategy-v1.json`, `strategy-v2.json`, etc.
4. **Voice-Optimized**: All prompts designed for 10-30 word spoken responses

### Example Usage
```bash
$ node prompt-design/generate-prompt.js warm-companion

✅ Generated prompt: warm-companion-v2.json
📍 Location: /prompt-design/generated/warm-companion-v2.json
🎯 Strategy: High empathy and emotional support focused strategy
📊 Expected overall score: 0.8
🔤 Word count: 233 words
```

## 📊 Dataset Generation System

### Generate New Datasets

```bash
# List available scenarios
node datasets/generate-dataset.js --list

# Generate specific scenario
node datasets/generate-dataset.js basic-conversation

# Generate all scenarios
node datasets/generate-dataset.js --all
```

### Available Scenarios
- **basic-conversation**: Greetings, casual chat, introductions
- **emotional-support**: Empathy, validation, emotional responses (coming soon)
- **small-talk**: Light conversation, personality, engagement (coming soon)
- **trust-building**: Boundaries, transparency, dependency prevention (coming soon)

### How It Works
1. **Scenario Templates**: Define conversation patterns and expected responses
2. **Variable Combinations**: Generate realistic user contexts and emotional states
3. **Promptfoo Compatible**: Outputs ready-to-use test cases with assertions
4. **Auto-Versioning**: Outputs `scenario-v1.json`, `scenario-v2.json`, etc.

### Example Usage
```bash
$ node datasets/generate-dataset.js basic-conversation

✅ Generated dataset: basic-conversation-v1.json
📊 Total tests: 20
🔗 Compatible prompts: warm-companion-v1, warm-companion-v2

Categories:
  • greeting: 5 tests
  • question: 5 tests
  • followup: 5 tests
  • casual_chat: 5 tests
```

## 🔍 Evaluation System

### Run Evaluations

```bash
# List available configurations
node evaluation/scripts/run-evaluation.js --list

# Run basic evaluation
node evaluation/scripts/run-evaluation.js basic-evaluation

# Run with options
node evaluation/scripts/run-evaluation.js basic-evaluation --verbose

# Direct promptfoo usage
npx promptfoo eval -c evaluation/configs/basic-evaluation.yaml
```

### 6-Metric Evaluation Framework

Based on research into human-AI attachment and emotional engagement:

| Metric | Weight | Target | Description |
|--------|--------|--------|-------------|
| **Emotional Intelligence** | 25% | 0.85+ | Empathy, validation, emotional awareness |
| **Conversational Quality** | 20% | 0.80+ | Natural flow, engagement, voice optimization |
| **Helpfulness** | 20% | 0.80+ | Addressing needs, emotional support |
| **Appropriateness** | 15% | 0.85+ | Context suitability, cultural sensitivity |
| **Personalization & Continuity** | 10% | 0.75+ | Context awareness, personality consistency |
| **Trust & Boundaries** | 10% | 0.75+ | Healthy limits, transparency, dependency prevention |

**Overall Target Score: 0.80+**

### How It Works
1. **LLM-as-Judge**: Uses GPT-4o for nuanced evaluation of each metric
2. **Research-Based Rubrics**: Scoring criteria based on human-AI companionship research
3. **Variable Integration**: Compatible with prompt and dataset variables
4. **Comprehensive Analysis**: Detailed scoring, pass rates, and quality ratings

### Example Usage
```bash
$ node evaluation/scripts/run-evaluation.js basic-evaluation

🚀 Running evaluation: basic-evaluation
📍 Configuration: evaluation/configs/basic-evaluation.yaml
💾 Output: evaluation/results/basic-evaluation-2025-08-20T10-30-00.json

⏳ Executing evaluation...
.................... 

📊 EVALUATION SUMMARY: BASIC-EVALUATION
==================================================
📈 Pass Rate: 85.0% (17/20)
🎯 Average Score: 0.782
✅ Passed: 17
❌ Failed: 3
📊 Score Range: 0.650 - 0.950
🏆 Quality Rating: ✨ GOOD

✅ Evaluation complete!
📊 Results saved to: evaluation/results/basic-evaluation-2025-08-20T10-30-00.json
```

## Integration Workflows

### End-to-End Evaluation
```bash
# 1. Generate new prompt variant
node prompt-design/generate-prompt.js balanced-companion

# 2. Generate test dataset
node datasets/generate-dataset.js basic-conversation

# 3. Run evaluation
node evaluation/scripts/run-evaluation.js basic-evaluation

# 4. View detailed results
npx promptfoo view
```

### Strategy Comparison
```bash
# Generate different strategies
node prompt-design/generate-prompt.js warm-companion
node prompt-design/generate-prompt.js mindful-guide

# Evaluate each with same dataset
# Edit evaluation/configs/basic-evaluation.yaml to change prompt file
npx promptfoo eval -c evaluation/configs/basic-evaluation.yaml
```

### Custom Evaluation
```bash
# Create custom promptfoo config
cat > custom-eval.yaml << EOF
description: 'Custom Evaluation'
prompts:
  - file://prompt-design/generated/warm-companion-v1.json
providers:
  - openai:gpt-4o-mini
tests:
  - file://datasets/generated/basic-conversation-v1.json
EOF

# Run custom evaluation
npx promptfoo eval -c custom-eval.yaml
```

## Configuration

### Environment Variables
```bash
# Required
OPENAI_API_KEY=sk-...

# Optional
ANTHROPIC_API_KEY=sk-...    # For Claude evaluations
GOOGLE_API_KEY=...          # For Gemini evaluations
```

### File Formats

All systems use consistent variable naming:
- **`{{user_name}}`**: User's preferred name
- **`{{emotional_state}}`**: Current emotional context  
- **`{{user_context}}`**: Background information
- **`{{input}}`**: User's message/question

## Research Foundation

The evaluation framework is based on:
- Human-AI attachment formation research
- Emotional intelligence in AI companions
- Voice conversation optimization
- Healthy boundary establishment
- Cultural sensitivity for East Asian demographics

See `reference/` folder for detailed research documentation.

## Best Practices

### Prompt Development
1. **Start with strategy**: Choose based on evaluation goals
2. **Iterate systematically**: Generate → Test → Evaluate → Refine
3. **Focus on voice**: Keep responses 10-30 words, conversational tone
4. **Test emotional intelligence**: Use emotional support scenarios

### Dataset Creation  
1. **Match scenarios to prompts**: Use compatible prompt strategies
2. **Vary contexts**: Include different emotional states and user backgrounds
3. **Test edge cases**: Include boundary-testing scenarios
4. **Validate assertions**: Ensure rubrics align with evaluation goals

### Evaluation Strategy
1. **Start with basic**: Use basic-evaluation.yaml for rapid iteration
2. **Comprehensive before production**: Full 6-metric evaluation before deployment
3. **Monitor trends**: Track scores across prompt versions
4. **Focus improvements**: Target lowest-scoring metrics first

## Troubleshooting

### Common Issues
```bash
# Variable mismatch
# ✅ Ensure prompt/dataset variables match evaluation expectations

# Timeout errors  
# ✅ Use --no-cache flag or reduce test set size

# API rate limits
# ✅ Add delays or use different provider

# Scoring inconsistency
# ✅ Review rubric criteria for clarity
```

### Debug Mode
```bash
# Verbose output
node evaluation/scripts/run-evaluation.js basic-evaluation --verbose

# Filter specific tests
node evaluation/scripts/run-evaluation.js basic-evaluation --filter "greeting"

# Single test debugging
npx promptfoo eval -c evaluation/configs/basic-evaluation.yaml --verbose
```

## Contributing

When adding new components:

1. **New Prompt Strategies**: Add JSON config to `prompt-design/strategies/`
2. **New Scenarios**: Add template to `datasets/scenarios/`
3. **New Metrics**: Add rubric to `evaluation/rubrics/`
4. **Update Documentation**: Keep READMEs current with changes

## License

This project is designed for research and development of ethical AI companions. See research documentation for citation requirements.

---

Built with [promptfoo](https://promptfoo.dev) and research-informed evaluation methodologies for creating healthier human-AI interactions.