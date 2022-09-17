const JobPage = require('../pageobjects/JobPage');
const LoginPage = require('../pageobjects/LoginPage');
const { baseUrl, title, loginHeader, login, pass, negativeLogin, negativePass } = require('../utils/constants');


describe(`Should login to ${baseUrl}, create new job, change it and delete it`, () => {
    beforeEach( async function () {
        await LoginPage.open();
        await LoginPage.maximize();
        expect(browser).toHaveTitle(title);
        await expect(LoginPage.header).toHaveText(loginHeader);
        await expect(LoginPage.loginInput).toHaveValue('');
        await expect(LoginPage.passInput).toHaveValue('');
    });    
   it(`should open ${baseUrl} and check title and page header and try login with wrong username and valid password`, async () => {
        for(let i = 0; i < negativeLogin.length; i++) {
            await LoginPage.login(negativeLogin[i], pass);
            await expect(LoginPage.invalidAlert).toBeDisplayed();
        }
    });
    it(`should open ${baseUrl} and check title and page header and try login with valid username and wrong password`, async () => {
        for(let i = 0; i < negativePass.length; i++) {
            await LoginPage.login(login, negativePass[i]);
            await expect(LoginPage.invalidAlert).toBeDisplayed();
        }
    });
    it(`should open ${baseUrl} and check title and page header and try login with missing username and valid password`, async () => {
        await LoginPage.login('', pass);
        await expect(LoginPage.inputAlert).toBeDisplayed();
    });
    it(`should open ${baseUrl} and check title and page header and try login with valid username and missing password`, async () => {
        await LoginPage.login(login, '');
        await expect(LoginPage.inputAlert).toBeDisplayed();
    });
    it(`should open ${baseUrl} and check title and page header and try login with missing username and missing password`, async () => {
        await LoginPage.login('', '');
        await expect(LoginPage.inputAlert).toBeDisplayed();
    });
});