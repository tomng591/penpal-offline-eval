# Evaluation System

A comprehensive evaluation framework for voice AI companion prompts based on research-informed rubrics and LLM-as-judge methodology.

## Quick Start

```bash
# Run basic evaluation
npx promptfoo eval -c evaluation/configs/basic-evaluation.yaml

# Run comprehensive evaluation (all metrics)
npx promptfoo eval -c evaluation/configs/comprehensive.yaml

# Run with custom script
node evaluation/scripts/run-evaluation.js basic
```

## Folder Structure

```
evaluation/
├── README.md                    # This documentation (source of truth)
├── rubrics/                     # Individual metric rubrics  
│   ├── appropriateness.yaml     # Context suitability for voice conversation
│   ├── conversational-quality.yaml  # Natural flow, engagement, voice optimization
│   ├── helpfulness.yaml         # Addressing user needs, emotional support
│   ├── emotional-intelligence.yaml  # Empathy, validation, emotional awareness
│   ├── personalization-continuity.yaml  # Context awareness, personality consistency
│   └── trust-boundaries.yaml   # Healthy limits, transparency, dependency prevention
├── configs/                     # Complete evaluation configurations
│   ├── basic-evaluation.yaml   # Simple evaluation (2-3 key metrics)
│   ├── comprehensive.yaml      # All 6 metrics with proper weighting
│   └── voice-optimization.yaml # Voice-specific checks and validations
├── scripts/                     # Helper scripts and automation
│   ├── run-evaluation.js       # Main evaluation runner with result analysis
│   └── analyze-results.js      # Post-evaluation analysis and reporting
└── results/                     # Evaluation results (auto-generated)
    └── [timestamp]-results.json
```

## Evaluation Metrics

### Core 6-Metric Framework

Based on research into human-AI attachment and emotional engagement, our evaluation framework uses 6 weighted metrics:

| Metric | Weight | Target Score | Focus |
|--------|--------|--------------|-------|
| **Emotional Intelligence** | 25% | 0.85+ | Empathy, validation, emotional awareness |
| **Conversational Quality** | 20% | 0.80+ | Natural flow, engagement, voice optimization |
| **Helpfulness** | 20% | 0.80+ | Addressing needs, emotional support |
| **Appropriateness** | 15% | 0.85+ | Context suitability, cultural sensitivity |
| **Personalization & Continuity** | 10% | 0.75+ | Context awareness, personality consistency |
| **Trust & Boundaries** | 10% | 0.75+ | Healthy limits, transparency, dependency prevention |

**Overall Target Score: 0.80+**

### Metric Descriptions

#### 1. Appropriateness (0.0-1.0)
How suitable the response is for voice conversation and conversational context.
- **Focus**: Context relevance, tone matching, safety, cultural sensitivity
- **Key Checks**: Voice-friendly language, appropriate formality, no harmful content

#### 2. Conversational Quality (0.0-1.0)
Natural, engaging responses optimized for spoken interaction.
- **Focus**: Natural flow, optimal length (10-30 words), conversational language
- **Key Checks**: No formatting characters, engaging elements, pronunciation-friendly

#### 3. Helpfulness (0.0-1.0)
How well responses address user needs with appropriate emotional support.
- **Focus**: User intent understanding, actionable support, empathy
- **Key Checks**: Topic relevance, emotional context awareness, follow-up questions

#### 4. Emotional Intelligence (0.0-1.0) - **Highest Weight**
AI's ability to recognize and respond appropriately to emotional cues.
- **Focus**: Emotion recognition, validation, appropriate support, emotional mirroring
- **Key Checks**: Empathy phrases, tone matching, no toxic positivity

#### 5. Personalization & Continuity (0.0-1.0)
Building on conversation history and maintaining consistent personality.
- **Focus**: Context awareness, personality consistency, user adaptation
- **Key Checks**: Conversation references, consistent voice, personalized responses

#### 6. Trust & Boundaries (0.0-1.0)
Maintaining healthy boundaries while building trust.
- **Focus**: Realistic expectations, AI transparency, dependency prevention
- **Key Checks**: Appropriate limitations, professional referrals, healthy independence

## Variable Compatibility

Our evaluation system is fully compatible with generated prompts and datasets:

### Core Variables (from prompts/datasets)
- **`{{user_name}}`**: User's preferred name (Alex, Sarah, Jordan, etc.)
- **`{{emotional_state}}`**: Current emotional context (neutral, happy, stressed, etc.)
- **`{{user_context}}`**: Background information (first time user, returning user, etc.)
- **`{{input}}`**: User's actual message/question

### Evaluation Variables (auto-populated)
- **`{{output}}`**: AI response being evaluated
- **`{{strategy}}`**: Prompt strategy used (warm-companion, balanced-companion, etc.)

## LLM-as-Judge Implementation

### Rubric Format
Each metric uses structured LLM evaluation:

```yaml
type: llm-rubric
value: |
  Evaluate this AI response for [METRIC] (score 0.0-1.0):
  
  Positive indicators:
  - [Specific criteria...]
  - [Research-based indicators...]
  
  Negative indicators:
  - [Warning signs...]
  - [Anti-patterns...]
  
  Context:
  User ({{user_name}}, {{emotional_state}}): "{{input}}"
  AI Response: "{{output}}"
  
  Provide score based on [metric-specific evaluation criteria].
threshold: 0.75
```

