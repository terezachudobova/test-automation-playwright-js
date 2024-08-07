# Test Automation with Playwright/JavaScript

## How to run

### Initial setup
First make user you have Node.js 20.8 installed. 

If you sue NVM (recommended), tun the following command to set correct version of Node.js:
```
nvm use
```

Then install the dependencies:
```
npm install
```

### Running tests

**To run tests in interactive mode (recommended):**
```
npx playwright test --ui
```

**To run tests in headless mode:**
```
npx playwright test
```

**To generate a report:**
```
npx playwright show-report

```

**To update playwright:**
```
npx playwright install 
```
