import { FacebookAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

export const handleFacebookLogin = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider);
}
