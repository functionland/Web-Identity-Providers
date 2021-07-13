## Project Description

Web Identity Providers is a proxy page to allow mobile applications connect with identity providers, such as Internet Identity by DFinity, which use postMessage to send authentication result back to requestor.

## Why?

We wanted to integrate Photos app with Internet Identity. However, there was no react native component designed and the react component was designed for web only. So we needed a proxy page, as they are using window.postMessage to send authentication result back, which is not available to react native app and Oauth is not supported at the time of this writting. This module is designed based on feedbacks from Dfinity community [here](https://forum.dfinity.org/t/web-authentication-workflow-for-apps-without-a-front-end-canister/5774)

## demo

![https://github.com/functionland/Web-Identity-Providers/blob/8449907b2a1beebb6734e51d3909ff7ac2860baa/images/II.gif](https://github.com/functionland/Web-Identity-Providers/blob/8449907b2a1beebb6734e51d3909ff7ac2860baa/images/II.gif)

### Installing Pre-requisites

- NodeJS/NPM

This application needs NodeJs to run. You can download and install NodeJs from the below link on any platform if you do not have it already.
[Download NodeJS](https://nodejs.org/en/)

you can also check if you already have NodeJs installed by running the following two commands in terminal window

```
node -v
npm -v
```

- Git:
You can use git to easily download the files from github into your computer (or if you prefer you can download files manually from this github repository in step 1 of cloning the application)
[Download Git-Scm](https://git-scm.com/downloads)

you can also check whether you already have NodeJs installed by running the following command in terminal window

```
git --version
```

Now you need to install expo-cli. If you want to know more about expo check their website. [Expo](https://docs.expo.io/)
```
npm install --global expo-cli
```

Optional: if you prefer yarn you can install yarn.
```
npm install --global yarn
```

## Clone the project

You can clone the project by running the command below to your terminal:

for https cloning:
```bash
git clone https://github.com/functionland/Web-Identity-Providers.git
```
```bash
cd Web-Identity-Providers
```

## Install requirements

you can install the requirements with command:
```bash
yarn install
```
or (do not use both)
```bash
npm install
```

## Run

1- Create a keypair in your application if you want (you can let the identity provider creates it too). Use Ed25519KeyIdentity for "Internet Identity"
```
import { Ed25519KeyIdentity } from "@dfinity/identity";

const keyPair = Ed25519KeyIdentity.generate();
const keyPairJson = keyPair.toJSON();
//Make sure you remove the prvivate key before sending it to proxy
keyPairJson[1] = '';
const publicKey = JSON.stringify(keyPairJson);
const publicKey64 = new Buffer(publicKey).toString("base64");
```

2- Create a Linking listener to react to response after authentication is done. the user id, principal, will be sent back in event in parameter "principal" and public key encoded with base64 in parameter "publicKey64".
```
Linking.addEventListener('url', (event)=>{
    let { path, queryParams } = Linking.parse(event.url);
    let principal = queryParams.principal;
    let publicKey64 = queryParams.publicKey64
});
```

3- Open url to proxy.
```
WebBrowser.openBrowserAsync(url, {
    createTask: true,
});
```
