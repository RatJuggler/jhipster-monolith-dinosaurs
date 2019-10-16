import { element, by, ElementFinder } from 'protractor';

export class DinosaurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-dinosaur div table .btn-danger'));
  title = element.all(by.css('jhi-dinosaur div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
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
    return await this.nameInput.getAttribute('value');
  }

  async setWeightInput(weight) {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput() {
    return await this.weightInput.getAttribute('value');
  }

  async setLengthInput(length) {
    await this.lengthInput.sendKeys(length);
  }

  async getLengthInput() {
    return await this.lengthInput.getAttribute('value');
  }

  async setDietSelect(diet) {
    await this.dietSelect.sendKeys(diet);
  }

  async getDietSelect() {
    return await this.dietSelect.element(by.css('option:checked')).getText();
  }

  async dietSelectLastOption(timeout?: number) {
    await this.dietSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setInsertDtInput(insertDt) {
    await this.insertDtInput.sendKeys(insertDt);
  }

  async getInsertDtInput() {
    return await this.insertDtInput.getAttribute('value');
  }

  async setModifiedDtInput(modifiedDt) {
    await this.modifiedDtInput.sendKeys(modifiedDt);
  }

  async getModifiedDtInput() {
    return await this.modifiedDtInput.getAttribute('value');
  }

  async eraSelectLastOption(timeout?: number) {
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
    return await this.eraSelect.element(by.css('option:checked')).getText();
  }

  async cladeSelectLastOption(timeout?: number) {
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
    return await this.cladeSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
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

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
