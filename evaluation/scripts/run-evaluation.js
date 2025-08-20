#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class EvaluationRunner {
  constructor() {
    this.configsPath = path.join(__dirname, '..', 'configs');
    this.resultsPath = path.join(__dirname, '..', 'results');
  }

  ensureResultsDir() {
    if (!fs.existsSync(this.resultsPath)) {
      fs.mkdirSync(this.resultsPath, { recursive: true });
    }
  }

  listConfigurations() {
    if (!fs.existsSync(this.configsPath)) {
      console.log('No evaluation configurations found.');
      return;
    }

    const files = fs.readdirSync(this.configsPath);
    const configs = files
      .filter(f => f.endsWith('.yaml'))
      .map(f => f.replace('.yaml', ''));

    console.log('Available evaluation configurations:');
    configs.forEach(config => {
      try {
        const configPath = path.join(this.configsPath, `${config}.yaml`);
        const content = fs.readFileSync(configPath, 'utf8');
        const descMatch = content.match(/description:\s*['"](.+)['"]/);
        const description = descMatch ? descMatch[1] : 'No description';
        console.log(`  • ${config}: ${description}`);
      } catch (error) {
        console.log(`  • ${config}: (error reading description)`);
      }
    });
  }

  async runEvaluation(configName, options = {}) {
    this.ensureResultsDir();
    
    const configPath = path.join(this.configsPath, `${configName}.yaml`);
    if (!fs.existsSync(configPath)) {
      throw new Error(`Configuration not found: ${configName}`);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputFile = path.join(this.resultsPath, `${configName}-${timestamp}.json`);

    console.log(`🚀 Running evaluation: ${configName}`);
    console.log(`📍 Configuration: ${configPath}`);
    console.log(`💾 Output: ${outputFile}`);

    let command = `npx promptfoo eval -c "${configPath}" --output json`;
    
    // Add optional parameters
    if (options.verbose) command += ' --verbose';
    if (options.noCache) command += ' --no-cache';
    if (options.filter) command += ` --filter "${options.filter}"`;

    return new Promise((resolve, reject) => {
      console.log(`\n⏳ Executing: ${command}\n`);
      
      const startTime = Date.now();
      const process = exec(command, { 
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer for large outputs
        timeout: 600000 // 10 minute timeout
      });

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data;
        if (options.verbose) {
          process.stdout.write(data);
        } else {
          // Show progress dots
          process.stdout.write('.');
        }
      });

      process.stderr.on('data', (data) => {
        stderr += data;
        if (options.verbose) {
          process.stderr.write(data);
        }
      });

      process.on('close', (code) => {
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`\n\n⏱️  Completed in ${duration} seconds`);

        if (code !== 0) {
          console.error(`❌ Evaluation failed with exit code ${code}`);
          if (stderr) console.error('Error output:', stderr);
          reject(new Error(`Evaluation failed: ${stderr}`));
          return;
        }

        try {
          // Parse results from stdout
          const jsonMatch = stdout.match(/\{[\s\S]*\}/);
          if (!jsonMatch) {
            throw new Error('No JSON output found in evaluation results');
          }

          const results = JSON.parse(jsonMatch[0]);
          
          // Save results to file
          fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
          
          // Analyze and display results
          this.analyzeResults(results, configName);
          
          console.log(`\n✅ Evaluation complete!`);
          console.log(`📊 Results saved to: ${outputFile}`);
          console.log(`🌐 View detailed results: npx promptfoo view`);

          resolve({ results, outputFile });
        } catch (error) {
          console.error('❌ Error processing results:', error.message);
          console.log('Raw stdout:', stdout);
          reject(error);
        }
      });
    });
  }

  analyzeResults(results, configName) {
    console.log(`\n📊 EVALUATION SUMMARY: ${configName.toUpperCase()}`);
    console.log('=' .repeat(50));

    if (!results.results || !results.results.length) {
      console.log('No test results found.');
      return;
    }

    const stats = {
      totalTests: results.results.length,
      passed: 0,
      failed: 0,
      scores: [],
      metrics: {}
    };

    // Process each test result
    results.results.forEach(result => {
      let testPassed = true;
      let testScores = [];

      result.response?.outputs?.forEach(output => {
        if (output.pass === false) testPassed = false;
        if (typeof output.score === 'number') {
          testScores.push(output.score);
        }
      });

      stats.passed += testPassed ? 1 : 0;
      stats.failed += testPassed ? 0 : 1;
      
      if (testScores.length > 0) {
        const avgScore = testScores.reduce((a, b) => a + b, 0) / testScores.length;
        stats.scores.push(avgScore);
      }
    });

    // Calculate overall statistics
    const passRate = ((stats.passed / stats.totalTests) * 100).toFixed(1);
    const avgScore = stats.scores.length > 0 
      ? (stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length).toFixed(3)
      : 'N/A';

    console.log(`📈 Pass Rate: ${passRate}% (${stats.passed}/${stats.totalTests})`);
    console.log(`🎯 Average Score: ${avgScore}`);
    console.log(`✅ Passed: ${stats.passed}`);
    console.log(`❌ Failed: ${stats.failed}`);

    // Score distribution
    if (stats.scores.length > 0) {
      const minScore = Math.min(...stats.scores).toFixed(3);
      const maxScore = Math.max(...stats.scores).toFixed(3);
      console.log(`📊 Score Range: ${minScore} - ${maxScore}`);
    }

    // Quality assessment
    if (avgScore !== 'N/A') {
      const score = parseFloat(avgScore);
      let quality = '';
      if (score >= 0.9) quality = '🌟 EXCELLENT';
      else if (score >= 0.8) quality = '✨ GOOD';
      else if (score >= 0.7) quality = '👍 ADEQUATE';
      else if (score >= 0.5) quality = '⚠️  NEEDS IMPROVEMENT';
      else quality = '🚨 POOR';
      
      console.log(`🏆 Quality Rating: ${quality}`);
    }
  }

  showUsage() {
    console.log('Usage:');
    console.log('  node run-evaluation.js <config-name>     # Run specific evaluation');
    console.log('  node run-evaluation.js --list           # List available configurations');
    console.log('  node run-evaluation.js --help           # Show this help');
    console.log('');
    console.log('Options:');
    console.log('  --verbose                                # Show detailed output');
    console.log('  --no-cache                               # Disable caching');
    console.log('  --filter <pattern>                       # Filter test cases');
    console.log('');
    console.log('Examples:');
    console.log('  node run-evaluation.js basic-evaluation');
    console.log('  node run-evaluation.js comprehensive --verbose');
    console.log('  node run-evaluation.js basic-evaluation --filter "greeting"');
  }
}

// CLI interface
async function main() {
  const runner = new EvaluationRunner();
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help')) {
    runner.showUsage();
    return;
  }

  if (args.includes('--list')) {
    runner.listConfigurations();
    return;
  }

  const configName = args[0];
  const options = {
    verbose: args.includes('--verbose'),
    noCache: args.includes('--no-cache'),
    filter: args.includes('--filter') ? args[args.indexOf('--filter') + 1] : null
  };

  try {
    await runner.runEvaluation(configName, options);
  } catch (error) {
    console.error('❌ Evaluation failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { EvaluationRunner };