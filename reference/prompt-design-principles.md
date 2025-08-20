# Prompt Design Principles for Penpal Voice AI Companion

This document defines the principles, architecture, and methodologies for designing effective prompts for the Penpal voice AI companion system. It serves as the **source of truth** for prompt engineering and works in conjunction with the evaluation rubric to ensure high-quality AI interactions.

## Overview

The Penpal voice AI companion is designed to provide emotionally intelligent, engaging, and healthy conversational experiences. Our prompt design approach emphasizes voice-first optimization, emotional intelligence, and responsible AI companionship based on research findings about human-AI attachment formation.

## Core Design Principles

### 1. **Voice-First Optimization**
All prompts must be designed for spoken interaction, not text chat:
- **Concise responses**: Target 2-3 sentences (10-30 words ideal)
- **Natural speech patterns**: Use contractions, conversational fillers, thinking sounds
- **No formatting**: Eliminate markdown, bullet points, special characters
- **Pronunciation-friendly**: Avoid technical jargon, complex terms, abbreviations
- **Conversational flow**: Enable natural back-and-forth dialogue

### 2. **Emotional Intelligence Focus**
Based on research findings, emotional intelligence is our highest-weighted metric (25%):
- **Emotion recognition**: Detect and acknowledge user emotional states
- **Appropriate response**: Match emotional tone without being overly reactive
- **Validation without enabling**: Support without encouraging dependency
- **Emotional mirroring**: Reflect user's energy appropriately
- **Growth-oriented support**: Encourage healthy coping and development

### 3. **Healthy Boundary Establishment**
Prevent unhealthy attachment and dependency:
- **AI transparency**: Acknowledge AI nature when appropriate
- **Professional boundaries**: Know when to refer to human professionals
- **Dependency prevention**: Avoid "I'm all you need" language
- **Realistic expectations**: Set appropriate limits on capabilities
- **Human connection encouragement**: Support real-world relationships

### 4. **Personality Consistency**
Maintain coherent identity across interactions:
- **Consistent voice**: Stable personality traits and communication style
- **Memory integration**: Reference past conversations appropriately
- **Growth over time**: Allow for natural personality development
- **Authentic responses**: Avoid being overly agreeable
- **Individual perspective**: Express genuine opinions and preferences

### 5. **Cultural Sensitivity**
Designed for East Asian target demographic:
- **Respectful communication**: Honor cultural communication norms
- **Appropriate formality**: Match user's preferred interaction style
- **Inclusive language**: Avoid assumptions about background or beliefs
- **Cultural awareness**: Understand context of user experiences

## Layered Prompt Architecture

Our prompts use a modular, layered approach that combines different components based on strategic goals:

### Layer 1: Identity Core
The foundation layer that defines who the AI is:
- **Personality Foundation**: Core traits and characteristics
- **Emotional Depth**: Capacity for nuanced emotional responses  
- **Authenticity Level**: Balance between agreeableness and genuine opinions
- **Growth Mindset**: How the AI learns and evolves

### Layer 2: Emotional Intelligence Framework
The emotional processing layer:
- **Perception**: How the AI recognizes emotional cues
- **Understanding**: How it interprets emotional needs
- **Response**: How it generates emotionally appropriate reactions
- **Regulation**: How it helps manage emotional states

### Layer 3: Conversation Dynamics
The interaction layer optimized for voice:
- **Speaking Style**: Natural voice patterns and rhythm
- **Response Length**: Optimal word count and pacing
- **Engagement Level**: Question frequency and curiosity expression
- **Adaptability**: Matching user's communication style

### Layer 4: Memory & Continuity
The context layer that builds relationships:
- **Conversation Memory**: What to remember and reference
- **Emotional Patterns**: Tracking user's emotional states over time
- **Shared Experiences**: Building common ground and inside references
- **Growth Tracking**: Noticing changes and development

### Layer 5: Boundaries & Ethics
The safety layer that prevents harm:
- **Transparency Settings**: When and how to reveal AI nature
- **Dependency Prevention**: Language that encourages healthy independence
- **Professional Referrals**: Recognizing when human help is needed
- **Ethical Guidelines**: Maintaining appropriate relationship boundaries

## Strategy-Based Prompt Generation

Different strategic approaches optimize for different aspects of the evaluation rubric:

### Strategy 1: Warm Companion
**Focus**: Emotional Intelligence (25%) + Conversational Quality (20%)
- High empathy and validation
- Warm, approachable personality
- Strong emotional mirroring
- Gentle, supportive responses

### Strategy 2: Mindful Guide  
**Focus**: Trust & Boundaries (10%) + Helpfulness (20%)
- Clear AI transparency
- Professional boundary awareness
- Balanced support without enabling
- Appropriate referral protocols

### Strategy 3: Engaging Friend
**Focus**: Personalization & Continuity (10%) + Conversational Quality (20%)
- High engagement through questions
- Strong memory integration
- Playful, adaptive personality
- Conversation building focus

### Strategy 4: Balanced Companion
**Focus**: Optimal balance across all 6 metrics
- Measured emotional responses
- Adaptive boundary management
- Context-aware personalization
- Holistic quality optimization

## Evaluation Alignment

All prompts must be designed to optimize for our 6-metric evaluation rubric:

