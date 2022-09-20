const BasePage = require('./BasePage');

class EditTitlePage extends BasePage {
    get header () {
        return $('.orangehrm-main-title')
    }
    get jobTitleInput () {
        return $('div.oxd-input-field-bottom-space :nth-child(2) input.oxd-input')
    }
    get jobDescriptionInput () {
        return $('[placeholder="Type description here"]')
    }
    get saveBtn () {
        return $('button[type="submit"]')
    }
    get successModal () {
        return $('div.oxd-toast-content--success')
    }
    async inputJobTitle (jobTitle) {
        await this.jobTitleInput.waitAndSetValue(jobTitle);
    }
    async inputJobDescription (jobDescription) {
        await this.jobDescriptionInput.waitAndSetValue(jobDescription);
    }
    async clickSave () {
        await this.saveBtn.waitAndClick();
    }
    async clearInputValue(input) {
        const inputField = await input;
        await inputField.click();
        await browser.execute((a) => {
            a.value = null
        }, inputField);
    }
}

module.exports = new EditTitlePage()