import { Actor, HttpAgent, Principal } from "@dfinity/agent";
import { DelegationIdentity } from "@dfinity/identity";
import { AuthClient } from "@dfinity/auth-client";
import {MDCSnackbar} from '@material/snackbar';


const signInBtn = document.getElementById("signinBtn");
const signOutBtn = document.getElementById("signoutBtn");
const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
const redirectBtn = document.getElementById("redirectBtn");

let authClient;
let appUri = '';

const init = async () => {
  authClient = await AuthClient.create();

  const updateView = () => {
    const identity = authClient.getIdentity();

    const principal = identity.getPrincipal();
    if (identity instanceof DelegationIdentity) {
		
      const publicKey = (identity.getDelegation().toJSON()).publicKey.toString();
	  //redirect to app here
	  appUri = "exp://192.168.68.117:19000/--/Photos?principal="+principal+"&publicKey=";
	  
	  snackbar.open();
	  snackbar.timeoutMs = -1;
	  setTimeout(()=>{
		window.location = appUri;
	  },20);
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
    updateView();
  };
};

init();
