import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

export const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
        'login_hint': ''
    });
    const auth = getAuth();
    auth.languageCode = 'it';
    signInWithRedirect(auth, provider);
}
