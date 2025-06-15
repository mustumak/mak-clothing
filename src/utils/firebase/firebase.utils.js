// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getAuth, 
    signInWithPopup, 
    signInWithRedirect, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from "firebase/auth";
import { getFirestore,doc,getDoc,setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8Qm9I8lkQ8AiH7w8oZDoQgOPSOFYoE7E",
  authDomain: "mak-clothing-db-7258f.firebaseapp.com",
  projectId: "mak-clothing-db-7258f",
  storageBucket: "mak-clothing-db-7258f.firebasestorage.app",
  messagingSenderId: "169830484978",
  appId: "1:169830484978:web:050676b562ee591ae9f96b",
  measurementId: "G-QF0WDJGMVF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInGoogleRedirect = () => signInWithRedirect(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation ={}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }catch(e){
            console.log('Error :', e.message);
        }
    }

    return userDocRef;
}

export const creteAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);