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
   it(`Should check the impossibility to login with invalid username and valid password`, async () => {
        for(let i = 0; i < negativeLogin.length; i++) {
            await LoginPage.login(negativeLogin[i], pass);
            await expect(LoginPage.invalidAlert).toBeDisplayed();
        }
    });
    it(`Should check the impossibility to login with valid username and invalid password`, async () => {
        for(let i = 0; i < negativePass.length; i++) {
            await LoginPage.login(login, negativePass[i]);
            await expect(LoginPage.invalidAlert).toBeDisplayed();
        }
    });
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