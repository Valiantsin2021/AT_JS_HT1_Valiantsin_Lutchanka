const BasePage = require('./BasePage');

class LoginPage extends BasePage{
    
    get loginInput () {
        return $('[name="username"]')
    }
    get passInput () {
        return $('[type="password"]')
    }
    get loginBtn () {
        return $('[type="submit"]')
    }
    get header () {
        return $('.orangehrm-login-title')
    }
    get invalidAlert () {
        return $('.oxd-alert-content-text')
    }
    get inputAlert () {
        return $('.oxd-input-field-error-message')
    }
    async open () {
        await super.open(`/`);
    }
    async maximize() {
        await super.maximize();
    }
    async login (login, pass) {
        await this.loginInput.waitAndSetValue(login);
        await this.passInput.waitAndSetValue(pass);
        await this.loginBtn.waitAndClick();
    }
}
module.exports = new LoginPage();