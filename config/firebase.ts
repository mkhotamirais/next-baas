import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
const authDomain = process.env.NEXT_PUBLIC_AUTH_DOMAIN as string;
const databaseURL = process.env.NEXT_PUBLIC_DATABASE_URL as string;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET as string;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;

const firebaseConfig = { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId };
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
