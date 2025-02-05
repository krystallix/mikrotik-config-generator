const readline = require('readline');
const path = require('path');
const { showMainMenu } = require('./menu/mainMenu');

// Configuration
const OUTPUT_PATH = path.join(__dirname, '..', 'output');

// Setup readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Handle program termination
function handleExit() {
    console.log('\nExiting Configuration Generator...');
    rl.close();
    process.exit(0);
}

// Handle errors
process.on('uncaughtException', (error) => {
    console.error('An error occurred:', error);
    handleExit();
});

// Handle CTRL+C
process.on('SIGINT', () => {
    handleExit();
});

// Start the program
function main() {
    console.log('Welcome to Configuration Generator');
    console.log('Version: 1.0.0');
    console.log('=========================================');
    
    showMainMenu(rl, OUTPUT_PATH);
}

// Run the program
main();