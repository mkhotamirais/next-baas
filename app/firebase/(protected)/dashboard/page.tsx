"use client";

import { useFirebaseStore } from "@/lib/firebase/store";

export default function Dashboard() {
  const { user } = useFirebaseStore();
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Dashboard</h1>
        <p>Hi, {user?.displayName}</p>
      </div>
    </section>
  );
}
