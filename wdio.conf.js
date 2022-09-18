const allure = require('allure-commandline');

exports.config = {
   
    specs: [
        './test/*.js'
    ],
    suites: {
        e2e: ['./test/*.e2e.js'],
        negative: ['./test/*.negative.js']
    },
    maxInstances: 3,
    
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true
        },
    ],
    
    logLevel: 'info',
    
    bail: 0,
    
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    
    waitforTimeout: 20000,
    
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
   
    services: ['selenium-standalone'],
    
    framework: 'mocha',
   
    reporters: ['spec', 
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
    }],
    ],  

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    beforeSuite: function () {
        browser.addCommand('waitAndClick', async function () {
            await this.waitForDisplayed()
            await this.click()
        }, true),
        browser.addCommand('waitAndSetValue', async function (value) {
            await this.waitForDisplayed()
            await this.setValue(value)
        }, true)
    },
    
    afterTest: async function (step, scenario, { error}) {
        if (error) {
            const timestamp = new Date().toString().replace(/[^\w]/g, '');
            await browser.saveScreenshot(`./screenshots/failed-tests/test_failed${timestamp}.png`)
            await browser.takeScreenshot()
        }
    },

    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                10000)
            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)
                if (exitCode !== 0) {
                    return reject(reportError)
                }
                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
}
