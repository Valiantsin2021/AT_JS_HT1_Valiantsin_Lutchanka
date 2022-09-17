const expectChai = require('chai').expect;
const JobPage = require('../pageobjects/JobPage');
const AdminPage = require('../pageobjects/AdminPage');
const LoginPage = require('../pageobjects/LoginPage');
const MainPage = require('../pageobjects/MainPage')
const checkArray = require('../utils/helper.js')
let baseGrid;
let changedGrid;
const { 
    baseUrl,
    mainUrl,
    adminUrl,
    jobUrl,
    saveUrl,
    loginHeader, 
    login, 
    pass, 
    title, 
    profileImgAlt,
    mainHeader,
    adminHeader, 
    jobHeader,
    jobHeaderAdd,
    jobHeaderEdit,
    sideMenuText,
    sideMenuElementsLength, 
    topMenuText,
    topMenuLength, 
    jobTitles,
    jobTitlesLength,
    jobTitle,
    jobDescription,
    jobNote,
    errorMsg,
    newJobTitle,
    newJobDescription,
    descriptionPlaceholder,
    notePlaceholder,
    saveBtnClass,
    logoutMenuText,
    logoutMenuLength,
    } = require('../utils/constants.js')

describe(`Should login to ${baseUrl}, create new job, change it and delete it`, () => {
    it(`should open ${baseUrl} and check title, check page header and login with valid credentials`, async () => {
        await LoginPage.open();
        await LoginPage.maximize();
        expect(browser).toHaveTitle(title);
        await expect(LoginPage.header).toHaveText(loginHeader);
        await expect(LoginPage.loginInput).toHaveValue('')
        await expect(LoginPage.passInput).toHaveValue('')
        await LoginPage.login(login, pass);
    });
    it('should check the Main Page header, url, side menu elements text and profile picture are present', async () => {
        await expect(MainPage.menuList).toBeDisplayed();
        expect(browser).toHaveUrlContaining(mainUrl);
        await expect(MainPage.profileImg).toHaveAttr('alt', profileImgAlt);
        await expect(MainPage.header).toBeDisplayed();
        await expect(MainPage.header).toHaveText(mainHeader)
        await expect(MainPage.sideMenu).toBeDisplayed();
        await expect(MainPage.sideMenu).toBeElementsArrayOfSize(sideMenuElementsLength);
        await checkArray(MainPage.sideMenu, sideMenuText)
    });
    it('should enter Admin page and check page url, header, top menu elements text', async () => {
       await MainPage.clickAdmin();
       await expect(AdminPage.header).toBeDisplayed();
       expect(browser).toHaveUrlContaining(adminUrl);
       await expect(AdminPage.header).toHaveText(adminHeader);
       await expect(AdminPage.topMenu).toBeDisplayed();
       await expect(AdminPage.topMenu).toBeElementsArrayOfSize(topMenuLength);
       await checkArray(AdminPage.topMenu, topMenuText)
    });
    it('should navigate to Admin -> Job -> Job Titles, check page menu, url, header text and Job Titles grid', async () => {
        await AdminPage.clickJob();
        await expect(AdminPage.jobTitlesDropdown).toBeElementsArrayOfSize(jobTitlesLength);
        await checkArray(AdminPage.jobTitlesDropdown, jobTitles)
        await AdminPage.clickJobTitles();
        expect(browser).toHaveUrlContaining(jobUrl);
        await expect(JobPage.header).toHaveText(jobHeader);
        await expect(JobPage.gridList).toBeDisplayed();
        baseGrid = await(JobPage.getGridSize());
     });
    it('should click on the Add button, add job title, description, note, check the value of input fields and succesfully save the data', async () => {
        await JobPage.clickAddBtn();
        await expect(JobPage.header).toHaveText(jobHeaderAdd);
        expect(browser).toHaveUrlContaining(saveUrl);
        await expect(JobPage.jobTitleInput).toBeDisplayed();
        await expect(JobPage.jobTitleInput).toHaveValue('');
        await JobPage.inputJobTitle(jobTitle);
        await expect(JobPage.jobTitleInput).toHaveValue(jobTitle);
    });
    it('should add job description and check the value of job description input field', async () => {
        await expect(JobPage.jobDescriptionInput).toBeDisplayed();
        await expect(JobPage.jobDescriptionInput).toHaveAttr('placeholder', descriptionPlaceholder);
        await expect(JobPage.jobDescriptionInput).toHaveValue('');
        await JobPage.inputJobDescription(jobDescription);
        await expect(JobPage.jobDescriptionInput).toHaveValue(jobDescription);
    });
    it('should add job note, check the value of note input field and save the input data', async () => {
        await expect(JobPage.noteInput).toBeDisplayed();
        await expect(JobPage.noteInput).toHaveAttr('placeholder', notePlaceholder);
        await expect(JobPage.noteInput).toHaveValue('');
        await JobPage.inputNote(jobNote);
        await expect(JobPage.noteInput).toHaveValue(jobNote);
        await expect(JobPage.saveBtn).toBeDisplayed();
        await expect(JobPage.saveBtn).toHaveAttributeContaining('class', saveBtnClass);
        await JobPage.clickSave();
        await expect(JobPage.successModal).toBeDisplayed();
    });
    it('should check newly added title is visible on the grid', async () => {
        await expect(JobPage.gridList).toBeDisplayed();
        await expect(JobPage.gridTitle).toBeDisplayed();
        await expect(JobPage.gridDescription).toBeDisplayed();
        expect(browser).toHaveUrlContaining(jobUrl);
        expectChai(await JobPage.gridTitle.getText()).to.eq(jobTitle)
        expectChai(await JobPage.gridDescription.getText()).to.eq(jobDescription)
        changedGrid = await(JobPage.getGridSize())
        expectChai(changedGrid - baseGrid).to.eq(1)
    });
    it('Should check the impossibility to create the same job again', async () => {
        await JobPage.clickAddBtn();
        await expect(JobPage.header).toHaveText(jobHeaderAdd);
        await expect(JobPage.jobTitleInput).toBeDisplayed();
        await expect(JobPage.jobTitleInput).toHaveValue('');
        expect(browser).toHaveUrlContaining(saveUrl);
        await JobPage.inputJobTitle(jobTitle);
        await JobPage.clickSave();
        await expect(JobPage.errorMessage).toBeDisplayed();
        expectChai(await JobPage.errorMessage.getText()).to.be.equal(errorMsg)
    })
    it('Should modify the created Job Title (select your field -> click on the Edit button)', async () => {
        await AdminPage.clickJob();
        await AdminPage.clickJobTitles();
        await expect(JobPage.checkbox).toBeDisplayed();
        await JobPage.markCheckbox(JobPage.checkbox);
        await JobPage.clickModify(JobPage.modifyBtn);
        expect(browser).toHaveUrlContaining(saveUrl);
        await expect(JobPage.header).toHaveText(jobHeaderEdit);
        await expect(JobPage.jobTitleInput).toBeDisplayed();
        await expect(JobPage.jobTitleInput).toHaveValue(jobTitle);
        await JobPage.clearInputValue(JobPage.jobTitleInput);
        await JobPage.inputJobTitle(newJobTitle);
        await expect(JobPage.jobTitleInput).toHaveValue(newJobTitle);
        await expect(JobPage.jobDescriptionInput).toBeDisplayed();
        await expect(JobPage.jobDescriptionInput).toHaveValue(jobDescription);
        await JobPage.clearInputValue(JobPage.jobDescriptionInput);
        await JobPage.inputJobDescription(newJobDescription);
        await expect(JobPage.jobDescriptionInput).toHaveValue(newJobDescription);
        await JobPage.clickSave();
        await expect(JobPage.successModal).toBeDisplayed();
    })
    it('Should check that changes are visible on the Job Title page', async () => {
        await expect(JobPage.gridList).toBeDisplayed();
        await expect(JobPage.newGridTitle[0]).toBeDisplayed();
        await expect(JobPage.newGridDescription).toBeDisplayed();
        expectChai(await JobPage.newGridTitle[0].getText()).to.eq(newJobTitle);
        expectChai(await JobPage.newGridDescription.getText()).to.eq(newJobDescription);
    })
    it('Should delete the modifyed Job Title and check the success message is shown', async () => {
        await JobPage.markCheckbox(JobPage.newCheckbox);
        await JobPage.deleteJobTitle(JobPage.newDeleteBtn);
        await JobPage.clickModalDelete();
        await expect(JobPage.successModal).toBeDisplayed();
    })
    it('Should check the deleted Job Title field on the Job Title page is not existing', async () => {
        await expect(JobPage.gridList).toBeDisplayed();
        expectChai(await JobPage.getGridSize()).to.eq(baseGrid);
        expectChai(await JobPage.newGridTitle[0]).to.eq(undefined);
    })
    it('Should successfully log out from the account', async () =>{
        await JobPage.logoutMenu.waitAndClick();
        await expect(JobPage.logoutDropdown).toBeDisplayed();
        await expect(JobPage.logoutDropdown).toBeElementsArrayOfSize(logoutMenuLength);
        await checkArray(JobPage.logoutDropdown, logoutMenuText);
        await JobPage.logout();
        expect(browser).toHaveTitle(title);
        await expect(LoginPage.header).toHaveText(loginHeader);
    })
});