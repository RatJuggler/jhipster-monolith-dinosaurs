import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DinosaurComponentsPage, DinosaurDeleteDialog, DinosaurUpdatePage } from './dinosaur.page-object';

const expect = chai.expect;

describe('Dinosaur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dinosaurComponentsPage: DinosaurComponentsPage;
  let dinosaurUpdatePage: DinosaurUpdatePage;
  let dinosaurDeleteDialog: DinosaurDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Dinosaurs', async () => {
    await navBarPage.goToEntity('dinosaur');
    dinosaurComponentsPage = new DinosaurComponentsPage();
    await browser.wait(ec.visibilityOf(dinosaurComponentsPage.title), 5000);
    expect(await dinosaurComponentsPage.getTitle()).to.eq('Dinosaurs');
    await browser.wait(ec.or(ec.visibilityOf(dinosaurComponentsPage.entities), ec.visibilityOf(dinosaurComponentsPage.noResult)), 1000);
  });

  it('should load create Dinosaur page', async () => {
    await dinosaurComponentsPage.clickOnCreateButton();
    dinosaurUpdatePage = new DinosaurUpdatePage();
    expect(await dinosaurUpdatePage.getPageTitle()).to.eq('Create or edit a Dinosaur');
    await dinosaurUpdatePage.cancel();
  });

  it('should create and save Dinosaurs', async () => {
    const nbButtonsBeforeCreate = await dinosaurComponentsPage.countDeleteButtons();

    await dinosaurComponentsPage.clickOnCreateButton();

    await promise.all([
      dinosaurUpdatePage.setNameInput('name'),
      dinosaurUpdatePage.setWeightInput('5'),
      dinosaurUpdatePage.setLengthInput('5'),
      dinosaurUpdatePage.dietSelectLastOption(),
      dinosaurUpdatePage.setInsertDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      dinosaurUpdatePage.setModifiedDtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      dinosaurUpdatePage.eraSelectLastOption(),
      dinosaurUpdatePage.cladeSelectLastOption(),
    ]);

    expect(await dinosaurUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await dinosaurUpdatePage.getWeightInput()).to.eq('5', 'Expected weight value to be equals to 5');
    expect(await dinosaurUpdatePage.getLengthInput()).to.eq('5', 'Expected length value to be equals to 5');
    expect(await dinosaurUpdatePage.getInsertDtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected insertDt value to be equals to 2000-12-31'
    );
    expect(await dinosaurUpdatePage.getModifiedDtInput()).to.contain(
      '2001-01-01T02:30',
      'Expected modifiedDt value to be equals to 2000-12-31'
    );

    await dinosaurUpdatePage.save();
    expect(await dinosaurUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dinosaurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Dinosaur', async () => {
    const nbButtonsBeforeDelete = await dinosaurComponentsPage.countDeleteButtons();
    await dinosaurComponentsPage.clickOnLastDeleteButton();

    dinosaurDeleteDialog = new DinosaurDeleteDialog();
    expect(await dinosaurDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Dinosaur?');
    await dinosaurDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(dinosaurComponentsPage.title), 5000);

    expect(await dinosaurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
