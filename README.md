# contacts-toolkit

### contacts react web app with toolkit 
* what should be implemented in `mission.txt` file
* console commands history list in `commands.txt` file

------


## environment
* Nodejs version 16.10.0 (The latest stable version now 2021/09/27)
    + [install nodejs through download executable](https://nodejs.org/en/)
    + [install nodejs with nvm. official doc to install nvm](https://nodejs.org/en/download/package-manager/#nvm)
        - nvm use (.nvmrc file has the nodejs version info. this command will show the version)
        - [nvm installation guide in my blog](https://thewavelet.tistory.com/5)


## run this app
```bash
# git clone https://github.com/dmk3141618/contacts-toolkit.git
# cd contacts-toolkit
# npm install
# npm run start
```

## run unit test
```bash
# npm run test
```

## run e2e test
* First run this app using `npm run start`. Need to run this app before e2e test.


* e2e test in real browser
    + Close all browser executions for testing
    + Chrome is default. Close all chrome execution before start cypress if use chrome.
    + Be able to select browsers like firefox, edge, ... in cypress UI or config file.
```bash
# npm run cypress
```
* e2e console
    + Run e2e in console. This will make mp4 video file in cypress/video folder.
```bash
# npm run cypress:headless
```

## build for production
* This will make production build in build folder.
```bash
# npm run build
```


## tech stack
* [CRA typescript template](https://create-react-app.dev/docs/getting-started#creating-a-typescript-app)
* [craco](https://github.com/gsoft-inc/craco)
    + Create React App Configuration Override. Customize configuration without CRA eject
* [React](https://reactjs.org)
* [Redux-Toolkit](https://redux-toolkit.js.org)
    + redux-toolkit is the library to use redux in best practice
    + normalizr is for redux-toolkit state normalization but do not use in this project
* [Redux-Persist](https://github.com/rt2zz/redux-persist)
    + redux-persist is used to save redux state to browser's localstorage
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)
    + html5 history api navigation for react web SPA
* Style system: using both scss style module and css-in-js
    + style module
        - [scss](https://www.npmjs.com/package/sass)
    + css-in-js
        - [styled-components](https://styled-components.com)
    + helpers (classnames, polished)
* Form validation
    + [react-hook-form](https://react-hook-form.com)
        - form control for react
    + [https://github.com/jquense/yup](https://github.com/jquense/yup)
        - create validation rule
    + [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)
        - react-hook-form need it to connect with yup validation rule
* ESLint with Prettier
    + installed packages 
        - eslint : Linting
        - prettier : Formatting
        - @typescript-eslint/parser : Typescript eslint parser
        - @typescript-eslint/eslint-plugin : Typescript eslint ruleset
        - eslint-plugin-react : react ruleset. using react/recommended not airbnb.
        - eslint-plugin-react-hooks : react-hooks ruleset like exhaustive-deps
        - eslint-plugin-import : import-export ruleset for using import export.
        - eslint-plugin-jsx-a11y : accessibility ruleset
        - eslint-config-prettier : Turns off all rules that are unnecessary or might conflict with Prettier
        - eslint-plugin-prettier : Runs Prettier as an ESLint rule and reports differences as individual ESLint issues
    + configurations : .eslintrc.js / .prettierrc.js
    + Enable Code linting and formatting in IDE 
        - (Intellij or Webstorm Preferences Setting) Search with `eslint` keyword and activate these settings
            - Automatic eslint configuration
            - Run eslint --fix on save
            - Inspections > ESLint
        - (Visual Studio Code) Settings (Cmd + ,) and Search with `format` keyword and activate these settings
            - [install ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
            - [install Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
            - Default Formatter: Prettier - Code formatter
            - Editor: Format On Save
* Testing (Just setup environment. Added just simple sample code)
    + jest for unit test
        - jest, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
        - sample code: common/component/Footer/Footer.spec.tsx
    + cypress for e2e and integration test
        - sample code: cypress/app.spec.js
* uuid
    + id generator for contact id field
    

