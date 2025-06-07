import Logo from "@/components/Logo";
import { ThemeToggle } from "@/layouts/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import c from "@/lib/content.json";

export default function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute left-0 top-0 p-6">
        <Logo />
      </div>
      <div className="absolute right-0 top-0 p-6">
        <ThemeToggle />
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        {c.logos.map((item, i) => (
          <Link href={item.url} className="group flex gap-2 flex-col items-center border p-3 rounded-md" key={i}>
            <Image src={item.iconUrl} alt={item.label} width={100} height={100} className="size-20" />
            <span className="group-hover:underline">{item.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
