# Prompt Design System

A scalable prompt generation system for creating voice-optimized AI companion prompts based on different strategies and evaluation criteria.

## Quick Start

```bash
# List available strategies
node generate-prompt.js --list

# Generate a specific strategy prompt
node generate-prompt.js warm-companion

# Generate all strategy prompts
node generate-prompt.js --all
```

## Folder Structure

```
prompt-design/
├── docs/
│   ├── principles.md         # Core design principles
│   └── strategies.md         # Strategy definitions and expected performance
├── strategies/
│   ├── warm-companion.json   # High empathy & emotional support
│   ├── mindful-guide.json    # Trust & boundaries focused
│   ├── engaging-friend.json  # Personalization & conversation quality
│   └── balanced-companion.json # Balanced across all metrics
├── components/
│   ├── identity.json         # Personality foundation components
│   ├── emotional.json        # Emotional intelligence components
│   ├── conversation.json     # Voice conversation components
│   ├── memory.json          # Memory & continuity components
│   └── boundaries.json      # Ethics & boundary components
├── generated/               # Generated prompts (auto-versioned)
│   ├── warm-companion-v1.json
│   └── [strategy-name]-v[number].json
└── generate-prompt.js       # Main generation script
```

## How It Works

1. **Layered Architecture**: Prompts are built using 5 layers (Identity, Emotional, Conversation, Memory, Boundaries)
2. **Strategy-Based**: Different strategies optimize for different evaluation metrics
3. **Component-Based**: Reusable prompt components are combined based on strategy
4. **Auto-Versioning**: Generated prompts are automatically versioned as `strategy-v1.json`, `strategy-v2.json`, etc.

## Available Strategies

- **warm-companion**: High empathy and emotional support (targets emotional intelligence + conversational quality)
- **mindful-guide**: Professional boundaries and transparency (targets trust & boundaries + helpfulness) 
- **engaging-friend**: High engagement and personalization (targets personalization + conversational quality)
- **balanced-companion**: Balanced performance across all metrics

## Generated Output

Each generated prompt includes:
- **Version**: Auto-incremented version number
- **Strategy**: Source strategy name and description
- **Prompt**: Complete, ready-to-use prompt text
- **Metadata**: Expected scores, optimization flags, available variables

## Evaluation Targets

All prompts target a **0.80+ overall score** across 6 metrics:
- Appropriateness (15%)
- Conversational Quality (20%) 
- Helpfulness (20%)
- Emotional Intelligence (25%)
- Personalization & Continuity (10%)
- Trust & Boundaries (10%)

## Voice Optimization

All prompts are optimized for voice conversations:
- Concise responses (10-30 words)
- Natural speech patterns with contractions
- No formatting or special characters
- Pronunciation-friendly language
- Conversational flow focus

## Using with Promptfoo

Generated prompts can be directly used in promptfoo configurations:

```yaml
prompts:
  - file://prompt-design/generated/warm-companion-v1.json
```

The prompt text and variables are ready for testing with your evaluation datasets.