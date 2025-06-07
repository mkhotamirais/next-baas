"use client";

import { useFirebaseStore } from "@/lib/firebase/store";
import React from "react";

export default function Profile() {
  const { user } = useFirebaseStore();
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Profile</h1>
        <div>
          <div>{user?.displayName}</div>
          <div>{user?.email}</div>
        </div>
      </div>
    </section>
  );
}
