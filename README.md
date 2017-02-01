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

> For more details, visit [Continuous Integration  wiki](https://github.com/Josefsosa/ng2-powerup05/wiki)

You can create production build by running:
```bash
npm run build
```
or you can create production build and then serve it using Browsersync by running:
```bash
npm run serve-build
```

This build users system.js but we can configure it to use web-pack.

### Reporting

**Assigned: TBD**

#### Add The Reporting framework Code Configuration

```
Report Name	                      Description
- [x] Complexity Report A code complexity report to
- [ ] JCPD Duplicate Report	This report Isolates duplicated code in the TS/JS code base.
- [ ] Accessibility Report	The Accessibility report give us a WCAG “A”-”AAA” pass fail status of the rendered page UI for developers to use to fix CSS/UI errors and issues before the app reaches UAT.
- [ ] Speet IO Webcoach 	The speed.IO reports on page rendering performance metrics.
- [ ] TSLint Report	The TS-Lint Report Give us the code quality report for the code base per every TS file.
- [ ] PDL report	The “PDL” Page Data Layer Report provides a per state/URL rendered values of configured page data such as page name, page type, order and customer data.
- [ ] Html Validator report	The HTML validator report provides instrumentation of the HTML validity according to W3C standards so Developers can capture and fix error
- [ ] SEO Checker report	The SEO Checker report provide a per state/url rendered values of configurable SEO values Such as Meta description, Meta robots, page description Canonical Links, H1-H5 Heading values etc…
- [ ] Coverage Report	The Coverage Report give us insight into the how much Unit Testing work has been completed for the app in the Code base.
- [ ] NG Documentation	NG Documentation provides us an in code documentation methodology that generates all the Source code documentation.
```

## Backlog of functionality remaining
```
      Type	Story											                    PTS
- [ ] DOC		DOC - PDL/Analytics for NG 2 Architecture		    3
- [ ] DEV		DEV - PDL/Analytics for NG 2 Architecture		    5
- [ ] DOC		DOC - Search on the CSL-WebPlatform				      3
- [ ] DEV		DEV - Search on the CSL-WebPlatform				      5
- [ ] DOC		DOC - AEM/NG Authoring Patterns & Guidelines	  3
- [ ] DEV 	DEV - AEM/NG Authoring Patterns Implementation	5
- [ ] DEV		DEV - Authentication OAuth2 Integration			    5
- [ ] DEV		DEV - Angular 2 / AEM 6.X Interaction patterns	5
- [ ] DOC		DOC – AEM NG 2 Page Personalization				      3
- [ ] DEV		DEV – AEM NG 2 Page Personalization				      5
- [ ] DOC		DOC - Angular 2.0 and CQ5.6 Support				      5
- [ ] DEV		DEV- AEM CQ6 and NG2 for CMS platform			      5
- [ ] DOC		DOC- Angular 2.0 Component Architecture			    3
- [ ] DOC		DOC- UI NG 2.0 Performance Best Practices		    5
- [ ] DOC		DOC - 2.0 TS E2E & Unit Testing Guidelines		  3
- [ ] DOC		DOC - 2.0 TS Development Guidelines				      3
- [ ] DOC		DOC - API needed CSL-Platform team for NG UI	  3
- [ ] DEV		DEV - API needed CSL-Platform team for NG UI	  5
- [ ] DOC		DOC - IDE Recommendation						            3
- [ ] DOC		DOC – AEM Preview Environment					          3
- [ ] DEV		DEV – AEM Preview Environment					          5
- [ ] DOC		DOC – NG 2.0 Security Architecture				        3
- [ ] DEV		DEV - Authentication OAuth2 Integration			    5
- [ ] DOC		DOC – NG 2.0 Data persistence					          3
- [ ] DEV		DEV – NG 2.0 Protected Routes					          5
- [ ] DOC		DOC – NG 2.0 Sanky Graph API Reporting			      3
- [ ] DOC		DOC - 2.0 TS E2E & Unit Testing Guidelines		  5
- [ ] DOC		DOC - Adobe Marketing Cloud Integration			    5
- [ ] DOC		DOC - CDN Integration							              3
- [ ] DOC		DOC - Modularize 3rd Party integration 			    3
- [ ] DOC		DOC - NativeScript export to mobile app			    3
- [ ] DOC		DOC - Angular Material 2 for Accessibility		  3
- [ ] DOC		DOC - AME/NG Preview Environment				        3
- [ ] DEV		DEV - Components Performance Report Slow/Comps  5
```


## License
MIT


