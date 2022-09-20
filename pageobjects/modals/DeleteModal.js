const BasePage = require('../BasePage');

class DeleteModal extends BasePage {
    get modalDeleteBtn () {
        return $('.orangehrm-modal-footer .oxd-button--label-danger')
    }
    async clickModalDelete () {
        await this.modalDeleteBtn.waitAndClick();
    }
}

module.exports = new DeleteModal();