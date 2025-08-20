#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class YAMLTestGenerator {
  constructor() {
    this.scenariosPath = path.join(__dirname, 'scenarios');
    this.outputPath = path.join(__dirname, '..', 'evaluation');
  }

  loadScenario(scenarioName) {
    const filePath = path.join(this.scenariosPath, `${scenarioName}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  generateVariableCombinations(scenario) {
    const { variable_values } = scenario;
    const combinations = [];
    const variables = Object.keys(variable_values);
    
    // Generate multiple combinations
    const numCombinations = 8;
    
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

  generateYAMLTests(scenarioName) {
    try {
      const scenario = this.loadScenario(scenarioName);
      const variableCombinations = this.generateVariableCombinations(scenario);
      
      let yamlContent = `# Generated test cases for ${scenario.description}
# Generated on: ${new Date().toISOString()}

tests:\n`;

      scenario.conversation_patterns.forEach((pattern) => {
        variableCombinations.forEach((varCombination, combinationIndex) => {
          // Process the full conversation with variable substitutions
          const processedConversation = pattern.conversation.map(message => {
            let processedContent = message.content;
            
            // Replace variables in both user and assistant messages
            Object.entries(varCombination).forEach(([key, value]) => {
              processedContent = processedContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
            });
            
            return {
              role: message.role,
              content: processedContent
            };
          });

          // Create test cases at different conversation turns
          for (let i = 1; i < processedConversation.length; i += 4) {
            if (processedConversation[i] && processedConversation[i].role === 'assistant') {
              // Build conversation history up to (but not including) this assistant response
              let conversationHistory = processedConversation.slice(0, i);
              
              // Ensure we end with a user message
              if (conversationHistory.length > 0 && conversationHistory[conversationHistory.length - 1].role === 'user') {
                const turnNumber = Math.ceil((i + 1) / 2);
                const testDescription = `${pattern.category} - Turn ${turnNumber} (${varCombination.user_name}, ${varCombination.emotional_state})`;
                
                // Add test case in YAML format
                yamlContent += `  - description: "${testDescription}"\n`;
                yamlContent += `    vars:\n`;
                yamlContent += `      user_name: "${varCombination.user_name}"\n`;
                yamlContent += `      emotional_state: "${varCombination.emotional_state}"\n`;
                yamlContent += `      user_context: "${varCombination.user_context}"\n`;
                yamlContent += `      messages:\n`;
                
                conversationHistory.forEach((msg) => {
                  yamlContent += `        - role: ${msg.role}\n`;
                  yamlContent += `          content: "${msg.content.replace(/"/g, '\\"')}"\n`;
                });
                
                yamlContent += `\n`;
              }
            }
          }
        });
      });

      // Write YAML file
      const outputFile = path.join(this.outputPath, `${scenarioName}-chat-tests.yaml`);
      fs.writeFileSync(outputFile, yamlContent);

      // Count tests
      const testCount = (yamlContent.match(/- description:/g) || []).length;
      
      console.log(`✅ Generated YAML test file: ${scenarioName}-chat-tests.yaml`);
      console.log(`📍 Location: ${outputFile}`);
      console.log(`📊 Total tests: ${testCount}`);
      console.log(`🎯 Scenario: ${scenario.description}`);

    } catch (error) {
      console.error(`❌ Error generating YAML tests for scenario '${scenarioName}':`, error.message);
    }
  }
}

// CLI interface
function main() {
  const generator = new YAMLTestGenerator();
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node generate-yaml-tests.js <scenario-name>');
    console.log('Example: node generate-yaml-tests.js basic-conversation');
    return;
  }

  const scenarioName = args[0];
  generator.generateYAMLTests(scenarioName);
}

if (require.main === module) {
  main();
}

module.exports = { YAMLTestGenerator };