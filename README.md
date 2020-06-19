# SendBird Calls—QuickStart Guide for JavaScript

## Introduction
SendBird provides `SendBirdCall` framework for your app enabling real-time `voice and video calls` between your users. This sample introduces an applications based on `SendBirdCall`.

> If you need any helps or have any issue / question, please visit [our community](https://community.sendbird.com) 

## Prerequisites
- Node
- npm (or yarn)
- Modern browser, supporting WebRTC APIs.

## Creating a SendBird application
1. Login or Sign-up for an account at [dashboard](https://dashboard.sendbird.com/).
2. Create or select an application on the SendBird Dashboard.
3. Note the `Application ID` for future reference.
4. [Contact sales](https://sendbird.com/contact-sales) to get the `Calls` menu enabled in the dashboard. (Self-serve coming soon.)

## Creating test users
1. In the SendBird dashboard, navigate to the `Users` menu.
2. Create at least two new users, one that will be the `caller`, and one that will be the `callee`.
3. Note the `User ID` of each user for future reference.

## Installing and running the sample application
1\. Clone this repository 
```shell script
$ git clone git@github.com:sendbird/quickstart-calls-javascript.git
```
2\. Install dependencies
```shell script
$ cd quickstart-calls-javascript
$ npm install
```
3\. In `envs.js`, replace the value of `TEST_APP_ID` with your `Application ID`. If you skip this step, an additional field for the `Application ID` will appear in the login view.
```javascript
export const TEST_APP_ID = 'YOUR_APP_ID';
```
4\. Build
```shell script
$ npm run build
```
5\. Start sample app
```shell script
# Start with webpack-dev-sever
$ npm run start:dev

# Start with express server
$ npm run start
```
6\. If two devices are available, repeat these steps to install the sample application on both the primary device and the secondary device.

## Making calls
1. On each devices, open browser and go to sample page. The default url is `localhost:9000`
2. On each browsers, choose any sample type to use (full-screen sample or widget sample).
3. On primary browser, log in to the sample application with the ID of the user designated as the `caller`.
4. On secondary browser, log in to the sample application with the ID of the user designated as the `callee`.
5. On primary browser, specify the user ID of the `callee` and initiate a call.
6. If all steps have been followed correctly, an incoming call notification will appear on the `callee` user’s browser.
7. Reverse roles, and initiate a call from the other browser.
8. If the `caller` and `callee` devices are near each other, use headphones to prevent audio feedback.

## Reference
[SendBird Calls JS SDK Readme](https://github.com/sendbird/sendbird-calls-javascript/blob/master/README.md)
