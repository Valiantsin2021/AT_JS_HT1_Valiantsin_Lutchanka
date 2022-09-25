# JS automation tests using WebdriverIO

## This repository purpose is to functional test automation of [Orange hrm project] https://opensource-demo.orangehrmlive.com/

## The test suites purpose is to perform the following assertions:

##### 1. login to the page with valid credentials, add new Job Title 'Intern' (go to Admin -> Job - Job Titles -> Click on the Add button), add Job Description: free text up to 20 chars, add note, save changes.
##### 2. Check newly added title is visible on the grid
##### 3. Modify the created Job Title to 'Student'(select checkbox of created field -> click on the Edit button), change Job Description: free text up to 20 chars, save changes
##### 4. Check that changes are visible on the Job Title page
##### 5. Select modified field, click the Remove button and make sure the field is removed.
##### 6. Negative test on login with invalid credentials
##### 7. Negative test on create the same Job Title (should show error message)
##### 8. Logout from the webpage

## Job done:

1.  Page Object model implemented
2.  Chrome, MSEdge, Firefox tests via ENV variable
3.  Test suite e2e
4.  Allure reporter
5.  Screenshots with timestamp on failure
6.  Separate config file to run in headless mode
7.  Custom commands in wdio.conf.js file
8.  Chai expect assertion
9.  Jenkinsfile (e2e, negative and smoke suites run with Chrome browser and artefacts saved)
10. Github Actions yml file (e2e, negative and smoke suites run with Chrome browser and artefacts saved)
11. Allure report publish on gh-pages
12. Add configuration file for debugger

## Extras
#### Negative login test suite added (test factory for negative test data)
#### Smoke test suite added (check the impossibility to create the same Job Title again)

## Setup:

1. Clone this repository
2. Install dependencies with "npm install"
3. To run tests - open terminal and navigate to the path of the cloned project and:

    - all test suites with Chrome browser: npm test
    - e2e test suite with Crome browser: npm run e2e:chrome
    - e2e test suite with Microsoft Edge browser: npm run e2e:edge
    - negative test suite with Chrome browser: npm run negative:chrome
    - negative test suite with Microsoft Edge browser: npm run negative:edge
    - smoke test suite with Chrome browser: npm run smoke:chrome
    - smoke test suite with Microsoft Edge browser: npm run smoke:edge
    - e2e, negative and smoke suites with Chrome browser headless mode: npm run run:github
    - choose browser and suite manually - please add ENV and run with "npm run clean && npx cross-env ENV=(chrome | edge | firefox) npm run wdio -- --suite (e2e | negative | smoke)"
    - To clean reports directory and screenshots: npm run clean
