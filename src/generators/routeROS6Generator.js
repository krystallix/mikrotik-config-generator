const fs = require('fs');
const path = require('path');
const { getCurrentUTCDateTime, getDateFormatted } = require('../utils/dateUtils');
const { ensureDirectoryExists } = require('../utils/fileUtils');

function generateRouteROS6Configs(startNumber, count) {
    let contents = [];
    
    contents.push(`# Generated on: ${getCurrentUTCDateTime()}`);
    contents.push(`# Generated by: krystallix`);
    contents.push('');
    contents.push('/ip route');

    for (let i = 0; i < count; i++) {
        const currentNumber = startNumber + i;
        contents.push(`add gateway=VPN-${currentNumber} routing-mark=VPN-${currentNumber}`);
    }

    return contents.join('\n');
}

function handleRouteROS6Generation(readline, OUTPUT_PATH, showMainMenu) {
    readline.question('Enter starting number: ', (startNum) => {
        readline.question('Enter how many configurations to generate: ', (count) => {
            try {
                ensureDirectoryExists(OUTPUT_PATH);
                const fileName = `route-ros6-${getDateFormatted()}.txt`;
                const fullPath = path.join(OUTPUT_PATH, fileName);

                const content = generateRouteROS6Configs(parseInt(startNum), parseInt(count));
                fs.writeFileSync(fullPath, content);

                console.log(`\nSuccess! File generated: ${fullPath}`);
                console.log(`Generated ${count} Route configurations (RouterOS 6) starting from VPN-${startNum}`);
            } catch (error) {
                console.error('Error:', error.message);
            }
            showMainMenu();
        });
    });
}

module.exports = {
    generateRouteROS6Configs,
    handleRouteROS6Generation
};