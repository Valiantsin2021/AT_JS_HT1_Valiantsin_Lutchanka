const { jobTitle, jobDescription, newJobTitle, newJobDescription } = require('../utils/constants');

const BasePage = require('./BasePage')

class JobPage extends BasePage{
    get header () {
        return $('.orangehrm-main-title')
    }
    get addBtn () {
        return $('.oxd-button')
    }
    get successModal () {
        return $('div.oxd-toast-content--success')
    }
    get tableHeader () {
        return $('span*=Records Found')
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
    get successModal () {
        return $('div.oxd-toast-content--success')
    }
    get checkbox () {
        return this.gridParentEl.$(`span`)
    }
    get modifyBtn () {
        return this.gridParentEl.$(`.oxd-icon.bi-pencil-fill`)
    }
    get deleteBtn () {
        return this.gridParentEl.$(`.oxd-icon.bi-trash`)
    }
    get newCheckbox () {
        return this.newGridParentEl.$(`span`)
    }
    get newDeleteBtn () {
        return this.newGridParentEl.$(`.oxd-icon.bi-trash`)
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
    async logout () {
        this.logoutDropdown[3].waitAndClick();
    }
}
module.exports = new JobPage();