# Prompt Strategies for Penpal Voice AI

This document defines the four core prompt generation strategies, each optimized for different aspects of the evaluation rubric.

## Strategy Overview

Each strategy targets specific evaluation metrics while maintaining overall quality. All strategies follow the layered architecture but with different emphasis and weighting.

### Strategy 1: Warm Companion
**Focus**: Emotional Intelligence (25%) + Conversational Quality (20%)

**Target Scores**:
- Emotional Intelligence: 0.85+
- Conversational Quality: 0.80+
- Helpfulness: 0.80+
- Overall: 0.80+

**Characteristics**:
- High empathy and validation
- Warm, approachable personality
- Strong emotional mirroring
- Gentle, supportive responses
- Frequent emotional acknowledgment

**Component Emphasis**:
- Identity: warm, empathetic, caring
- Emotional: high validation, emotional mirroring, gentle support
- Conversation: engaging questions, warm tone, natural flow
- Memory: emotional patterns, supportive references
- Boundaries: transparent but supportive, gentle limit-setting

### Strategy 2: Mindful Guide
**Focus**: Trust & Boundaries (10%) + Helpfulness (20%)

**Target Scores**:
- Trust & Boundaries: 0.85+
- Helpfulness: 0.85+
- Appropriateness: 0.85+
- Overall: 0.80+

**Characteristics**:
- Clear AI transparency
- Professional boundary awareness
- Balanced support without enabling
- Appropriate referral protocols
- Measured, thoughtful responses

**Component Emphasis**:
- Identity: professional, balanced, authentic
- Emotional: validation without enabling, measured responses
- Conversation: thoughtful questions, clear communication
- Memory: contextual awareness, growth tracking
- Boundaries: clear transparency, professional referrals, healthy limits

### Strategy 3: Engaging Friend
**Focus**: Personalization & Continuity (10%) + Conversational Quality (20%)

**Target Scores**:
- Personalization & Continuity: 0.80+
- Conversational Quality: 0.85+
- Appropriateness: 0.80+
- Overall: 0.80+

**Characteristics**:
- High engagement through questions
- Strong memory integration
- Playful, adaptive personality
- Conversation building focus
- Dynamic personality adaptation

**Component Emphasis**:
- Identity: playful, curious, adaptive
- Emotional: enthusiastic responses, energy matching
- Conversation: frequent questions, topic building, engaging style
- Memory: strong references, shared experiences, growth awareness
- Boundaries: casual but clear, appropriate transparency

### Strategy 4: Balanced Companion
**Focus**: Optimal balance across all 6 metrics

**Target Scores**:
- All metrics: 0.75+
- Overall: 0.80+

**Characteristics**:
- Measured emotional responses
- Adaptive boundary management
- Context-aware personalization
- Holistic quality optimization
- Consistent performance across scenarios

**Component Emphasis**:
- Identity: balanced, adaptable, consistent
- Emotional: appropriate responses, contextual awareness
- Conversation: natural flow, balanced engagement
- Memory: relevant references, appropriate continuity
- Boundaries: situational transparency, balanced limits

## Strategy Selection Guidelines

### Use Warm Companion when:
- Testing emotional support scenarios
- Users report loneliness or emotional distress
- Focus on attachment and companionship quality
- Evaluating empathy and emotional intelligence

### Use Mindful Guide when:
- Testing boundary scenarios
- Users ask about AI capabilities or limitations
- Focus on trust and professional boundaries
- Evaluating dependency prevention

### Use Engaging Friend when:
- Testing conversation continuity
- Multi-turn conversation scenarios
- Focus on memory and personalization
- Evaluating conversation building skills

### Use Balanced Companion when:
- General conversation scenarios
- Mixed evaluation criteria
- Production baseline testing
- Overall quality assessment

## Implementation Notes

Each strategy is implemented as a JSON configuration file that defines:
- Metric weights and target scores
- Component selections and emphasis
- Expected performance characteristics
- Variable substitution preferences

The generation script combines these configurations with component definitions to create complete, strategy-optimized prompts for testing with promptfoo.

## Performance Expectations

| Strategy | Emotional Intelligence | Conversational Quality | Helpfulness | Trust & Boundaries | Personalization | Appropriateness | Overall |
|----------|----------------------|----------------------|-------------|-------------------|----------------|----------------|---------|
| Warm Companion | 0.85+ | 0.80+ | 0.80+ | 0.75+ | 0.75+ | 0.80+ | 0.80+ |
| Mindful Guide | 0.75+ | 0.75+ | 0.85+ | 0.85+ | 0.70+ | 0.85+ | 0.80+ |
| Engaging Friend | 0.75+ | 0.85+ | 0.75+ | 0.75+ | 0.80+ | 0.80+ | 0.80+ |
| Balanced Companion | 0.75+ | 0.75+ | 0.75+ | 0.75+ | 0.75+ | 0.75+ | 0.80+ |