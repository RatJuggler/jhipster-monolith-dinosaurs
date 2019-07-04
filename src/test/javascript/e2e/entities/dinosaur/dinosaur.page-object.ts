import { element, by, ElementFinder } from 'protractor';

export class DinosaurComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-dinosaur div table .btn-danger'));
    title = element.all(by.css('jhi-dinosaur div h2#page-heading span')).first();

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

export class DinosaurUpdatePage {
    pageTitle = element(by.id('jhi-dinosaur-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    weightInput = element(by.id('field_weight'));
    lengthInput = element(by.id('field_length'));
    dietSelect = element(by.id('field_diet'));
    insertDtInput = element(by.id('field_insertDt'));
    modifiedDtInput = element(by.id('field_modifiedDt'));
    eraSelect = element(by.id('field_era'));
    cladeSelect = element(by.id('field_clade'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setWeightInput(weight) {
        await this.weightInput.sendKeys(weight);
    }

    async getWeightInput() {
        return this.weightInput.getAttribute('value');
    }

    async setLengthInput(length) {
        await this.lengthInput.sendKeys(length);
    }

    async getLengthInput() {
        return this.lengthInput.getAttribute('value');
    }

    async setDietSelect(diet) {
        await this.dietSelect.sendKeys(diet);
    }

    async getDietSelect() {
        return this.dietSelect.element(by.css('option:checked')).getText();
    }

    async dietSelectLastOption() {
        await this.dietSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async setInsertDtInput(insertDt) {
        await this.insertDtInput.sendKeys(insertDt);
    }

    async getInsertDtInput() {
        return this.insertDtInput.getAttribute('value');
    }

    async setModifiedDtInput(modifiedDt) {
        await this.modifiedDtInput.sendKeys(modifiedDt);
    }

    async getModifiedDtInput() {
        return this.modifiedDtInput.getAttribute('value');
    }

    async eraSelectLastOption() {
        await this.eraSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async eraSelectOption(option) {
        await this.eraSelect.sendKeys(option);
    }

    getEraSelect(): ElementFinder {
        return this.eraSelect;
    }

    async getEraSelectedOption() {
        return this.eraSelect.element(by.css('option:checked')).getText();
    }

    async cladeSelectLastOption() {
        await this.cladeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async cladeSelectOption(option) {
        await this.cladeSelect.sendKeys(option);
    }

    getCladeSelect(): ElementFinder {
        return this.cladeSelect;
    }

    async getCladeSelectedOption() {
        return this.cladeSelect.element(by.css('option:checked')).getText();
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

export class DinosaurDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-dinosaur-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-dinosaur'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
