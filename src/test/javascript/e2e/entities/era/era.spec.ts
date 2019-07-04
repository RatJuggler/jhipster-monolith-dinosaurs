/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EraComponentsPage, EraDeleteDialog, EraUpdatePage } from './era.page-object';

const expect = chai.expect;

describe('Era e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let eraUpdatePage: EraUpdatePage;
    let eraComponentsPage: EraComponentsPage;
    let eraDeleteDialog: EraDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Eras', async () => {
        await navBarPage.goToEntity('era');
        eraComponentsPage = new EraComponentsPage();
        await browser.wait(ec.visibilityOf(eraComponentsPage.title), 5000);
        expect(await eraComponentsPage.getTitle()).to.eq('Eras');
    });

    it('should load create Era page', async () => {
        await eraComponentsPage.clickOnCreateButton();
        eraUpdatePage = new EraUpdatePage();
        expect(await eraUpdatePage.getPageTitle()).to.eq('Create or edit a Era');
        await eraUpdatePage.cancel();
    });

    it('should create and save Eras', async () => {
        const nbButtonsBeforeCreate = await eraComponentsPage.countDeleteButtons();

        await eraComponentsPage.clickOnCreateButton();
        await promise.all([eraUpdatePage.setNameInput('name'), eraUpdatePage.setFromMaInput('5'), eraUpdatePage.setToMaInput('5')]);
        expect(await eraUpdatePage.getNameInput()).to.eq('name');
        expect(await eraUpdatePage.getFromMaInput()).to.eq('5');
        expect(await eraUpdatePage.getToMaInput()).to.eq('5');
        await eraUpdatePage.save();
        expect(await eraUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await eraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Era', async () => {
        const nbButtonsBeforeDelete = await eraComponentsPage.countDeleteButtons();
        await eraComponentsPage.clickOnLastDeleteButton();

        eraDeleteDialog = new EraDeleteDialog();
        expect(await eraDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Era?');
        await eraDeleteDialog.clickOnConfirmButton();

        expect(await eraComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
