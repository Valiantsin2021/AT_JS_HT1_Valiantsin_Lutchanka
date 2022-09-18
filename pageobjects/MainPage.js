const BasePage = require('./BasePage');

class MainPage extends BasePage{

    get menuList () {
        return $('.oxd-main-menu');
    }
    get sideMenu () {
        return $$('span.oxd-main-menu-item--name')
    }
    get profileImg () {
        return $('.oxd-userdropdown-img')
    }
    get header () {
        return $('h6.oxd-topbar-header-breadcrumb-module')
    }
    async clickAdmin () {
        await this.sideMenu[0].waitAndClick()
    }
}
module.exports = new MainPage();