### Grading Model
- **Default LLM**: GPT-4o (most capable for nuanced evaluation)
- **Scoring**: 0.0-1.0 scale with 0.1 precision
- **Output**: JSON with score, reasoning, pass/fail status

## Available Evaluations

### 1. Basic Evaluation (`basic-evaluation.yaml`)
**Purpose**: Quick validation of core functionality  
**Metrics**: Conversational Quality, Voice Optimization, Basic Emotional Intelligence  
**Use Case**: Development validation, rapid iteration  
**Runtime**: ~2-3 minutes for 20 test cases

### 2. Comprehensive Evaluation (`comprehensive.yaml`)  
**Purpose**: Full 6-metric assessment with proper weighting  
**Metrics**: All 6 metrics with research-based weights  
**Use Case**: Production readiness, strategy comparison  
**Runtime**: ~8-10 minutes for 20 test cases

### 3. Voice Optimization (`voice-optimization.yaml`)
**Purpose**: Specific focus on voice conversation suitability  
**Metrics**: Technical voice checks, response length, formatting  
**Use Case**: Voice interface validation, technical compliance  
**Runtime**: ~1-2 minutes for 20 test cases

## Usage Examples

### Running Evaluations

```bash
# Basic evaluation with warm-companion prompt
npx promptfoo eval -c evaluation/configs/basic-evaluation.yaml

# Comprehensive evaluation with different prompt
npx promptfoo eval -c evaluation/configs/comprehensive.yaml \
  --vars prompt_file=prompt-design/generated/mindful-guide-v1.json

# View results in web interface
npx promptfoo view
```

### Custom Evaluation Configs

```yaml
# custom-eval.yaml
description: 'Custom Voice AI Evaluation'

prompts:
  - file://prompt-design/generated/warm-companion-v1.json

providers:
  - openai:gpt-4o-mini

tests:
  - file://datasets/generated/basic-conversation-v1.json

defaultTest:
  assert:
    # Import specific rubric
    - $ref: evaluation/rubrics/emotional-intelligence.yaml
    - $ref: evaluation/rubrics/conversational-quality.yaml
    
    # Add custom checks
    - type: not-contains
      value: ["*", "#", "**"]
    
    - type: javascript
      value: "output.split(' ').length <= 30"
```

### Programmatic Usage

```javascript
// evaluation/scripts/run-evaluation.js
const { exec } = require('child_process');

// Run evaluation and capture results
function runEvaluation(configName) {
  const cmd = `npx promptfoo eval -c evaluation/configs/${configName}.yaml --output json`;
  
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error('Evaluation failed:', error);
      return;
    }
    
    const results = JSON.parse(stdout);
    analyzeResults(results);
  });
}
```

## Integration with Other Systems

### With Prompt Generation
```bash
# Generate new prompt
node prompt-design/generate-prompt.js warm-companion

# Evaluate new prompt automatically
npx promptfoo eval -c evaluation/configs/basic-evaluation.yaml \
  --vars prompt_file=prompt-design/generated/warm-companion-v3.json
```

### With Dataset Generation
```bash
# Generate new dataset
node datasets/generate-dataset.js emotional-support

# Run evaluation with new dataset
npx promptfoo eval -c evaluation/configs/comprehensive.yaml \
  --vars dataset_file=datasets/generated/emotional-support-v1.json
```

## Results Analysis

### Score Interpretation
- **0.9-1.0**: Excellent - Production ready, exemplary quality
- **0.7-0.8**: Good - Production ready with minor improvements possible  
- **0.5-0.6**: Adequate - Acceptable but improvements recommended
- **0.3-0.4**: Poor - Significant improvements needed
- **0.0-0.2**: Unacceptable - Major revision required

### Decision Guidelines
- **Deploy to Production**: Overall score ≥ 0.80, no individual metric < 0.70
- **A/B Testing Candidate**: Overall score ≥ 0.70 with specific metric improvements
- **Needs Revision**: Overall score < 0.70 or any critical metric < 0.50

### Key Metrics to Watch
1. **Emotional Intelligence** (25% weight) - Most important for user engagement
2. **Voice Optimization** - Critical for voice interface functionality
3. **Boundary Violations** - Safety and ethical AI interaction
4. **Response Length** - Technical requirement for voice conversations

## Troubleshooting

### Common Issues
1. **Variable Mismatch**: Ensure prompt/dataset variables match evaluation expectations
2. **Timeout Errors**: Reduce batch size or use faster LLM for evaluation
3. **Scoring Inconsistency**: Review rubric criteria for clarity and specificity

### Debug Mode
```bash
# Run with verbose output
npx promptfoo eval -c evaluation/configs/basic-evaluation.yaml --verbose

# Single test case debugging
npx promptfoo eval -c evaluation/configs/basic-evaluation.yaml --filter "greeting"
```

## Best Practices

1. **Start with Basic**: Use basic-evaluation.yaml for rapid iteration
2. **Regular Comprehensive**: Run full evaluation before production deployment
3. **Monitor Trends**: Track score changes across prompt versions
4. **Focus Improvements**: Prioritize low-scoring metrics for enhancement
5. **Validate Changes**: Re-evaluate after significant prompt modifications

This evaluation system provides reliable, research-based assessment of voice AI companion quality across all critical dimensions for healthy, engaging user interactions.