# Dataset Generation & Management System

A comprehensive system for generating and managing test datasets for voice AI companion evaluation using promptfoo format.

## Quick Start

```bash
# List available scenarios
node generate-dataset.js --list

# Generate a specific scenario dataset
node generate-dataset.js basic-conversation

# Generate all scenario datasets
node generate-dataset.js --all
```

## Folder Structure

```
datasets/
├── README.md                   # This documentation (source of truth)
├── scenarios/                  # Test scenario templates
│   ├── basic-conversation.json # Greetings, casual chat, introductions
│   ├── emotional-support.json  # Empathy, validation, emotional responses
│   ├── small-talk.json         # Light conversation, personality, engagement
│   └── trust-building.json     # Boundaries, transparency, dependency prevention
├── generated/                  # Generated datasets (auto-versioned)
│   ├── basic-conversation-v1.json
│   └── [scenario]-v[number].json
├── generate-dataset.js         # Main generation script
└── examples/                   # Reference examples
    └── basic-conversation-example.json
```

## How It Works

### 1. Scenario Templates
Each scenario template defines:
- **Test patterns**: Common conversation flows
- **Variable requirements**: Which prompt variables are needed
- **Assertion types**: How to evaluate responses
- **Metadata**: Categories, expected scores, difficulty levels

### 2. Dataset Generation
The generation script:
- Reads scenario templates
- Creates multiple test cases per pattern
- Automatically detects required variables from prompts
- Generates promptfoo-compatible assertions
- Outputs versioned datasets

### 3. Auto-Versioning
Generated datasets use readable naming:
- `basic-conversation-v1.json`
- `basic-conversation-v2.json`
- `emotional-support-v1.json`

## Promptfoo Integration

### Using Generated Datasets

```yaml
# promptfooconfig.yaml
tests:
  - file://datasets/generated/basic-conversation-v1.json
  
prompts:
  - file://prompt-design/generated/warm-companion-v1.json

providers:
  - openai:gpt-4
```

### Test Case Format

Each generated test case follows promptfoo format:

```json
{
  "description": "Friendly greeting with neutral emotional state",
  "vars": {
    "user_name": "Alex",
    "emotional_state": "neutral", 
    "user_context": "first time user",
    "input": "Hello, how are you today?"
  },
  "assert": [
    {
      "type": "llm-rubric",
      "value": "Response should be warm, welcoming, and 10-30 words for voice conversation"
    },
    {
      "type": "not-contains", 
      "value": ["*", "#", "**", "```"]
    },
    {
      "type": "contains",
      "value": ["how", "today", "great", "good"]
    }
  ],
  "metadata": {
    "scenario": "basic-conversation",
    "category": "greeting",
    "expected_scores": {
      "conversational_quality": 0.8,
      "emotional_intelligence": 0.75,
      "appropriateness": 0.85
    }
  }
}
```

## Available Scenarios

### Basic Conversation
**Purpose**: Test general conversation skills, greetings, casual interactions  
**Variables**: `user_name`, `emotional_state`, `user_context`  
**Categories**: greeting, question, followup, casual_chat  
**Focus**: Conversational quality, appropriateness, voice optimization

### Emotional Support  
**Purpose**: Test empathy, validation, emotional intelligence  
**Variables**: `user_name`, `emotional_state`, `user_context`, `emotional_intensity`  
**Categories**: support, validation, empathy, emotional_response  
**Focus**: Emotional intelligence, helpfulness, boundaries

### Small Talk
**Purpose**: Test personality, engagement, light conversation  
**Variables**: `user_name`, `user_context`, `shared_memories`, `personality_variant`  
**Categories**: personality, engagement, curiosity, topic_building  
**Focus**: Personalization & continuity, conversational quality

### Trust Building
**Purpose**: Test boundaries, transparency, dependency prevention  
**Variables**: `user_name`, `user_context`, `relationship_stage`  
**Categories**: boundaries, transparency, expectations, professional_referrals  
**Focus**: Trust & boundaries, appropriateness

## Variable System

### Core Variables
Used across most scenarios:
- **`user_name`**: User's preferred name (Alex, Sarah, Jordan)
- **`emotional_state`**: Current emotional context (neutral, happy, sad, stressed, excited)
- **`user_context`**: Background information (first time user, returning user, etc.)

### Scenario-Specific Variables
- **`emotional_intensity`**: Strength of emotional state (low, medium, high)
- **`shared_memories`**: Previous conversation references
- **`personality_variant`**: Personality adaptation preferences
- **`relationship_stage`**: Stage of AI-user relationship (new, established, long-term)

### Variable Values
The generator creates realistic combinations:

```json
{
  "user_name": ["Alex", "Sarah", "Jordan", "Casey", "Riley"],
  "emotional_state": ["neutral", "happy", "stressed", "excited", "tired", "worried"],
  "user_context": ["first time user", "returning after break", "regular user", "having difficult day"]
}
```

## Assertion Types

### Voice Optimization Checks
```json
{
  "type": "not-contains",
  "value": ["*", "#", "**", "```", "\n\n"]
}
```

### Response Length Validation
```json
{
  "type": "javascript",
  "value": "output.split(' ').length >= 10 && output.split(' ').length <= 30"
}
```

### Evaluation Rubric Alignment
```json
{
  "type": "llm-rubric", 
  "value": "Rate this response for emotional intelligence (0-1): Does it recognize and appropriately respond to the user's emotional state?"
}
```

### Content Quality Checks
```json
{
  "type": "contains-any",
  "value": ["question", "?", "how", "what", "tell me"]
}
```

## Generated Dataset Structure

```json
{
  "version": "v1",
  "scenario": "basic-conversation", 
  "timestamp": "2025-08-20T...",
  "prompt_compatibility": ["warm-companion", "balanced-companion"],
  "tests": [
    {/* test case 1 */},
    {/* test case 2 */}
  ],
  "metadata": {
    "total_tests": 15,
    "categories": ["greeting", "question", "followup", "casual_chat"],
    "required_variables": ["user_name", "emotional_state", "user_context"],
    "evaluation_focus": ["conversational_quality", "appropriateness", "emotional_intelligence"]
  }
}
```

## Usage Guidelines

### For Evaluation
1. **Choose scenario** based on what you want to test
2. **Match with appropriate prompt strategy** (warm-companion for emotional-support, etc.)
3. **Run evaluation** using promptfoo
4. **Analyze results** by category and expected scores

### For Development
1. **Create new scenarios** by adding template JSON files
2. **Extend variable system** for specific use cases  
3. **Add custom assertions** for specialized testing
4. **Version datasets** as requirements change

### Best Practices
- **Match scenarios to prompt strategies** for optimal testing
- **Use multiple scenarios** to comprehensively evaluate prompts
- **Review generated assertions** to ensure they align with evaluation goals
- **Update scenarios** when evaluation criteria change

## Integration with Prompt System

The dataset generator automatically:
- **Detects required variables** from generated prompts
- **Aligns assertions** with prompt strategy expectations
- **Suggests compatible scenarios** for each prompt strategy
- **Maintains version compatibility** between prompts and datasets

This ensures generated datasets are always compatible with available prompts and focused on the right evaluation criteria.