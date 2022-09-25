const BasePage = require('../BasePage');

class SuccessModal extends BasePage {
    get successModal () {
        return $('div.oxd-toast-content--success')
    }
    get successText () {
        return this.successModal.$('p.oxd-text--toast-title')
    }
}

module.exports = new SuccessModal();