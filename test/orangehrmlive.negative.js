const LoginPage = require('../pageobjects/LoginPage');
const { baseUrl } = require('../utils/constants');
const { login, pass, negativeLogin, negativePass } = require('../utils/credentials.js');

describe(`Should open ${baseUrl} and check impossibility to login with invalid or blank credentials`, () => {
    beforeEach( async function () {
        await LoginPage.maximize();
        await LoginPage.open();
        await LoginPage.loginInput.waitAndCheckValue();
        await LoginPage.passInput.waitAndCheckValue();
    });
    afterEach( async () => {
        await browser.deleteCookies();
    })
    for(let el of negativeLogin) {
        it(`Should check the impossibility to login with invalid username equal to "${el}" and valid password`, async () => {
            console.info(`Check the impossibility to login with invalid username equal to "${el}" and valid password`);
            await LoginPage.login(el, pass);
            await expect(LoginPage.invalidAlert).toBeDisplayed({ message: 'Alert is not displayed!'});
        })
    }
    for(let el of negativePass) {
        it(`Should check the impossibility to login with valid username and invalid password equal to "${el}"`, async () => {
            console.info(`Check the impossibility to login with valid username and invalid password equal to "${el}"`);
            await LoginPage.login(el, pass);
            await expect(LoginPage.invalidAlert).toBeDisplayed({ message: 'Alert is not displayed!'});
        })
    }
    it(`Should check the impossibility to login with missing username and valid password`, async () => {
        console.info(`Check the impossibility to login with missing username and valid password`);
        await LoginPage.login('', pass);
        await expect(LoginPage.inputAlert).toBeDisplayed({ message: 'Alert is not displayed!'});
    });
    it(`Should check the impossibility to login with valid username and missing password`, async () => {
        console.info(`Check the impossibility to login with valid username and missing password`);
        await LoginPage.login(login, '');
        await expect(LoginPage.inputAlert).toBeDisplayed({ message: 'Alert is not displayed!'});
    });
    it(`Should check the impossibility to login with missing username and missing password`, async () => {
        console.info(`Check the impossibility to login with missing username and missing password`);
        await LoginPage.login('', '');
        await expect(LoginPage.inputAlert).toBeDisplayed({ message: 'Alert is not displayed!'});
    });
});