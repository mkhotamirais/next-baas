import { Button } from "@/components/ui/button";
import { account } from "@/config/appwrite";
import { OAuthProvider } from "appwrite";
import React from "react";
import { FaGoogle } from "react-icons/fa6";

const baseUrl =
  process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_BASE_URL : process.env.NEXT_PUBLIC_BASE_URL_PROD;

const onGoogleAuth = () => {
  account.createOAuth2Session(
    OAuthProvider.Google, // provider
    `${baseUrl}/appwrite/dashboard`, // redirect here on success
    `${baseUrl}/appwrite/login` // redirect here on failure
  );
};

export default function GoogleLogin() {
  return (
    <Button className="flex-1" onClick={onGoogleAuth} variant={"outline"}>
      <FaGoogle className="mr-2" /> Login with google
    </Button>
  );
}
