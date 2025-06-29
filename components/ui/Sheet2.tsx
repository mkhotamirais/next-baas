"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "./button";
import { User } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/layouts/ThemeToggle";

interface ISheet2 {
  name: string;
  menu: { label: string; url: string }[];
  logout: () => void;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}

export default function Sheet2({ name, menu, side, logout }: ISheet2) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <User />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-64" side={side}>
        <SheetHeader>
          <SheetTitle>Hi, {name || "USER"}</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="px-3">
          <ThemeToggle />
          <nav className="flex flex-col gap-2">
            {menu.map((item, i) => (
              <SheetClose asChild key={i}>
                <Link href={item.url}>
                  <Button variant={"outline"} className="w-full justify-start">
                    {item.label}
                  </Button>
                </Link>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <Button variant={"outline"} className="w-full justify-start" onClick={logout}>
                Logout
              </Button>
            </SheetClose>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
