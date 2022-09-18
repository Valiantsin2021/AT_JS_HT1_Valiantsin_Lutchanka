const allure = require('allure-commandline');
const brows = require('./utils/browsers.js')
const ENV = process.env.ENV
if(!ENV || !['chrome', 'edge', 'firefox'].includes(ENV)){
    console.log('Please add ENV and run with "npm run clean && npx cross-env ENV=(chrome | edge | firefox) npm run wdio -- --suite (e2e | negative)"')
    process.exit()
}

exports.config = {
   
    specs: [
        './test/*.js'
    ],
    suites: {
        e2e: ['./test/*.e2e.js'],
        negative: ['./test/*.negative.js']
    },
    maxInstances: 2,
    
    capabilities: [brows[process.env.ENV]],
    
    logLevel: 'info',
    
    bail: 1,
    
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',
    
    waitforTimeout: 20000,
    
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
   
    services: ['selenium-standalone'],
    
    framework: 'mocha',
    specFileRetries: 2,
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
