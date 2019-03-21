import { element, by, ElementFinder } from 'protractor';

export class EraComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-era div table .btn-danger'));
    title = element.all(by.css('jhi-era div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class EraUpdatePage {
    pageTitle = element(by.id('jhi-era-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    fromMaInput = element(by.id('field_fromMa'));
    toMaInput = element(by.id('field_toMa'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setFromMaInput(fromMa) {
        await this.fromMaInput.sendKeys(fromMa);
    }

    async getFromMaInput() {
        return this.fromMaInput.getAttribute('value');
    }

    async setToMaInput(toMa) {
        await this.toMaInput.sendKeys(toMa);
    }

    async getToMaInput() {
        return this.toMaInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class EraDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-era-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-era'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
