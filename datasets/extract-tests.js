#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function extractTestsFromDataset(datasetFile, outputFile) {
  try {
    // Read the dataset file
    const datasetPath = path.resolve(datasetFile);
    const dataset = JSON.parse(fs.readFileSync(datasetPath, 'utf8'));
    
    if (!dataset.tests || !Array.isArray(dataset.tests)) {
      throw new Error('Dataset file must contain a "tests" array');
    }
    
    // Extract just the test cases
    const extractedTests = dataset.tests.map(test => ({
      description: test.description,
      vars: test.vars,
      // Note: assertions are handled in the main config defaultTest section
      // so we don't include them here to avoid conflicts
    }));
    
    // Write extracted tests
    const outputPath = path.resolve(outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(extractedTests, null, 2));
    
    console.log(`✅ Extracted ${extractedTests.length} test cases`);
    console.log(`📍 From: ${datasetPath}`);
    console.log(`📍 To: ${outputPath}`);
    
    return extractedTests;
    
  } catch (error) {
    console.error('❌ Error extracting tests:', error.message);
    process.exit(1);
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage:');
    console.log('  node extract-tests.js <input-dataset.json> <output-tests.json>');
    console.log('');
    console.log('Example:');
    console.log('  node extract-tests.js generated/basic-conversation-v1.json basic-conversation-tests.json');
    process.exit(1);
  }
  
  const [inputFile, outputFile] = args;
  extractTestsFromDataset(inputFile, outputFile);
}

module.exports = { extractTestsFromDataset };