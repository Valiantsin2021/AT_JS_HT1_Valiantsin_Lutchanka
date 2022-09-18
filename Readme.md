# End to end test for https://opensource-demo.orangehrmlive.com/ in learning purposes

## The test purpose is to perform the following assertions:

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
5.  Screenshot with timestamp on failure
6.  Separate config files for Microsoft Edge browser tests run and to run in headless mode
7.  Custom commands in wdio.conf.js file
8.  Chai expect assertion
9.  Jenkinsfile (e2e and negative suites run with Chrome browser and artefacts saved)
10. Github Actions yml file (e2e and negative suites run with Chrome browser and artefacts saved)
11. Allure report publish on gh-pages

## Extras
#### Negative login test suite added

## To run tests:

- To run e2e test suite with Crome browser: npm run e2e:chrome
- To run e2e test suite with Microsoft Edge browser: npm run e2e:edge
- To run negative test suite with Chrome browser: npm run negative:chrome
- To run negative test suite with Microsoft Edge browser: npm run negative:edge
- To run e2e and negative suites with Chrome browser: npm run run:github
- To run freestyle - please add ENV and run with "npm run clean && npx cross-env ENV=(chrome | edge | firefox) npm run wdio -- --suite (e2e | negative)"'