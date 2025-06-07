"use client";

import { Button } from "@/components/ui/button";
// import { auth, githubProvider, googleProvider } from "@/config/firebase";
import { auth, googleProvider } from "@/config/firebase";
// import { FirebaseError } from "firebase/app";
// import { fetchSignInMethodsForEmail, GoogleAuthProvider, linkWithCredential, signInWithPopup } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
// import { toast } from "sonner";

export default function GoogleLogin() {
  const onGoogleAuth = async () => {
    await signInWithPopup(auth, googleProvider);
    // try {
    //   await signInWithPopup(auth, googleProvider);
    //   toast.success("Berhasil login dengan Google");
    // } catch (err) {
    //   const error = err as FirebaseError;

    //   if (error.code === "auth/account-exists-with-different-credential") {
    //     const pendingCred = GoogleAuthProvider.credentialFromError(error);
    //     const email = error.customData?.email;

    //     if (email) {
    //       const providers = await fetchSignInMethodsForEmail(auth, email as string);
    //       if (providers.includes("github.com")) {
    //         const result = await signInWithPopup(auth, githubProvider);
    //         if (pendingCred) {
    //           await linkWithCredential(result.user, pendingCred);
    //           toast.success("Akun Google berhasil di-*link* dengan akun GitHub");
    //         }
    //       }
    //     }
    //   } else {
    //     console.error(error);
    //     toast.error(error.message);
    //   }
    // }
  };

  return (
    <Button className="flex-1" onClick={onGoogleAuth} variant={"outline"}>
      <FaGoogle className="mr-2" /> Login with google
    </Button>
  );
}
