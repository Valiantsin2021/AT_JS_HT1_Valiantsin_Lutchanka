const BasePage = require('./BasePage');

class AdminPage extends BasePage{
    get header () {
        return $('h6.oxd-topbar-header-breadcrumb-module')
    }
    get topMenu () {
        return $$('.oxd-topbar-body-nav-tab')
    }
    get jobTitlesDropdown () {
        return $$('.oxd-dropdown-menu a')
    }
    get jobTitlesMenu () {
        return this.jobTitlesDropdown[0]
    }
    async clickJob () {
        await this.topMenu[1].waitAndClick();
    }
    async clickJobTitles () {
        await this.jobTitlesMenu.waitAndClick();
    }
}
module.exports = new AdminPage();