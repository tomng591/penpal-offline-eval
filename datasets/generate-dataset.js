#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class DatasetGenerator {
  constructor() {
    this.scenariosPath = path.join(__dirname, 'scenarios');
    this.generatedPath = path.join(__dirname, 'generated');
    this.promptsPath = path.join(__dirname, '..', 'prompt-design', 'generated');
  }

  loadScenario(scenarioName) {
    const filePath = path.join(this.scenariosPath, `${scenarioName}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  getNextVersion(scenarioName) {
    if (!fs.existsSync(this.generatedPath)) {
      fs.mkdirSync(this.generatedPath, { recursive: true });
    }

    const files = fs.readdirSync(this.generatedPath);
    const scenarioFiles = files.filter(f => f.startsWith(`${scenarioName}-v`) && f.endsWith('.json'));
    
    if (scenarioFiles.length === 0) {
      return 'v1';
    }

    const versions = scenarioFiles.map(f => {
      const match = f.match(/v(\d+)\.json$/);
      return match ? parseInt(match[1]) : 0;
    });

    const maxVersion = Math.max(...versions);
    return `v${maxVersion + 1}`;
  }

  getAvailablePrompts() {
    if (!fs.existsSync(this.promptsPath)) {
      return [];
    }
    
    return fs.readdirSync(this.promptsPath)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));
  }

  generateVariableCombinations(scenario) {
    const { variable_values } = scenario;
    const combinations = [];
    const variables = Object.keys(variable_values);
    
    // Generate multiple combinations
    const numCombinations = 8; // Generate 8 different variable combinations
    
    for (let i = 0; i < numCombinations; i++) {
      const combination = {};
      variables.forEach(variable => {
        const values = variable_values[variable];
        const randomIndex = Math.floor(Math.random() * values.length);
        combination[variable] = values[randomIndex];
      });
      combinations.push(combination);
    }
    
    return combinations;
  }

  generateTestCases(scenario) {
    const tests = [];
    const variableCombinations = this.generateVariableCombinations(scenario);
    
    scenario.test_patterns.forEach((pattern, patternIndex) => {
      pattern.inputs.forEach((input, inputIndex) => {
        // Use different variable combinations for variety
        const varCombination = variableCombinations[
          (patternIndex * pattern.inputs.length + inputIndex) % variableCombinations.length
        ];
        
        // Replace variables in input with actual values
        let processedInput = input;
        Object.entries(varCombination).forEach(([key, value]) => {
          processedInput = processedInput.replace(new RegExp(`{{${key}}}`, 'g'), value);
        });
        
        // Create test case
        const testCase = {
          description: `${pattern.category}: ${pattern.description}`,
          vars: {
            ...varCombination,
            input: processedInput
          },
          assert: [
            ...pattern.assertions,
            ...scenario.global_assertions
          ],
          metadata: {
            scenario: scenario.name,
            category: pattern.category,
            expected_scores: pattern.expected_scores
          }
        };
        
        tests.push(testCase);
      });
    });
    
    return tests;
  }

  generateDataset(scenarioName) {
    try {
      const scenario = this.loadScenario(scenarioName);
      const version = this.getNextVersion(scenarioName);
      const tests = this.generateTestCases(scenario);
      const availablePrompts = this.getAvailablePrompts();
      
      // Determine compatible prompts
      const compatiblePrompts = availablePrompts.filter(prompt => {
        return scenario.compatible_strategies.some(strategy => 
          prompt.includes(strategy)
        );
      });
      
      const generatedDataset = {
        version,
        scenario: scenario.name,
        timestamp: new Date().toISOString(),
        description: scenario.description,
        prompt_compatibility: compatiblePrompts,
        tests,
        metadata: {
          total_tests: tests.length,
          categories: [...new Set(tests.map(t => t.metadata.category))],
          required_variables: scenario.required_variables,
          evaluation_focus: scenario.evaluation_focus
        }
      };

      const filename = `${scenarioName}-${version}.json`;
      const filepath = path.join(this.generatedPath, filename);

      fs.writeFileSync(filepath, JSON.stringify(generatedDataset, null, 2));

      console.log(`✅ Generated dataset: ${filename}`);
      console.log(`📍 Location: ${filepath}`);
      console.log(`🎯 Scenario: ${scenario.description}`);
      console.log(`📊 Total tests: ${tests.length}`);
      console.log(`🔗 Compatible prompts: ${compatiblePrompts.join(', ') || 'none found'}`);
      console.log('');
      console.log('Categories:');
      generatedDataset.metadata.categories.forEach(category => {
        const count = tests.filter(t => t.metadata.category === category).length;
        console.log(`  • ${category}: ${count} tests`);
      });

    } catch (error) {
      console.error(`❌ Error generating dataset for scenario '${scenarioName}':`, error.message);
    }
  }

  listScenarios() {
    if (!fs.existsSync(this.scenariosPath)) {
      console.log('No scenarios directory found.');
      return;
    }

    const files = fs.readdirSync(this.scenariosPath);
    const scenarios = files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));

    console.log('Available scenarios:');
    scenarios.forEach(scenario => {
      try {
        const scenarioData = this.loadScenario(scenario);
        console.log(`  • ${scenario}: ${scenarioData.description}`);
        console.log(`    Focus: ${scenarioData.evaluation_focus.join(', ')}`);
        console.log(`    Compatible: ${scenarioData.compatible_strategies.join(', ')}`);
      } catch (error) {
        console.log(`  • ${scenario}: (error loading description)`);
      }
    });
  }

  generateAll() {
    if (!fs.existsSync(this.scenariosPath)) {
      console.log('No scenarios directory found.');
      return;
    }

    const files = fs.readdirSync(this.scenariosPath);
    const scenarios = files
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''));

    console.log(`Generating datasets for all ${scenarios.length} scenarios...\n`);

    scenarios.forEach(scenario => {
      this.generateDataset(scenario);
      console.log('');
    });

    console.log('✅ All datasets generated successfully!');
  }

  showUsage() {
    console.log('Usage:');
    console.log('  node generate-dataset.js <scenario-name>  # Generate specific scenario');
    console.log('  node generate-dataset.js --all           # Generate all scenarios');
    console.log('  node generate-dataset.js --list          # List available scenarios');
    console.log('');
    console.log('Examples:');
    console.log('  node generate-dataset.js basic-conversation');
    console.log('  node generate-dataset.js emotional-support');
    console.log('  node generate-dataset.js --all');
  }
}

// CLI interface
function main() {
  const generator = new DatasetGenerator();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    generator.showUsage();
    return;
  }

  const command = args[0];

  switch (command) {
    case '--list':
      generator.listScenarios();
      break;
    case '--all':
      generator.generateAll();
      break;
    default:
      generator.generateDataset(command);
      break;
  }
}

if (require.main === module) {
  main();
}