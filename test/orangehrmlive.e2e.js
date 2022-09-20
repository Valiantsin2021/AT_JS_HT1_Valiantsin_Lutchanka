const expectChai = require('chai').expect;
const JobPage = require('../pageobjects/JobPage');
const AdminPage = require('../pageobjects/AdminPage');
const LoginPage = require('../pageobjects/LoginPage');
const MainPage = require('../pageobjects/MainPage')
const checkMenu = require('../utils/helper.js')
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
    newJobTitle,
    newJobDescription,
    descriptionPlaceholder,
    notePlaceholder,
    saveBtnClass,
    logoutMenuText,
    logoutMenuLength,
    } = require('../utils/constants.js');
const AddTitlePage = require('../pageobjects/AddTitlePage');
const EditTitlePage = require('../pageobjects/EditTitlePage');
const DeleteModal = require('../pageobjects/modals/DeleteModal');

describe(`Should login to ${baseUrl}, succesfully create new job, change it, delete it and logout`, () => {
    before( async () => {
        await browser.deleteCookies();
    })   
    it(`Should open ${baseUrl} and check the page title is "${title}"`, async () => {
        console.info('Open the Main page and check the Title');
        await LoginPage.maximize();
        await LoginPage.open();
        await expect(browser).toHaveTitle(title, { message: 'Title does not match!'});
    });
    it(`Should check the Login Page header has text "${loginHeader}"`, async () => {
        console.info('Check the Login Page header');
        const header = await LoginPage.header.waitAndGetText();
        expectChai(header).to.eq(loginHeader);
    })
    it(`Should check the Login Page username input does not have any value`, async () => {
        console.info('Check the Login Page username input does not have any value');
        const loginInput = await LoginPage.loginInput.waitAndGetText();
        expectChai(loginInput).to.eq('');
    })
    it(`Should check the Login Page password input does not have any value`, async () => {
        console.info('Check the Login Page password input does not have any value');
        const passInput = await LoginPage.passInput.waitAndGetText();
        expectChai(passInput).to.eq('');
    })
    it(`Should login with valid credentials and check browser url contains "${mainUrl}"`, async () => { 
        console.info('Check Page title after login');
        await LoginPage.login(login, pass);
        await expect(browser).toHaveUrlContaining(mainUrl, { message: 'Url does not match!'});   
    })
    it(`Should check the Main Page side menu is visible`, async () => {
        console.info('Check Main Page side menu is visible');
        const sideMenu = MainPage.sideMenu;
        await expect(sideMenu).toBeDisplayed({ message: 'Side menu is not displayed!'});
    })
    it(`Should check the Main Page side menu number of elements is "${sideMenuElementsLength}"`, async () => {
        console.info('Check the Main Page side menu number of elements');
        const sideMenu = MainPage.sideMenu;
        await expect(sideMenu).toBeElementsArrayOfSize(sideMenuElementsLength, { message: 'Side menu length does not match!'});
    })
    it(`Should check the Main Page side menu elements text`, async () => {
        console.info('Check the Main Page side menu elements have text');
        console.table(sideMenuText);
        const sideMenu = MainPage.sideMenu;
        await checkMenu(sideMenu, sideMenuText);
    });
    it(`Should check the Main Page profile image element has attribute alt: "${profileImgAlt}"`, async () => {
        console.info('Check the Main Page profile image element has attribute');
        const attr = MainPage.profileImg;
        await attr.waitForDisplayed();
        await expect(attr).toHaveAttr('alt', profileImgAlt, { message: 'Attribute value does not match!'});
    })
    it(`Should check the Main Page header is displayed`, async () => {
        console.info('Check the Main Page header is displayed');
        const header = MainPage.header;
        await expect(header).toBeDisplayed({ message: 'Header is not displayed!'});
    })
    it(`Should check the Main Page header has text "${mainHeader}"`, async () => {
        console.info('Check the Main Page header text');
        const header = await MainPage.header.waitAndGetText();
        expectChai(header).to.eq(mainHeader);
    })
    it('Should click Admin link on side menu page and check the page header is displayed', async () => {
        console.info('Check the Admin Page the page header is displayed');
        await MainPage.clickAdmin();
        const header = AdminPage.header;
        await expect(header).toBeDisplayed({ message: 'Header is not displayed!'});
    })
    it(`Should check the Admin Page header is "${adminHeader}"`, async () => {
        console.info('Check the Admin Page the page header text')
        const header = await AdminPage.header.waitAndGetText();
        expectChai(header).to.eq(adminHeader);
    })
    it(`Should check the Admin Page url contains "${adminUrl}"`, async () => {
        console.info('Check the Admin Page url');
        expect(browser).toHaveUrlContaining(adminUrl, { message: 'Url does not match!'});
    })
    it(`Should check Admin Page top menu is displayed`, async () => {
        console.info('Check the Admin Page top menu is displayed');
        const topMenu = AdminPage.topMenu;
        await expect(topMenu).toBeDisplayed({ message: 'Top menu is not displayed!'});
    })
    it(`Should check the Admin Page top menu number of elements is "${topMenuLength}"`, async () => {
        console.info('Check the Admin Page top menu number of elements');
        const topMenu = AdminPage.topMenu;
        await expect(topMenu).toBeElementsArrayOfSize(topMenuLength, { message: 'Top menu length does not match!'});
    })
    it(`Should check the Admin Page top menu elements text`, async () => {
        console.info('Check the Admin Page top menu elements have text');
        console.table(topMenuText);
        const topMenu = AdminPage.topMenu;
        await checkMenu(topMenu, topMenuText);
    })
    it(`Should click Job link on top menu and check the number of elements in the dropdown menu is "${jobTitlesLength}"`, async () => {
        console.info('Check the number of elements in the dropdown menu of the Job link');
        await AdminPage.clickJob();
        const jobDropdown = AdminPage.jobTitlesDropdown;
        await expect(jobDropdown).toBeElementsArrayOfSize(jobTitlesLength, { message: 'Job dropdown menu length does not match!'});
    })
    it(`Should check the text of the elements in the dropdown menu of the Job link`, async () => {
        console.info('Check the elements in the dropdown menu of the Job link have text');
        console.table(jobTitles);
        const jobDropdown = AdminPage.jobTitlesDropdown;
        await expect(jobDropdown).toBeDisplayed()
        await checkMenu(jobDropdown, jobTitles);
    })
    it(`Should click Job Titles link and check the Job Page url contains "${jobUrl}"`, async () => {
        console.info('Check the Job Page url');
        await AdminPage.clickJobTitles();
        expect(browser).toHaveUrlContaining(jobUrl, { message: 'Url does not match!'});
    })
    it(`Should check the Job Page header is displayed`, async () => {
        console.info('Check the Job Page header is displayed');
        const header = JobPage.header;
        await expect(header).toBeDisplayed({ message: 'Header is not displayed!'});
    })
    it(`Should check the Job Page header is "${jobHeader}"`, async () => {
        console.info('Check the Job Page header text');
        const header = await JobPage.header.waitAndGetText();
        expectChai(header).to.eq(jobHeader);
    })
    it(`Should check the Job Page table with Job Titles is displayed and get table size`, async () => {
        console.info('Check the Job Page table with Job Titles is displayed and get table size')
        tableJobTitles = JobPage.gridList;
        await expect(tableJobTitles).toBeDisplayed({ message: 'Job Table is not displayed!'});
        baseGrid = await JobPage.getGridSize();
    })

    // Should successfully create new Job Title

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
    it(`Should check the Job Title input is displayed`, async () => {
        console.info('Check the Job Title input is displayed');
        const jobTitleInput = AddTitlePage.jobTitleInput;
        await expect(jobTitleInput).toBeDisplayed({ message: 'Job Title input is not displayed!'});
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
    it(`Should check the Job Description input is displayed`, async () => {
        console.info('Check the Job Description input is displayed');
        const jobDescriptionInput = AddTitlePage.jobDescriptionInput;
        await expect(jobDescriptionInput).toBeDisplayed({ message: 'Job Description input is not displayed!'});
    })
    it(`Should check Job Description input attribute placeholder value is "${descriptionPlaceholder}"`, async () => {
        console.info('Check the Job Description input has placeholder value');
        const jobDescriptionInput = AddTitlePage.jobDescriptionInput
        await expect(jobDescriptionInput).toHaveAttr('placeholder', descriptionPlaceholder, { message: 'Placeholder value does not match!'});
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
    it(`Should check the Job Note input is displayed`, async () => {
        console.info('Check the Job Note input is displayed');
        const noteInput = AddTitlePage.noteInput;
        await expect(noteInput).toBeDisplayed({ message: 'Job Note input is not displayed!'});
    })
    it(`Should check Job Note input attribute placeholder value is "${notePlaceholder}"`, async () => {
        console.info('Check the Job Note input attribute placeholder value');
        const noteInput = AddTitlePage.noteInput;
        await expect(noteInput).toHaveAttr('placeholder', notePlaceholder, { message: 'Placeholder value does not match!'});
    })
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
    it(`Should check the Save button is displayed`, async () => {
        console.info('Check the Save button is displayed');
        const saveBtn = AddTitlePage.saveBtn
        await expect(saveBtn).toBeDisplayed({ message: 'Save button is not displayed!'});
    });
    it(`Should check the Save button has attribute class containing "${saveBtnClass}"`, async () => {
        console.info('Check the Save button has attribute class containing value');
        const saveBtn = AddTitlePage.saveBtn
        await expect(saveBtn).toHaveAttributeContaining('class', saveBtnClass, { message: 'Class value does not match!'});
    });
    it('Should click on the Save button and check the success message is displayed', async () => {
        console.info('Check the success message is displayed');
        await AddTitlePage.clickSave();
        const success = AddTitlePage.successModal
        await expect(success).toBeDisplayed({ message: 'Success modal is not displayed!'});
    });
    it(`Should check the Job Page table has the created Job Title "${jobTitle}" displayed`, async () => {
        console.info('Check the Job Page table has created Job Title displayed');
        await JobPage.tableHeader.waitForDisplayed()
        createdTitle = JobPage.gridTitle;
        await expect(createdTitle).toBeDisplayed({ message: 'Created Job Title is not displayed!'});
    });
    it(`Should check the Job Page table has the created Job Description "${jobDescription}" displayed`, async () => {
        console.info('Check the Job Page table has created Job Description displayed');
        createdDescription = JobPage.gridDescription;
        await expect(createdDescription).toBeDisplayed({ message: 'Created Job Description is not displayed!'});
    });
    it(`Should check the Job Page table includes Job Title with text "${jobTitle}"`, async () => {
        console.info('Check created Job Title text');
        createdTitle = await JobPage.gridTitle.waitAndGetText();
        expectChai(createdTitle).to.eq(jobTitle)
    });
    it(`Should check the Job Page table includes Job Description with text "${jobDescription}"`, async () => {
        console.info('Check the created Job Description text');
        createdDescription = await JobPage.gridDescription.waitAndGetText();
        expectChai(createdDescription).to.eq(jobDescription)
    });
    it('Should check the Job Page table size is increased by 1 after the creation of Job Title', async () => {
        console.info('Check the Job Page table size is increased by 1 after the creation of Job Title');
        changedGrid = await JobPage.getGridSize();
        expectChai(changedGrid - baseGrid).to.eq(1);
    });

    // Should successfylly modify the created Job Title

    it(`Should check if the checkbox of the created Job Title is displayed`, async () => {
        console.info('Check the checkbox of created Job Title is displayed');
        const checkbox = JobPage.checkbox;
        await expect(checkbox).toBeDisplayed({ message: 'Checkbox is not displayed!'});
    })
    it(`Should select the created Job Title checkbox, click on Modify button and check the Job Page url contains "${saveUrl}"`, async () => {
        console.info('Check the Edit Title Page url');
        await JobPage.markCheckbox(JobPage.checkbox);
        await JobPage.clickModify(JobPage.modifyBtn);
        await expect(browser).toHaveUrlContaining(saveUrl,{ message: 'Url does not match!'});
    })
    it(`Should check the Edit Title Page header is "${jobHeaderEdit}"`, async () => {
        console.info('Check the Edit Title Page header text');
        const header = await EditTitlePage.header.waitAndGetText();
        expectChai(header).to.eq(jobHeaderEdit);
    })
    it(`Should check the Job Title input is displayed`, async () => {
        console.info('Check the Job Title input is displayed');
        const jobTitleInput = EditTitlePage.jobTitleInput;
        await expect(jobTitleInput).toBeDisplayed({ message: 'Job Title input is not displayed!'});
    })
    it(`Should check the Job Title input contains "${jobTitle}"`, async () => {
        console.info('Check the Job Title input value before input');
        const jobTitleInput = EditTitlePage.jobTitleInput;
        await expect(jobTitleInput).toHaveValue(jobTitle, { message: 'Job Title input value does not match!'});
    })
    it(`Should clear the Job Title input, add new Job Title value "${newJobTitle}" and check the input contains "${newJobTitle}"`, async () => {
        console.info('Check the Job Title input value after input');
        await EditTitlePage.clearInputValue(EditTitlePage.jobTitleInput);
        await EditTitlePage.inputJobTitle(newJobTitle);
        const jobTitleInput = await EditTitlePage.jobTitleInput.waitAndGetText();
        expectChai(jobTitleInput).to.eq(newJobTitle);
    })
    it(`Should check the Job Description input is displayed`, async () => {
        console.info('Check the Job Description input is displayed');
        const jobDescriptionInput = EditTitlePage.jobDescriptionInput;
        await expect(jobDescriptionInput).toBeDisplayed({ message: 'Job Description input is not displayed!'});
    })
    it(`Should check the Job Description input contains "${jobDescription}"`, async () => {
        console.info('Check the Job description input value before input');
        const jobDescriptionInput = await EditTitlePage.jobDescriptionInput.waitAndGetText();
        expectChai(jobDescriptionInput).to.eq(jobDescription);
    })
    it(`Should clear the Job Description input, add new Job Descripton value "${newJobDescription}" and check the input contains "${newJobDescription}"`, async () => {
        console.info('Check the Job Description input value after input');
        await EditTitlePage.clearInputValue(EditTitlePage.jobDescriptionInput);
        await EditTitlePage.inputJobDescription(newJobDescription);
        const jobDescriptionInput = await EditTitlePage.jobDescriptionInput.waitAndGetText();
        expectChai(jobDescriptionInput).to.eq(newJobDescription);
    })
    it('Should click on the Save button and check the success message is displayed', async () => {
        console.info('Check the success message is displayed after save the Job Title');
        await EditTitlePage.clickSave();
        const success = EditTitlePage.successModal;
        await expect(success).toBeDisplayed({ message: 'Success model is not displayed!'});
    })

    // Check the changed Job Title is visible on the Job Title page

    it(`Should check the Job Page table has modified Job Title with text equal to "${newJobTitle}"`, async () => {
        console.info('Check the Job Page table has modified Job Title with text');
        await JobPage.tableHeader.waitForDisplayed();
        const modifiedJobTitle = JobPage.newGridTitle[0];
        expectChai(await modifiedJobTitle.getText()).to.eq(newJobTitle);
    })
    it(`Should check the Job Page table has modified Job Description with text equal to "${newJobDescription}"`, async () => {
        console.info('Check the Job Page table has modified Job Description with text');
        const modifiedGridDescription = await JobPage.newGridDescription.waitAndGetText();
        expectChai(modifiedGridDescription).to.eq(newJobDescription);
    })

// Should successfully delete modified Job Title

    it('Should select the modifyed Job Title checkbox, click on Delete button and check the success message is displayed', async () => {
        console.info('Check the success message is displayed after delete of Job Title');
        await JobPage.markCheckbox(JobPage.newCheckbox);
        await JobPage.deleteJobTitle(JobPage.newDeleteBtn);
        await DeleteModal.clickModalDelete();
        const success = JobPage.successModal;
        await expect(success).toBeDisplayed({ message: 'Success model is not displayed!'});
    })
    it('Should check the deleted Job Title field is not existing', async () => {
        console.info('Check the deleted Job Title field is not existing');
        const deletedJobTitle = JobPage.newGridTitle[0];
        expectChai(await deletedJobTitle).to.eq(undefined);
    })
    it('Should check the Job Page table size is same to its size before creation of the Job Title', async () => {
        console.info('Check the Job Page table size is same to its size before creation of the Job Title');
        await JobPage.tableHeader.waitForDisplayed();
        expectChai(await JobPage.getGridSize()).to.eq(baseGrid);
    })
    it(`Should check the logout dropdown menu number of elements is equal to ${logoutMenuLength}`, async () => {
        console.info('Check the logout dropdown menu number of elements');
        await JobPage.logoutMenu.waitAndClick();
        const logoutMenu = JobPage.logoutDropdown;
        await expect(logoutMenu).toBeElementsArrayOfSize(logoutMenuLength, { message: 'Logout menu length does not match!'});
    })
    it(`Should check the logout dropdown menu elements text`, async () => {
        console.info('Check the elements in the dropdown menu of the Job link text');
        console.table(logoutMenuText);
        const logoutMenu = JobPage.logoutDropdown;
        await expect(logoutMenu).toBeDisplayed()
        await checkMenu(logoutMenu, logoutMenuText);
    })
    it(`Should click on logout button and check the page header`, async () => {
        console.info('Check the page header')
        await JobPage.logout();
        const header = LoginPage.header;
        await expect(header).toHaveText(loginHeader, { message: 'Login header is not displayed!'});
    })
})