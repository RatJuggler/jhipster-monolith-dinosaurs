/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CladeComponentsPage, CladeDeleteDialog, CladeUpdatePage } from './clade.page-object';

const expect = chai.expect;

describe('Clade e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let cladeUpdatePage: CladeUpdatePage;
    let cladeComponentsPage: CladeComponentsPage;
    let cladeDeleteDialog: CladeDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Clades', async () => {
        await navBarPage.goToEntity('clade');
        cladeComponentsPage = new CladeComponentsPage();
        await browser.wait(ec.visibilityOf(cladeComponentsPage.title), 5000);
        expect(await cladeComponentsPage.getTitle()).to.eq('Clades');
    });

    it('should load create Clade page', async () => {
        await cladeComponentsPage.clickOnCreateButton();
        cladeUpdatePage = new CladeUpdatePage();
        expect(await cladeUpdatePage.getPageTitle()).to.eq('Create or edit a Clade');
        await cladeUpdatePage.cancel();
    });

    it('should create and save Clades', async () => {
        const nbButtonsBeforeCreate = await cladeComponentsPage.countDeleteButtons();

        await cladeComponentsPage.clickOnCreateButton();
        await promise.all([cladeUpdatePage.setDescriptionInput('description')]);
        expect(await cladeUpdatePage.getDescriptionInput()).to.eq('description');
        await cladeUpdatePage.save();
        expect(await cladeUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await cladeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Clade', async () => {
        const nbButtonsBeforeDelete = await cladeComponentsPage.countDeleteButtons();
        await cladeComponentsPage.clickOnLastDeleteButton();

        cladeDeleteDialog = new CladeDeleteDialog();
        expect(await cladeDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Clade?');
        await cladeDeleteDialog.clickOnConfirmButton();

        expect(await cladeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
