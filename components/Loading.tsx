"use client";

import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <section className="container py-12 flex justify-center">
      <Loader size={40} className="animate-spin" />
    </section>
  );
}
