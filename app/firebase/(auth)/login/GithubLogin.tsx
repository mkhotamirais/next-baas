import { Button } from "@/components/ui/button";
import React from "react";
import { FaGithub } from "react-icons/fa6";
import { auth, githubProvider, googleProvider } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import { fetchSignInMethodsForEmail, GithubAuthProvider, linkWithCredential, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

export default function GithubLogin() {
  const onGithubAuth = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      toast.success("Berhasil login dengan GitHub");
    } catch (err) {
      const error = err as FirebaseError;

      if (error.code === "auth/account-exists-with-different-credential") {
        const pendingCred = GithubAuthProvider.credentialFromError(error);
        const email = error.customData?.email;

        if (email) {
          const providers = await fetchSignInMethodsForEmail(auth, email as string);
          if (providers.includes("google.com")) {
            const result = await signInWithPopup(auth, googleProvider);
            if (pendingCred) {
              await linkWithCredential(result.user, pendingCred);
              toast.success("Akun GitHub berhasil di-*link* dengan akun Google");
            }
          }
        }
      } else {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <Button className="flex-1" onClick={onGithubAuth} variant={"outline"}>
      <FaGithub className="mr-2" /> Login with Github
    </Button>
  );
}
