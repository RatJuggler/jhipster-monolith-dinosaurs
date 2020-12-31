import { element, by, ElementFinder } from 'protractor';

export class DinosaurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-dinosaur div table .btn-danger'));
  title = element.all(by.css('jhi-dinosaur div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
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

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setWeightInput(weight: string): Promise<void> {
    await this.weightInput.sendKeys(weight);
  }

  async getWeightInput(): Promise<string> {
    return await this.weightInput.getAttribute('value');
  }

  async setLengthInput(length: string): Promise<void> {
    await this.lengthInput.sendKeys(length);
  }

  async getLengthInput(): Promise<string> {
    return await this.lengthInput.getAttribute('value');
  }

  async setDietSelect(diet: string): Promise<void> {
    await this.dietSelect.sendKeys(diet);
  }

  async getDietSelect(): Promise<string> {
    return await this.dietSelect.element(by.css('option:checked')).getText();
  }

  async dietSelectLastOption(): Promise<void> {
    await this.dietSelect.all(by.tagName('option')).last().click();
  }

  async setInsertDtInput(insertDt: string): Promise<void> {
    await this.insertDtInput.sendKeys(insertDt);
  }

  async getInsertDtInput(): Promise<string> {
    return await this.insertDtInput.getAttribute('value');
  }

  async setModifiedDtInput(modifiedDt: string): Promise<void> {
    await this.modifiedDtInput.sendKeys(modifiedDt);
  }

  async getModifiedDtInput(): Promise<string> {
    return await this.modifiedDtInput.getAttribute('value');
  }

  async eraSelectLastOption(): Promise<void> {
    await this.eraSelect.all(by.tagName('option')).last().click();
  }

  async eraSelectOption(option: string): Promise<void> {
    await this.eraSelect.sendKeys(option);
  }

  getEraSelect(): ElementFinder {
    return this.eraSelect;
  }

  async getEraSelectedOption(): Promise<string> {
    return await this.eraSelect.element(by.css('option:checked')).getText();
  }

  async cladeSelectLastOption(): Promise<void> {
    await this.cladeSelect.all(by.tagName('option')).last().click();
  }

  async cladeSelectOption(option: string): Promise<void> {
    await this.cladeSelect.sendKeys(option);
  }

  getCladeSelect(): ElementFinder {
    return this.cladeSelect;
  }

  async getCladeSelectedOption(): Promise<string> {
    return await this.cladeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class DinosaurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-dinosaur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-dinosaur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
