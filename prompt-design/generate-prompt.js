#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class PromptGenerator {
  constructor() {
    this.componentsPath = path.join(__dirname, 'components');
    this.strategiesPath = path.join(__dirname, 'strategies');
    this.generatedPath = path.join(__dirname, 'generated');
  }

  loadComponent(componentName) {
    const filePath = path.join(this.componentsPath, `${componentName}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  loadStrategy(strategyName) {
    const filePath = path.join(this.strategiesPath, `${strategyName}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  getNextVersion(strategyName) {
    if (!fs.existsSync(this.generatedPath)) {
      fs.mkdirSync(this.generatedPath, { recursive: true });
    }

    const files = fs.readdirSync(this.generatedPath);
    const strategyFiles = files.filter(f => f.startsWith(`${strategyName}-v`) && f.endsWith('.json'));
    
    if (strategyFiles.length === 0) {
      return 'v1';
    }

    const versions = strategyFiles.map(f => {
      const match = f.match(/v(\d+)\.json$/);
      return match ? parseInt(match[1]) : 0;
    });

    const maxVersion = Math.max(...versions);
    return `v${maxVersion + 1}`;
  }

  buildPrompt(strategy) {
    const components = {
      identity: this.loadComponent('identity'),
      emotional: this.loadComponent('emotional'),
      conversation: this.loadComponent('conversation'),
      memory: this.loadComponent('memory'),
      boundaries: this.loadComponent('boundaries')
    };

    let prompt = '';

    // Build layered prompt based on strategy components
    const layers = [
      { name: 'Identity Core', components: strategy.components.identity || [], source: components.identity },
      { name: 'Emotional Intelligence', components: strategy.components.emotional || [], source: components.emotional },
      { name: 'Conversation Dynamics', components: strategy.components.conversation || [], source: components.conversation },
      { name: 'Memory & Continuity', components: strategy.components.memory || [], source: components.memory },
      { name: 'Boundaries & Ethics', components: strategy.components.boundaries || [], source: components.boundaries }
    ];

    layers.forEach((layer, index) => {
      if (layer.components.length > 0) {
        const layerContent = layer.components
          .map(comp => layer.source[comp])
          .filter(content => content)
          .join(' ');
        
        if (layerContent) {
          prompt += layerContent;
          if (index < layers.length - 1) {
            prompt += '\n\n';
          }
        }
      }
    });

    // Add voice optimization reminder
    if (strategy.voice_optimized) {
      prompt += '\n\nIMPORTANT: Keep responses concise (10-30 words), use natural speech patterns with contractions, and avoid any formatting or special characters. This is a voice conversation.';
    }

    // Add variable placeholders if specified
    if (strategy.variables.length > 0) {
      prompt += '\n\nPersonalization variables available: ';
      strategy.variables.forEach(variable => {
        prompt += `{{${variable}}} `;
      });
    }

    return prompt.trim();
  }

  generatePrompt(strategyName) {
    try {
      const strategy = this.loadStrategy(strategyName);
      const version = this.getNextVersion(strategyName);
      const prompt = this.buildPrompt(strategy);

      const generatedPrompt = {
        version,
        strategy: strategy.name,
        timestamp: new Date().toISOString(),
        prompt,
        metadata: {
          expected_scores: strategy.expected_scores,
          voice_optimized: strategy.voice_optimized,
          variables: strategy.variables
        }
      };

      const filename = `${strategyName}-${version}.json`;
      const filepath = path.join(this.generatedPath, filename);

      fs.writeFileSync(filepath, JSON.stringify(generatedPrompt, null, 2));

      console.log(`✅ Generated prompt: ${filename}`);
      console.log(`📍 Location: ${filepath}`);
      console.log(`🎯 Strategy: ${strategy.description}`);
      console.log(`📊 Expected overall score: ${strategy.expected_scores.overall}`);
      console.log(`🔤 Word count: ${prompt.split(' ').length} words`);
      console.log('');
      console.log('Preview:');
      console.log(prompt.substring(0, 200) + '...');

    } catch (error) {
      console.error(`❌ Error generating prompt for strategy '${strategyName}':`, error.message);
    }
  }

  listStrategies() {
    const files = fs.readdirSync(this.strategiesPath);
    const strategies = files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));

    console.log('Available strategies:');
    strategies.forEach(strategy => {
      try {
        const strategyData = this.loadStrategy(strategy);
        console.log(`  • ${strategy}: ${strategyData.description}`);
      } catch (error) {
        console.log(`  • ${strategy}: (error loading description)`);
      }
    });
  }

  generateAll() {
    const files = fs.readdirSync(this.strategiesPath);
    const strategies = files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));

    console.log(`Generating prompts for all ${strategies.length} strategies...\n`);

    strategies.forEach(strategy => {
      this.generatePrompt(strategy);
      console.log('');
    });

    console.log('✅ All prompts generated successfully!');
  }
}

// CLI interface
function main() {
  const generator = new PromptGenerator();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node generate-prompt.js <strategy-name>  # Generate specific strategy');
    console.log('  node generate-prompt.js --all           # Generate all strategies');
    console.log('  node generate-prompt.js --list          # List available strategies');
    console.log('');
    console.log('Examples:');
    console.log('  node generate-prompt.js warm-companion');
    console.log('  node generate-prompt.js mindful-guide');
    console.log('  node generate-prompt.js --all');
    return;
  }

  const command = args[0];

  switch (command) {
    case '--list':
      generator.listStrategies();
      break;
    case '--all':
      generator.generateAll();
      break;
    default:
      generator.generatePrompt(command);
      break;
  }
}

if (require.main === module) {
  main();
}