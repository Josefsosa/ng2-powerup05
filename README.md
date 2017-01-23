# Angular 2 Power Up

A small Angular 2 Power Up starter app with Gulp, Webpack and Karma unit testing.

## Introduction
Welcome to Angular 2 Power Up!

## Prerequisites
You need to have [Node.js and npm](https://nodejs.org/en/)
- Support Node v4 - latest
- Support npm v3 - latest

## Installation
Download the app from [releases page](https://github.com/Josefsosa/ng2-powerup05)

Go to the app directory and install the packages:
```bash
npm install
```

## Start
Starting the server, run:
```bash
npm start
```

Your browser will popup and you can start using the Angular 2!
All changes to the files will refresh the browser automatically
and it'll also compile your changed TypeScripts files to Javascript files.

## Testing
This starter comes with testing gulp workflow

### Unit testing
Run
```bash
npm test
```
and it'll compile all TypeScript files, start Karma, then remap Istanbul coverage so that it shows TypeScript coverage, not the transpiled JavaScript coverage.


### E2E testing
Firstly start the server:
```bash
npm start
```
To begin testing, run:
```bash
npm run e2e
```
and it'll compile all E2E spec files in `/src/test/e2e/*.spec.ts`, boot up Selenium server then launches Chrome browser.

## Production
> All build tasks will run the `gulp test`, the bundle will only be created if the test passed.

> For more details, visit [Continuous Integration  wiki](base/Continuous-Integration)

You can create production build by running:
```bash
npm run build
```
or you can create production build and then serve it using Browsersync by running:
```bash
npm run serve-build
```

This build users system.js but we can configure it to use web-pack.

## License
MIT
