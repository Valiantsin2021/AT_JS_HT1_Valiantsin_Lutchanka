const LoginPage = require('../pageobjects/LoginPage');
const { baseUrl, title, loginHeader, login, pass, negativeLogin, negativePass } = require('../utils/constants');

describe(`Should open ${baseUrl} and check impossibility to login with invalid or blank credentials`, () => {
    beforeEach( async function () {
        await LoginPage.maximize();
        await LoginPage.open();
        expect(browser).toHaveTitle(title);
        await expect(LoginPage.header).toHaveText(loginHeader);
        await expect(LoginPage.loginInput).toHaveValue('');
        await expect(LoginPage.passInput).toHaveValue('');
    });
    afterEach( async () => {
        await browser.deleteCookies();
    })
    for(let el of negativeLogin) {
        it(`Should check the impossibility to login with invalid username equal to "${el}" and valid password`, async () => {
            await LoginPage.login(el, pass);
            await expect(LoginPage.invalidAlert).toBeDisplayed();
        })
    }
    for(let el of negativePass) {
        it(`Should check the impossibility to login with valid username and valid password equal to "${el}"`, async () => {
            await LoginPage.login(el, pass);
            await expect(LoginPage.invalidAlert).toBeDisplayed();
        })
    }
    it(`Should check the impossibility to login with missing username and valid password`, async () => {
        await LoginPage.login('', pass);
        await expect(LoginPage.inputAlert).toBeDisplayed();
    });
    it(`Should check the impossibility to login with valid username and missing password`, async () => {
        await LoginPage.login(login, '');
        await expect(LoginPage.inputAlert).toBeDisplayed();
    });
    it(`Should check the impossibility to login with missing username and missing password`, async () => {
        await LoginPage.login('', '');
        await expect(LoginPage.inputAlert).toBeDisplayed();
    });
});