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
const environment = urlParams.get('environment') || 'prod';
const IIUrl_local = urlParams.get('IIUrl') || 'http://192.168.68.118:8000/?canisterId=rwlgt-iiaaa-aaaaa-aaaaa-cai';

const init = async () => {
  const options = {};
  if(pubKey64 && pubKey64 !==''){
	const pubKey = new Buffer(pubKey64, 'base64').toString();
	options.identity = Ed25519KeyIdentity.fromJSON(pubKey);
	console.log(pubKey);
	console.log(options.identity.getPublicKey());
  }
  authClient = await AuthClient.create(options);

  const updateView = () => {
    const identity = authClient.getIdentity();

    const principal = identity.getPrincipal();
    if (identity instanceof DelegationIdentity) {
	  signInBtn.disabled = true;
      const publicKey = (identity.getDelegation().toJSON())?.delegations[0]?.delegation?.pubkey;
	  console.log((identity.getDelegation().toJSON()));
	  const delegations = JSON.stringify(identity.getDelegation().toJSON());
	  console.log('logged in');
	  const delegations64 = new Buffer(delegations).toString("base64");
	  
	  //redirect to app here
	  appUri = "exp://192.168.68.117:19000/--/Photos?principal="+principal+"&delegations64="+delegations64;
	  console.log(appUri);
	  snackbar.open();
	  snackbar.timeoutMs = -1;
	  setTimeout(()=>{
		window.location = appUri;
	  },20);
    }else{
		console.log('not logged in');
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
	  let IIUrl = '';
	  if(environment === 'local'){
		IIUrl = IIUrl_local;
	  }else{
		IIUrl = 'https://identity.ic0.app/';
	  }
    authClient.login({
      identityProvider: IIUrl,
	  maxTimeToLive: 1000000000000000,
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
