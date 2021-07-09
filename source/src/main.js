import { Actor, HttpAgent, Principal } from "@dfinity/agent";
import { DelegationIdentity } from "@dfinity/identity";
import { AuthClient } from "@dfinity/auth-client";

const signInBtn = document.getElementById("signinBtn");
const signOutBtn = document.getElementById("signoutBtn");

let authClient;

const init = async () => {
  authClient = await AuthClient.create();

  const updateView = () => {
    const identity = authClient.getIdentity();

    const principal = identity.getPrincipal();
    if (identity instanceof DelegationIdentity) {
		
      const publicKey = identity.getDelegation().publicKey;
	  //redirect to app here
	  window.location.replace("exp://192.168.68.117:19000/--/Photos?principal="+principal+"&publicKey="+publicKey);
    }
  }

  updateView();

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
