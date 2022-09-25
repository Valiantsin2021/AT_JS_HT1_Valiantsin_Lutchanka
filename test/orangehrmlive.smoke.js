const AddTitlePage = require('../pageobjects/AddTitlePage');
const AdminPage = require('../pageobjects/AdminPage');
const DeleteModal = require('../pageobjects/modals/DeleteModal');
const SuccessModal = require('../pageobjects/modals/SuccessModal');
const JobPage = require('../pageobjects/JobPage');
const LoginPage = require('../pageobjects/LoginPage');
const MainPage = require('../pageobjects/MainPage');
const expectChai = require('chai').expect;
const { baseUrl, saveUrl, jobTitle, jobDescription, jobNote, jobHeaderAdd, errorMsg, loginHeader } = require('../utils/constants');
const { login, pass } = require('../utils/credentials.js');

describe(`Should login to ${baseUrl}, succesfully create new job, try to create the same Job Title again and logout`, () => {
    before( async () => {
        await browser.deleteCookies();
    })
    it(`Should open ${baseUrl} navigate to Job Page, click on Add button and check the page title url contains "${saveUrl}"`, async () => {
        console.info('Check the Job Page url');
        await LoginPage.maximize();
        await LoginPage.open();
        await LoginPage.login(login, pass);
        await MainPage.clickAdmin();
        await AdminPage.clickJob();
        await AdminPage.clickJobTitles();
        await JobPage.clickAddBtn();
        expect(browser).toHaveUrlContaining(saveUrl, { message: 'Url does not match!'});
    })
    it(`Should check the Add Title Page header text is "${jobHeaderAdd}"`, async () => {
        console.info('Check the Add Title Page header text');
        const header = await AddTitlePage.header.waitAndGetText();
        expectChai(header).to.eq(jobHeaderAdd);
    })
    it(`Should check the Job Title input doesnt have any value`, async () => {
        console.info('Check the Job Title input doesnt have any value');
        const jobTitleInput = await AddTitlePage.jobTitleInput.waitAndGetText();
        expectChai(jobTitleInput).to.eq('');
    })
    it(`Should input "${jobTitle}" and check the value of input field`, async () => {
        console.info('Check the Job Title input value after input');
        await AddTitlePage.inputJobTitle(jobTitle);
        const jobTitleInput = await AddTitlePage.jobTitleInput.waitAndGetText();
        expectChai(jobTitleInput).to.eq(jobTitle);
    })
    it(`Should check the Job Description input doesnt have any value`, async () => {
        console.info('Check the Job Description input doesnt have any value');
        const jobDescriptionInput = await AddTitlePage.jobDescriptionInput.waitAndGetText();
        expectChai(jobDescriptionInput).to.eq('');
    })
    it(`Should input "${jobDescription}" and check the value of input field`, async () => {
        console.info('Check the Job Description input value after input');
        await AddTitlePage.inputJobDescription(jobDescription);
        const jobDescriptionInput = await AddTitlePage.jobDescriptionInput.waitAndGetText();
        expectChai(jobDescriptionInput).to.eq(jobDescription);
    });
    it(`Should check the Job Note input doesnt have any value`, async () => {
        console.info('Check the Job Note input doesnt have any value');
        const noteInput = await AddTitlePage.noteInput.waitAndGetText();
        expectChai(noteInput).to.eq('');
    })
    it(`Should input "${jobNote}" and check the value of input field`, async () => {
        console.info('Check the Job Note input value after input');
        await AddTitlePage.inputNote(jobNote);
        const noteInput = await AddTitlePage.noteInput.waitAndGetText();
        expectChai(noteInput).to.eq(jobNote);
    });
    it('Should click on the Save button and check the success message is displayed', async () => {
        console.info('Check the success message is displayed');
        await AddTitlePage.clickSave();
        const success = SuccessModal.successModal
        await expect(success).toBeDisplayed({ message: 'Success modal is not displayed!'});
    });
    it(`Should check the Job Page table includes Job Title with text "${jobTitle}"`, async () => {
        console.info('Check created Job Title text');
        const createdTitle = await JobPage.gridTitle.waitAndGetText();
        expectChai(createdTitle).to.eq(jobTitle)
    });
    it(`Should check the Job Page table includes Job Description with text "${jobDescription}"`, async () => {
        console.info('Check the created Job Description text');
        const createdDescription = await JobPage.gridDescription.waitAndGetText();
        expectChai(createdDescription).to.eq(jobDescription)
    });

    // Check the impossibility to create the same Job Title again

    it(`Should click on the Add button and check Add Title Page header is "${jobHeaderAdd}"`, async () => {
        console.info('Click on the Add button and check Add Title Page header');
        await JobPage.clickAddBtn();
        const header = await AddTitlePage.header.waitAndGetText();
        expectChai(header).to.eq(jobHeaderAdd);
    })
    it(`Should check the Add Title Page url contains "${saveUrl}"`, async () => {
        console.info('Check the Job Page url');
        expect(browser).toHaveUrlContaining(saveUrl, { message: 'Url does not match!'});
    })
    it(`Should check the Add Title Page Title input doesnt have any value`, async () => {
        console.info('Check the Job Title input doesnt have any value');
        const jobTitleInput = await AddTitlePage.jobTitleInput.waitAndGetText();
        expectChai(jobTitleInput).to.eq('');
    })
    it('Should input the same Job Title again, click on Save button and check the error message displayed', async () => {
        console.info('Check the error message is displayed');
        await AddTitlePage.inputJobTitle(jobTitle);
        await AddTitlePage.clickSave();
        const error = AddTitlePage.errorMessage;
        await expect(error).toBeDisplayed({ message: 'Error message is not displayed!'});
    })
    it(`Should check the error message text is "${errorMsg}"`, async () => {
        console.info('Check the error message text');
        const error = await AddTitlePage.errorMessage.waitAndGetText();
        expectChai(error).to.be.equal(errorMsg);
        await browser.back();
    })
    it(`Should delete created Job Title`, async () => {
        console.info('Check the success message displayed');
        await JobPage.markCheckbox(JobPage.checkbox);
        await JobPage.deleteJobTitle(JobPage.deleteBtn);
        await DeleteModal.clickModalDelete();
        const success = SuccessModal.successModal;
        await expect(success).toBeDisplayed({ message: 'Success model is not displayed!'});
    })
    it(`Should click on logout button and check the Login Page header`, async () => {
        console.info('Check the Login Page header')
        await JobPage.logoutMenu.waitAndClick();
        await JobPage.logout();
        const header = await LoginPage.header.waitAndGetText();
        expectChai(header).to.eq(loginHeader);
    })
})