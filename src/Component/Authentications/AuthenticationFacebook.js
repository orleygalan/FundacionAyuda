import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

export const handleFacebookLogin = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {

            const user = result.user;
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

        })
        .catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = FacebookAuthProvider.credentialFromError(error);

        });
}