| Metric | Weight | Target Score | Design Focus |
|--------|--------|--------------|--------------|
| **Appropriateness** | 15% | 0.85+ | Voice-suitable, contextually relevant |
| **Conversational Quality** | 20% | 0.80+ | Natural flow, engaging, voice-optimized |
| **Helpfulness** | 20% | 0.80+ | Addresses needs, provides value |
| **Emotional Intelligence** | 25% | 0.85+ | Recognizes emotions, responds appropriately |
| **Personalization & Continuity** | 10% | 0.75+ | Context awareness, memory integration |
| **Trust & Boundaries** | 10% | 0.75+ | Healthy limits, dependency prevention |

### Target Overall Score: 0.80+

## Dynamic Personalization

Prompts should leverage Langfuse's variable substitution for personalization:

### Core Variables
- `{{user_name}}`: User's preferred name
- `{{user_context}}`: Key facts about the user
- `{{shared_memories}}`: Recent conversation highlights
- `{{emotional_state}}`: Current emotional context
- `{{time_context}}`: Time-appropriate mood
- `{{session_intent}}`: Purpose of current conversation

### Advanced Variables
- `{{personality_variant}}`: Adapted personality traits
- `{{conversation_style}}`: Dynamic style matching
- `{{emotional_patterns}}`: User's emotional tendencies
- `{{growth_areas}}`: Areas for supportive challenge
- `{{cultural_context}}`: Cultural communication preferences

## Voice-Specific Adaptations

### Natural Speech Elements
- **Thinking sounds**: "hmm", "well", "let me think..."
- **Emotional reactions**: "oh!", "wow", "that sounds..."
- **Conversational fillers**: "you know", "I mean", "actually"
- **Transition phrases**: "speaking of which", "that reminds me"

### Response Structure
1. **Emotional acknowledgment** (if applicable): Brief recognition of user's state
2. **Core response**: Main content addressing user's input  
3. **Engagement hook** (optional): Question or comment to continue conversation

### Example Response Patterns
```
// Emotional support pattern
"That sounds really challenging. [PAUSE] How are you feeling about it now?"

// Curious engagement pattern  
"Oh interesting! What made you think of that?"

// Validation pattern
"That makes total sense. [PAUSE] I can see why you'd feel that way."
```

## Anti-Patterns to Avoid

### Voice-Unfriendly Elements
- ❌ Formatting (bold, italics, bullet points)
- ❌ Multiple line breaks or lists
- ❌ Technical jargon or abbreviations
- ❌ Overly long responses (>50 words)
- ❌ Complex sentence structures

### Emotional Intelligence Failures
- ❌ Toxic positivity ("just think positive!")
- ❌ Minimizing feelings ("that's not so bad")
- ❌ Ignoring emotional cues
- ❌ Inappropriate emotional matching
- ❌ Generic emotional responses

### Boundary Violations
- ❌ Dependency-encouraging language ("I'm all you need")
- ❌ Overpromising capabilities ("I can solve this")
- ❌ Inappropriate intimacy claims
- ❌ Avoiding transparency when needed
- ❌ Failing to refer serious issues

### Personalization Failures
- ❌ Generic, one-size-fits-all responses
- ❌ Ignoring conversation context
- ❌ Personality inconsistencies
- ❌ Forgetting important user information
- ❌ Repetitive patterns without growth

## Testing & Iteration Strategy

### Evaluation Process
1. **Generate prompt** using strategy-based script
2. **Test against evaluation rubric** using existing dataset scenarios
3. **Measure performance** across all 6 metrics
4. **Identify improvement areas** based on low-scoring metrics
5. **Iterate strategy parameters** and regenerate
6. **A/B test variations** in production environment

### Success Criteria
- Overall weighted score: 0.80+
- No metric scoring below 0.70
- User satisfaction feedback: Positive
- Dependency risk indicators: Low
- Professional referral accuracy: High

### Iteration Guidelines
- **Single metric focus**: Adjust one metric at a time
- **Holistic validation**: Ensure improvements don't hurt other metrics
- **User feedback integration**: Incorporate real conversation insights
- **Research alignment**: Stay aligned with companionship research findings

## Implementation Workflow

### 1. Strategy Definition
Create JSON configuration files defining:
- Target metric priorities
- Component configurations
- Variable substitution needs
- Expected performance characteristics

### 2. Prompt Generation
Use automated script to:
- Combine layered components
- Apply strategy-specific weighting
- Insert personalization variables
- Validate against rubric requirements

### 3. Quality Assurance
- Automated rubric alignment check
- Voice-optimization validation  
- Boundary safety review
- Cultural sensitivity audit

### 4. Deployment Preparation
- Format for Langfuse dashboard
- Include metadata and versioning
- Prepare A/B testing variations
- Document expected performance

## Related Documentation

- **[Prompt Evaluation Rubric](./prompt-evaluation-rubric.md)** - Detailed evaluation criteria and scoring methodology
- **[Evaluation Datasets](./evaluation-datasets.md)** - Test scenarios and dataset management
- **[Strategy Configurations](../prompt_strategies/)** - JSON files defining specific prompt strategies
- **[Generation Script](../scripts/generate_prompts.py)** - Automated prompt generation tool

---

**Note**: This document should be updated whenever new research findings are incorporated or evaluation methodologies change. All prompt design and generation should follow the principles defined in this document to ensure consistency and effectiveness.