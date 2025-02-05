@echo off
:: ========================================
:: Multiple IP Address Configuration Script
:: 2025-02-04 10:09:12
:: krystallix
:: Device: LAPTOP 61
:: ========================================

:: Enable DHCP for both networks
netsh interface ipv4 set address name="Network 17" source=dhcp
netsh interface ipv4 set address name="Network 18" source=dhcp

:: Network 17 Configuration
:: Interface: Network 17
:: IP Range: 172.17.1.123 - 172.17.1.183
:: Subnet Mask: 255.255.252.0
:: Gateway: 172.17.1.254
echo Configuring Network 17 IPs for LAPTOP 61...
FOR /L %%A IN (123,1,183) DO (
    echo Adding IP: 172.17.1.%%A
    netsh interface ipv4 add address "Network 17" 172.17.1.%%A 255.255.252.0
)

:: Network 18 Configuration
:: Interface: Network 18
:: IP Range: 172.18.1.123 - 172.18.1.183
:: Subnet Mask: 255.255.252.0
:: Gateway: 172.18.1.254
echo Configuring Network 18 IPs for LAPTOP 61...
FOR /L %%A IN (123,1,183) DO (
    echo Adding IP: 172.18.1.%%A
    netsh interface ipv4 add address "Network 18" 172.18.1.%%A 255.255.252.0
)

:: ========================================
echo Configuration completed for LAPTOP 61!
echo Press any key to exit...
pause > nul