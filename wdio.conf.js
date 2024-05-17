// wdio.conf.js
exports.config = {
    runner: 'local',
    port: 4723, // Appium port
    path: '/wd/hub',
    services: ['appium'],
    capabilities: [{
        platformName: 'iOS',
        platformVersion: '14.5',
        deviceName: 'iPhone Simulator',
        app: 'path/to/your/app',
        automationName: 'XCUITest',
        // Add any other desired capabilities
    }],
    // Add other configuration options as needed
};
