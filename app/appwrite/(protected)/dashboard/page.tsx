"use client";

import { useAppwriteStore } from "@/lib/appwrite/store";
import React from "react";

export default function Dashboard() {
  const { user } = useAppwriteStore();

  return (
    <section className="py-4 min-h-y">
      <div className="container">
        <h1 className="h1">Dashboard</h1>
        <p>{user?.email}</p>
      </div>
    </section>
  );
}
