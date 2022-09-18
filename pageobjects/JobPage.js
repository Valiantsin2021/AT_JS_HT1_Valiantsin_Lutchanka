const { jobTitle, jobDescription, newJobTitle, newJobDescription } = require('../utils/constants');

const BasePage = require('./BasePage')

class JobPage extends BasePage{
    get header () {
        return $('.orangehrm-main-title')
    }
    get addBtn () {
        return $('.oxd-button')
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
    get successModal () {
        return $('div.oxd-toast-content--success')
    }
    get errorMessage () {
        return $('.oxd-input-field-error-message')
    }
    get gridList () {
        return $$('.oxd-table-card')
    }
    get gridTitle () {
        return $(`//div[text()="${jobTitle}"]`)
    }
    get newGridTitle () {
        return $$(`//div[text()="${newJobTitle}"]`)
    }
    get gridDescription () {
        return $(`//div[text()="${jobDescription}"]`)
    }
    get newGridDescription () {
        return $(`//div[text()="${newJobDescription}"]`)
    }
    get gridParentEl () {
        return $(`//div[text()="${jobTitle}"]/ancestor:: div[@class="oxd-table-row oxd-table-row--with-border"]`)
    }
    get newGridParentEl () {
        return $(`//div[text()="${newJobTitle}"]/ancestor:: div[@class="oxd-table-row oxd-table-row--with-border"]`)
    }
    get checkbox () {
        return this.gridParentEl.$(`span`)
    }
    get modifyBtn () {
        return this.gridParentEl.$(`.oxd-icon.bi-pencil-fill`)
    }
    get newCheckbox () {
        return this.newGridParentEl.$(`span`)
    }
    get newDeleteBtn () {
        return this.newGridParentEl.$(`.oxd-icon.bi-trash`)
    }
    get modalDeleteBtn () {
        return $('.orangehrm-modal-footer .oxd-button--label-danger')
    }
    get logoutMenu () {
        return $('.oxd-userdropdown-icon')
    }
    get logoutDropdown () {
        return $$('.oxd-userdropdown-link')
    }
    async clickAddBtn () {
        await this.addBtn.waitAndClick();
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
    async clickSave () {
        await this.saveBtn.waitAndClick();
    }
    async getGridSize () {
        let length = Promise.resolve(await this.gridList.length);
        return length
    }
    async markCheckbox (checkbox) {
        await checkbox.waitAndClick()
    }
    async clickModify (modifyBtn) {
        await modifyBtn.waitAndClick();
    }
    async deleteJobTitle (deleteBtn) {
        await deleteBtn.waitAndClick();
    }
    async clickModalDelete () {
        await this.modalDeleteBtn.waitAndClick();
    }
    async clearInputValue(input) {
        const inputField = await input;
        await inputField.click();
        await browser.execute((a) => {
            a.value = null
        }, inputField);
    }
    async logout () {
        this.logoutDropdown[3].waitAndClick();
    }
}
module.exports = new JobPage();