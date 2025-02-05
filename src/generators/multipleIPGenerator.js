const fs = require('fs');
const path = require('path');
const { getCurrentUTCDateTime, getDateFormatted } = require('../utils/dateUtils');
const { ensureDirectoryExists } = require('../utils/fileUtils');

function generateBatchFileForDevice(device, currentTime) {
    let contents = [];
    
    // Header batch file
    contents.push(`@echo off`);
    contents.push(`:: ========================================`);
    contents.push(`:: Multiple IP Address Configuration Script`);
    contents.push(`:: ${currentTime}`);
    contents.push(`:: krystallix`);
    contents.push(`:: Device: ${device.identifier}`);
    contents.push(`:: ========================================`);
    contents.push('');
    
  

    // Get DHCP first
    contents.push(`:: Enable DHCP for both networks`);
    contents.push(`netsh interface ipv4 set address name="Network 17" source=dhcp`);
    contents.push(`netsh interface ipv4 set address name="Network 18" source=dhcp`);
    contents.push('');
    
    // Network 17 Configuration
    const net17 = device["Network 17"];
    contents.push(`:: Network 17 Configuration`);
    contents.push(`:: Interface: ${net17.name}`);
    contents.push(`:: IP Range: ${net17.start} - ${net17.end}`);
    contents.push(`:: Subnet Mask: ${net17.subnetmask}`);
    contents.push(`:: Gateway: 172.17.1.254`);
    
    // Extract start and end IP numbers
    const startIP17 = net17.start.split('.')[3];
    const endIP17 = net17.end.split('.')[3];
    const baseIP17 = net17.start.split('.').slice(0, 3).join('.');
    
    contents.push(`echo Configuring Network 17 IPs for ${device.identifier}...`);
    contents.push(`FOR /L %%A IN (${startIP17},1,${endIP17}) DO (`);
    contents.push(`    echo Adding IP: ${baseIP17}.%%A`);
    contents.push(`    netsh interface ipv4 add address "${net17.name}" ${baseIP17}.%%A ${net17.subnetmask}`);
    contents.push(`)`);
    contents.push('');

    // Network 18 Configuration
    const net18 = device["Network 18"];
    contents.push(`:: Network 18 Configuration`);
    contents.push(`:: Interface: ${net18.name}`);
    contents.push(`:: IP Range: ${net18.start} - ${net18.end}`);
    contents.push(`:: Subnet Mask: ${net18.subnetmask}`);
    contents.push(`:: Gateway: 172.18.1.254`);
    
    // Extract start and end IP numbers
    const startIP18 = net18.start.split('.')[3];
    const endIP18 = net18.end.split('.')[3];
    const baseIP18 = net18.start.split('.').slice(0, 3).join('.');
    
    contents.push(`echo Configuring Network 18 IPs for ${device.identifier}...`);
    contents.push(`FOR /L %%A IN (${startIP18},1,${endIP18}) DO (`);
    contents.push(`    echo Adding IP: ${baseIP18}.%%A`);
    contents.push(`    netsh interface ipv4 add address "${net18.name}" ${baseIP18}.%%A ${net18.subnetmask}`);
    contents.push(`)`);
    contents.push('');

    // Footer
    contents.push(`:: ========================================`);
    contents.push(`echo Configuration completed for ${device.identifier}!`);
    contents.push(`echo Press any key to exit...`);
    contents.push('pause > nul');
    
    return contents.join('\n');
}

function handleMultipleIPGeneration(readline, OUTPUT_PATH, showMainMenu) {
    console.log('\nPlease paste your JSON configuration below and press Enter twice to process:');
    let jsonInput = '';

    const rlJson = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rlJson.on('line', (line) => {
        if (line.trim()) {
            jsonInput += line + '\n';
        } else {
            try {
                const configs = JSON.parse(jsonInput);
                const currentTime = getCurrentUTCDateTime();
                
                // Create a directory for this batch of files
                const batchDir = path.join(OUTPUT_PATH, `multiple-ip-cli-${getDateFormatted()}`);
                ensureDirectoryExists(batchDir);

                // Generate a separate batch file for each device
                configs.forEach(device => {
                    const fileName = `${device.identifier.replace(/\s+/g, '-')}.bat`;
                    const fullPath = path.join(batchDir, fileName);
                    
                    const content = generateBatchFileForDevice(device, currentTime);
                    fs.writeFileSync(fullPath, content);
                });

                console.log(`\nSuccess! Files generated in: ${batchDir}`);
                console.log('Generated files:');
                configs.forEach(device => {
                    console.log(`- ${device.identifier.replace(/\s+/g, '-')}.bat`);
                });

                rlJson.close();
                showMainMenu();
            } catch (error) {
                console.error('\nError: Invalid JSON format. Please try again.');
                jsonInput = '';
                rlJson.close();
                showMainMenu();
            }
        }
    });
}

module.exports = {
    handleMultipleIPGeneration
};