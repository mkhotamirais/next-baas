"use client";

import { useSupabaseStore } from "@/lib/supabase/store";
import React from "react";

export default function Dashboard() {
  const { user } = useSupabaseStore();

  console.log(user);

  return (
    <section className="py-4 min-h-y">
      <div className="container">
        <h1 className="h1">Dashboard Supabase</h1>
        <p>{user?.email}</p>
      </div>
    </section>
  );
}
