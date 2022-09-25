const BasePage = require('./BasePage');

class AddTitlePage extends BasePage {
    get header () {
        return $('.orangehrm-main-title')
    }
    get jobTitleInput () {
        return $('div.oxd-input-field-bottom-space :nth-child(2) input.oxd-input')
    }
    get jobDescriptionInput () {
        return $('[placeholder="Type description here"]')
    }
    get noteInput () {
        return $('[placeholder="Add note"]')
    }
    get saveBtn () {
        return $('button[type="submit"]')
    }
    get errorMessage () {
        return $('.oxd-input-field-error-message')
    }
    async clickSave () {
        await this.saveBtn.waitAndClick();
    }
    async inputJobTitle (jobTitle) {
        await this.jobTitleInput.waitAndSetValue(jobTitle);
    }
    async inputJobDescription (jobDescription) {
        await this.jobDescriptionInput.waitAndSetValue(jobDescription);
    }
    async inputNote (jobNote) {
        await this.noteInput.waitAndSetValue(jobNote);
    }
}
module.exports = new AddTitlePage();