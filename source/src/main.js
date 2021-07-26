import { Actor, HttpAgent, Principal } from "@dfinity/agent";
import { DelegationIdentity, Ed25519KeyIdentity } from "@dfinity/identity";
import { AuthClient } from "@dfinity/auth-client";
import {MDCSnackbar} from '@material/snackbar';
const Buffer = require("buffer").Buffer;

const signInBtn = document.getElementById("signinBtn");
const signOutBtn = document.getElementById("signoutBtn");
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
const redirectBtn = document.getElementById("redirectBtn");
const msgEl = document.getElementById("msg");

let authClient;
let appUri = '';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pubKey64 = urlParams.get('pubKey64');

const init = async () => {
  const options = {};
  if(pubKey64 && pubKey64 !==''){
	const pubKey = Buffer.from(pubKey64, 'base64');
	options.identity = Ed25519KeyIdentity.fromJSON(pubKey);
	console.log(options.identity.getPublicKey());
  }
  authClient = await AuthClient.create(options);

  const updateView = () => {
    const identity = authClient.getIdentity();

    const principal = identity.getPrincipal();
    if (identity instanceof DelegationIdentity) {
	  signInBtn.disabled = true;
      const delegation = (identity.getDelegation().toJSON());
	  const delegation64 = new Buffer(delegation).toString("base64");
	  //redirect to app here
	  appUri = "exp://192.168.68.117:19000/--/Photos?principal="+principal+"&delegation64="+delegation64;
	  
	  snackbar.open();
	  snackbar.timeoutMs = -1;
	  setTimeout(()=>{
		window.location = appUri;
	  },20);
    }else{
		signOutBtn.disabled = true;
	}
  }

  updateView();
  
  redirectBtn.onclick = async () => {
    setTimeout(()=>{
		window.location = appUri;
	},10);
  };

  signInBtn.onclick = async () => {
    authClient.login({
      identityProvider: 'https://identity.ic0.app/',
      onSuccess: updateView
    });
  };

  signOutBtn.onclick = async () => {
    authClient.logout();
	signOutBtn.disabled = true;
	signInBtn.disabled = false;
    updateView();
  };
};

init();
