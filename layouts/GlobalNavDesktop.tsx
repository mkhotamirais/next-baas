import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalNavDesktop({ menu }: { menu: { label: string; url: string }[] }) {
  return (
    <nav className="hidden md:flex">
      {menu.map((item) => (
        <Link href={item.url} key={item.label}>
          <Button variant={"ghost"} size={"sm"}>
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
