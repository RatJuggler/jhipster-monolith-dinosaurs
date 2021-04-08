import { element, by, ElementFinder } from 'protractor';

export class EraComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-era div table .btn-danger'));
  title = element.all(by.css('jhi-era div h2#page-heading span')).first();
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

export class EraUpdatePage {
  pageTitle = element(by.id('jhi-era-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nameInput = element(by.id('field_name'));
  fromMaInput = element(by.id('field_fromMa'));
  toMaInput = element(by.id('field_toMa'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setFromMaInput(fromMa: string): Promise<void> {
    await this.fromMaInput.sendKeys(fromMa);
  }

  async getFromMaInput(): Promise<string> {
    return await this.fromMaInput.getAttribute('value');
  }

  async setToMaInput(toMa: string): Promise<void> {
    await this.toMaInput.sendKeys(toMa);
  }

  async getToMaInput(): Promise<string> {
    return await this.toMaInput.getAttribute('value');
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

export class EraDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-era-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-era'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
