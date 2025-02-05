const { handleAddressListGeneration } = require('../generators/addressListGenerator');
const { handleL2TPClientGeneration } = require('../generators/l2tpGenerator');
const { handleMangleGeneration } = require('../generators/mangleGenerator');
const { handleNATFirewallGeneration } = require('../generators/natFirewallGenerator');
const { handleRouteGeneration } = require('../generators/routeGenerator');
const { handleRouteROS6Generation } = require('../generators/routeROS6Generator');
const { handleRouteTableGeneration } = require('../generators/routeTableGenerator');
const { handleVPNProfileGeneration } = require('../generators/vpnProfileGenerator');
const { getCurrentUTCDateTime } = require('../utils/dateUtils');
const { handleMultipleIPGeneration } = require('../generators/multipleIPGenerator');

function displayHeader() {
    const currentTime = getCurrentUTCDateTime();
    console.log('\n=== Configuration Generator Menu ===');
    console.log(`Current Date and Time: ${currentTime}`);
    console.log('Current User\'s Login: krystallix');
    console.log('===================================');
}

function displayOptions() {
    console.log('1. Address List');
    console.log('2. L2TP Client');
    console.log('3. Mangle');
    console.log('4. NAT Firewall');
    console.log('5. Route (RouterOS 7)');
    console.log('6. Route (RouterOS 6)');
    console.log('7. Route Table (RouterOS 7)');
    console.log('8. VPN Profile');
    console.log('===== Network Configuration =====');
    console.log('9. Multiple IP CLI Generator');
    console.log('0. Exit');
    console.log('===================================');
}

function showMainMenu(readline, OUTPUT_PATH) {
    displayHeader();
    displayOptions();

    readline.question('Select an option (0-8): ', (choice) => {
        switch (choice) {
            case '1':
                console.log('\n--- Address List Generator ---');
                handleAddressListGeneration(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '2':
                console.log('\n--- L2TP Client Generator ---');
                handleL2TPClientGeneration(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '3':
                console.log('\n--- Mangle Generator ---');
                handleMangleGeneration(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '4':
                console.log('\n--- NAT Firewall Generator ---');
                handleNATFirewallGeneration(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '5':
                console.log('\n--- Route Generator (RouterOS 7) ---');
                handleRouteGeneration(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '6':
                console.log('\n--- Route Generator (RouterOS 6) ---');
                handleRouteROS6Generation(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '7':
                console.log('\n--- Route Table Generator ---');
                handleRouteTableGeneration(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '8':
                console.log('\n--- VPN Profile Generator ---');
                handleVPNProfileGeneration(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '9':
                console.log('\n--- Multiple IP CLI Generator ---');
                handleMultipleIPGeneration(readline, OUTPUT_PATH, () => showMainMenu(readline, OUTPUT_PATH));
                break;
            case '0':
                console.log('\nThank you for using the Configuration Generator!');
                readline.close();
                process.exit(0);
                break;
            default:
                console.log('\nInvalid option. Please try again.');
                showMainMenu(readline, OUTPUT_PATH);
                break;
        }
    });
}

module.exports = {
    showMainMenu
};