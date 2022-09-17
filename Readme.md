# End to end test for https://opensource-demo.orangehrmlive.com/ in learning purposes

## The test purpose is to perform the following assertions:

### 1. login to the page with valid credentials, add new Job Title 'Intern' (go to Admin -> Job - Job Titles -> Click on the Add button), add Job Description: free text up to 20 chars, add note, save changes.
### 2. Check newly added title is visible on the grid
### 3. Modify the created Job Title to 'Student'(select checkbox of created field -> click on the Edit button), change Job Description: free text up to 20 chars, save changes
### 4. Check that changes are visible on the Job Title page
### 5. Select modified field, click the Remove button and make sure the field is removed.
### 6. Negative test on login with invalid credentials
### 7. Negative test on create the same Job Title (should show error message)
### 8. Logout from the webpage

## Job done:
### Page Object model implemented
### Chrome and MSEdge separate tests added
### Test suite e2e added
### Allure reporter added
### Screenshot with timestamp on failure added
### Config file for Microsoft Edge browser test added
### Custom commands added to wdio.conf.js file
### Chai expect assertion added
### Jenkinsfile added
### Github Actions yml file added

## Extras
### Negative login test suite added

## To run tests:
### to run both test suites: npm test
### to run e2e test suite with Crome browser: npm run e2e:chrome
### to run e2e test suite with Microsoft Edge browser: npm run e2e:edge
### to run negative test suite with Chrome browser: npm run negative:chrome
### to run negative test suite with Microsoft Edge browser: npm run negative:edge
